#include "param.h"
#include "types.h"
#include "memlayout.h"
#include "elf.h"
#include "riscv.h"
#include "defs.h"
#include "fs.h"
#include "spinlock.h"
#include "proc.h"
#include "vm.h"
#include<stdbool.h>

/*
 * the kernel's page table.
 */
pagetable_t kernel_pagetable;

extern char etext[];  // kernel.ld sets this to end of kernel code.

extern char trampoline[]; // trampoline.S

// Make a direct-map page table for the kernel.
pagetable_t kvmmake(void)
{
  pagetable_t kpgtbl;

  kpgtbl = (pagetable_t) kalloc();
  memset(kpgtbl, 0, PGSIZE);

  // uart registers
  kvmmap(kpgtbl, UART0, UART0, PGSIZE, PTE_R | PTE_W);

  // virtio mmio disk interface
  kvmmap(kpgtbl, VIRTIO0, VIRTIO0, PGSIZE, PTE_R | PTE_W);

  // PLIC
  kvmmap(kpgtbl, PLIC, PLIC, 0x400000, PTE_R | PTE_W);

  // map kernel text executable and read-only.
  kvmmap(kpgtbl, KERNBASE, KERNBASE, (uint64)etext-KERNBASE, PTE_R | PTE_X);

  // map kernel data and the physical RAM we'll make use of.
  kvmmap(kpgtbl, (uint64)etext, (uint64)etext, PHYSTOP-(uint64)etext, PTE_R | PTE_W);

  // map the trampoline for trap entry/exit to
  // the highest virtual address in the kernel.
  kvmmap(kpgtbl, TRAMPOLINE, (uint64)trampoline, PGSIZE, PTE_R | PTE_X);

  // map kernel stacks
  proc_mapstacks(kpgtbl);
  
  return kpgtbl;
}

// Initialize the one kernel_pagetable
void kvminit(void)
{
  kernel_pagetable = kvmmake();
}

// Switch h/w page table register to the kernel's page table,
// and enable paging.
void kvminithart()
{
  w_satp(MAKE_SATP(kernel_pagetable));
  sfence_vma();
}

// Return the address of the PTE in page table pagetable
// that corresponds to virtual address va.  If alloc!=0,
// create any required page-table pages.
//
// The risc-v Sv39 scheme has three levels of page-table
// pages. A page-table page contains 512 64-bit PTEs.
// A 64-bit virtual address is split into five fields:
//   39..63 -- must be zero.
//   30..38 -- 9 bits of level-2 index.
//   21..29 -- 9 bits of level-1 index.
//   12..20 -- 9 bits of level-0 index.
//    0..11 -- 12 bits of byte offset within the page.
pte_t * walk(pagetable_t pagetable, uint64 va, int alloc)
{
  if(va >= MAXVA)
    panic("walk");

  for(int level = 2; level > 0; level--) {
    pte_t *pte = &pagetable[PX(level, va)];
    if(*pte & PTE_V) {
      pagetable = (pagetable_t)PTE2PA(*pte);
    } else {
      if(!alloc || (pagetable = (pde_t*)kalloc()) == 0)
        return 0;
      memset(pagetable, 0, PGSIZE);
      *pte = PA2PTE(pagetable) | PTE_V;
    }
  }
  return &pagetable[PX(0, va)];
}

// Look up a virtual address, return the physical address,
// or 0 if not mapped.
// Can only be used to look up user pages.
uint64 walkaddr(pagetable_t pagetable, uint64 va)
{
  pte_t *pte;
  uint64 pa;

  if(va >= MAXVA)
    return 0;
  struct proc *p = myproc();
  pte = walk(pagetable, va, 0);

  if(pte == 0 || (*pte & PTE_V) == 0){
    if(va >= p->sz || va < PGROUNDDOWN(p->trapframe->sp))
      return 0;
    char *mem = kalloc();
    pa = (uint64)mem;
    memset(mem, 0, PGSIZE);
    mappages(pagetable, va, PGSIZE, pa, PTE_X|PTE_W|PTE_U|PTE_R);
    return pa;
  }

  if((*pte & PTE_U) == 0)
    return 0;
  pa = PTE2PA(*pte);
  return pa;
}

// add a mapping to the kernel page table.
// only used when booting.
// does not flush TLB or enable paging.
void kvmmap(pagetable_t kpgtbl, uint64 va, uint64 pa, uint64 sz, int perm)
{
  if(mappages(kpgtbl, va, sz, pa, perm) != 0)
    panic("kvmmap");
}

// Create PTEs for virtual addresses starting at va that refer to
// physical addresses starting at pa. va and size might not
// be page-aligned. Returns 0 on success, -1 if walk() couldn't
// allocate a needed page-table page.
int mappages(pagetable_t pagetable, uint64 va, uint64 size, uint64 pa, int perm)
{
  uint64 a, last;
  pte_t *pte;

  if(size == 0)
    panic("mappages: size");
  
  a = PGROUNDDOWN(va);
  last = PGROUNDDOWN(va + size - 1);
  for(;;){
    if((pte = walk(pagetable, a, 1)) == 0)
      return -1;
    if(*pte & PTE_V)
      panic("mappages: remap");
    *pte = PA2PTE(pa) | perm | PTE_V;
    if(a == last)
      break;
    a += PGSIZE;
    pa += PGSIZE;
  }
  return 0;
}

// Remove npages of mappings starting from va. va must be
// page-aligned. The mappings must exist.
// Optionally free the physical memory.
void uvmunmap(pagetable_t pagetable, uint64 va, uint64 npages, int do_free)
{
  uint64 a;
  pte_t *pte;

  if((va % PGSIZE) != 0)
    panic("uvmunmap: not aligned");

  for(a = va; a < va + npages*PGSIZE; a += PGSIZE){
    if((pte = walk(pagetable, a, 0)) == 0)
      continue;
      // panic("uvmunmap: walk");
    if((*pte & PTE_V) == 0)
      continue;
      // panic("uvmunmap: not mapped");
    if(PTE_FLAGS(*pte) == PTE_V)
      panic("uvmunmap: not a leaf");
    if(do_free){
      uint64 pa = PTE2PA(*pte);
      kfree((void*)pa);
    }
    *pte = 0;
  }
}

// create an empty user page table.
// returns 0 if out of memory.
pagetable_t uvmcreate()
{
  pagetable_t pagetable;
  pagetable = (pagetable_t) kalloc();
  if(pagetable == 0)
    return 0;
  memset(pagetable, 0, PGSIZE);
  return pagetable;
}

// Load the user initcode into address 0 of pagetable,
// for the very first process.
// sz must be less than a page.
void uvminit(pagetable_t pagetable, uchar *src, uint sz)
{
  char *mem;

  if(sz >= PGSIZE)
    panic("inituvm: more than a page");
  mem = kalloc();
  memset(mem, 0, PGSIZE);
  mappages(pagetable, 0, PGSIZE, (uint64)mem, PTE_W|PTE_R|PTE_X|PTE_U);
  memmove(mem, src, sz);
}

// Allocate PTEs and physical memory to grow process from oldsz to
// newsz, which need not be page aligned.  Returns new size or 0 on error.
uint64 uvmalloc(pagetable_t pagetable, uint64 oldsz, uint64 newsz)
{
  char *mem;
  uint64 a;

  if(newsz < oldsz)
    return oldsz;

  oldsz = PGROUNDUP(oldsz);
  for(a = oldsz; a < newsz; a += PGSIZE){
    mem = kalloc();
    if(mem == 0){
      uvmdealloc(pagetable, a, oldsz);
      return 0;
    }
    memset(mem, 0, PGSIZE);
    if(mappages(pagetable, a, PGSIZE, (uint64)mem, PTE_W|PTE_X|PTE_R|PTE_U) != 0){
      kfree(mem);
      uvmdealloc(pagetable, a, oldsz);
      return 0;
    }
  }
  return newsz;
}

// Deallocate user pages to bring the process size from oldsz to
// newsz.  oldsz and newsz need not be page-aligned, nor does newsz
// need to be less than oldsz.  oldsz can be larger than the actual
// process size.  Returns the new process size.
uint64 uvmdealloc(pagetable_t pagetable, uint64 oldsz, uint64 newsz)
{
  if(newsz >= oldsz)
    return oldsz;

  if(PGROUNDUP(newsz) < PGROUNDUP(oldsz)){
    int npages = (PGROUNDUP(oldsz) - PGROUNDUP(newsz)) / PGSIZE;
    uvmunmap(pagetable, PGROUNDUP(newsz), npages, 1);
  }

  return newsz;
}

// Recursively free page-table pages.
// All leaf mappings must already have been removed.
void freewalk(pagetable_t pagetable)
{
  // there are 2^9 = 512 PTEs in a page table.
  for(int i = 0; i < 512; i++){
    pte_t pte = pagetable[i];
    if((pte & PTE_V) && (pte & (PTE_R|PTE_W|PTE_X)) == 0){
      // this PTE points to a lower-level page table.
      uint64 child = PTE2PA(pte);
      freewalk((pagetable_t)child);
      pagetable[i] = 0;
    } else if(pte & PTE_V){
      panic("freewalk: leaf");
    }
  }
  kfree((void*)pagetable);
}

// Free user memory pages,
// then free page-table pages.
void uvmfree(pagetable_t pagetable, uint64 sz)
{
  if(sz > 0)
    uvmunmap(pagetable, 0, PGROUNDUP(sz)/PGSIZE, 1);
  freewalk(pagetable);
}

// Given a parent process's page table, copy
// its memory into a child's page table.
// Copies both the page table and the
// physical memory.
// returns 0 on success, -1 on failure.
// frees any allocated pages on failure.
int uvmcopy(pagetable_t old, pagetable_t new, uint64 sz)
{
  pte_t *pte;
  uint64 pa, i;
  uint flags;
  char *mem;

  for(i = 0; i < sz; i += PGSIZE){
    if((pte = walk(old, i, 0)) == 0)
      continue;
      // panic("uvmcopy: pte should exist");
    if((*pte & PTE_V) == 0)
      continue;
      // panic("uvmcopy: page not present");
    pa = PTE2PA(*pte);
    flags = PTE_FLAGS(*pte);
    if((mem = kalloc()) == 0)
      goto err;
    memmove(mem, (char*)pa, PGSIZE);
    if(mappages(new, i, PGSIZE, (uint64)mem, flags) != 0){
      kfree(mem);
      goto err;
    }
  }
  return 0;

 err:
  uvmunmap(new, 0, i / PGSIZE, 1);
  return -1;
}

// mark a PTE invalid for user access.
// used by exec for the user stack guard page.
void uvmclear(pagetable_t pagetable, uint64 va)
{
  pte_t *pte;
  
  pte = walk(pagetable, va, 0);
  if(pte == 0)
    panic("uvmclear");
  *pte &= ~PTE_U;
}

// Copy from kernel to user.
// Copy len bytes from src to virtual address dstva in a given page table.
// Return 0 on success, -1 on error.
int copyout(pagetable_t pagetable, uint64 dstva, char *src, uint64 len)
{
  uint64 n, va0, pa0;

  while(len > 0){
    va0 = PGROUNDDOWN(dstva);
    pa0 = walkaddr(pagetable, va0);
    if(pa0 == 0) 
      return -1;
    n = PGSIZE - (dstva - va0);
    if(n > len) 
      n = len;
    memmove((void *)(pa0 + (dstva - va0)), src, n);

    len -= n;
    src += n;
    dstva = va0 + PGSIZE;
  }
  return 0;
}

// Copy from user to kernel.
// Copy len bytes to dst from virtual address srcva in a given page table.
// Return 0 on success, -1 on error.
int copyin(pagetable_t pagetable, char *dst, uint64 srcva, uint64 len)
{
  uint64 n, va0, pa0;

  while(len > 0){
    va0 = PGROUNDDOWN(srcva);
    pa0 = walkaddr(pagetable, va0);
    if(pa0 == 0)
      return -1;
    n = PGSIZE - (srcva - va0);
    if(n > len)
      n = len;
    memmove(dst, (void *)(pa0 + (srcva - va0)), n);

    len -= n;
    dst += n;
    srcva = va0 + PGSIZE;
  }
  return 0;
}

// Copy a null-terminated string from user to kernel.
// Copy bytes to dst from virtual address srcva in a given page table,
// until a '\0', or max.
// Return 0 on success, -1 on error.
int copyinstr(pagetable_t pagetable, char *dst, uint64 srcva, uint64 max)
{
  uint64 n, va0, pa0;
  int got_null = 0;

  while(got_null == 0 && max > 0){
    va0 = PGROUNDDOWN(srcva);
    pa0 = walkaddr(pagetable, va0);
    if(pa0 == 0)
      return -1;
    n = PGSIZE - (srcva - va0);
    if(n > max)
      n = max;

    char *p = (char *) (pa0 + (srcva - va0));
    while(n > 0){
      if(*p == '\0'){
        *dst = '\0';
        got_null = 1;
        break;
      } else {
        *dst = *p;
      }
      --n;
      --max;
      p++;
      dst++;
    }

    srcva = va0 + PGSIZE;
  }
  if(got_null){
    return 0;
  } else {
    return -1;
  }
}

/* NTU OS 2022 */
/* Print multi layer page table. */
void gothrough(pagetable_t pagetable, int l, bool last0, bool last1, uint64 va0){
  int last = -1;
  if(l != 2){
    for(int i = 511; i >= 0; i--){
      pte_t pte = pagetable[i];
      if(pte & PTE_V) {last = i; break;}
    }
  }else last = 511;
  for(int i = 0; i <= last; i++){
    // printf("%d %d\n", l, i);
    pte_t pte = pagetable[i];
    if((pte & PTE_V) || (l==2 && (pte & PTE_S))){
      if(l == 1) last0 ?printf("    ") :printf("|   ");
      else if(l == 2){
        last0 ?printf("    ") :printf("|   ");
        last1 ?printf("    ") :printf("|   ");
      } 
      uint64 child = PTE2PA(pte);
      uint64 va = va0 + (i<<((2-l)*9));
      // 在交換頁面時顯示PTE_S 位。顯示塊號交換頁麵條目
      if(l == 2 && (pte & PTE_S))
        printf("+-- %d: pte=%p va=%p blockno=%p", i, &pagetable[i], (uint64)(va<<12), PTE2BLOCKNO(pagetable[i]));
      else 
        printf("+-- %d: pte=%p va=%p pa=%p V", i, &pagetable[i], (uint64)(va<<12), child);
      // ??有標誌位V、R、W、X、U。請注意，不打印沒有 PTE_V 位的 PTE。
      if(pte & PTE_R) printf(" R");
      if(pte & PTE_W) printf(" W");
      if(pte & PTE_X) printf(" X");
      if(pte & PTE_U) printf(" U");
      if(l == 2 && (pte & PTE_S)) printf(" S");
      printf("\n");
      if(l == 0) gothrough((pagetable_t)child, l+1, i == last, true, va);
      if(l == 1) gothrough((pagetable_t)child, l+1, last0, i == last, va);
    }
  }
}

void vmprint(pagetable_t pagetable) {
  /* TODO */
  printf("page table %p\n", pagetable);
  gothrough(pagetable, 0, 0, 0, 0);
  // panic("not implemented yet\n");
}

/* NTU OS 2022 */
/* Map pages to physical memory or swap space. */
int madvise(uint64 base, uint64 len, int advice) {
  /* TODO */
  // addr 和length 指定內存地址的範圍[addr, addr+length)。addr+length?包括
  // 相應的內存區域是覆蓋地址範圍的最小頁集 len=0?????????????????
  // 如果內存區域的一部分超過進程內存大小(myproc()?>sz)，它返回?1
  if(len == 0) return 0;
  len = PGROUNDUP(base+len);
  if(len > myproc()->sz) return -1;
  // 處理MADV_NORMAL。只檢查是否有效
  base = PGROUNDDOWN(base);
  if(advice == MADV_NORMAL) return 0;
  // 否則，執?適當的操作並返回 0
  // 處?MADV_DONTNEED。在區域內物?內存中的頁面被移動到磁盤
  else if(advice == MADV_DONTNEED){
    pagetable_t pt = myproc()->pagetable;
    // printf("pagetable=%p\n", pt);
    for(uint64 d = base; d < len; d += PGSIZE){
      pte_t *pte = walk(pt, d, 0);
      // pte_t *pte = &((pagetable_t)PTE2PA(((pagetable_t)PTE2PA(pt[PX(2, d)]))[PX(1, d)]))[PX(0, d)];
      // printf("%d %d %d %p %p %p\n", PX(2, d), PX(1, d), PX(0, d), d, pt, *pte);
      // printf("%p %p %p\n", pt[PX(2, d)], ((pagetable_t)PTE2PA(pt[PX(2, d)]))[PX(1, d)], *pte);
      if(pte != 0 && (*pte) & PTE_V){
        // printf("%p %p %p\n", d, pt, *pte);
        uint64 bno;
        begin_op();
        write_page_to_disk(ROOTDEV, (char  *)PTE2PA(*pte), bno = balloc_page(ROOTDEV));
        end_op();
        // printf("bno = %d\n", bno);
        // 設置 PTE_S 位並取消這些頁面的 PTE 上的 PTE_V 位
        // *pte = ((*pte & (~PTE_V)) | PTE_S) | (bno << 54);
        kfree((void *)PTE2PA(*pte));
        *pte = ((BLOCKNO2PTE(bno) | PTE_FLAGS(*pte)) & (~PTE_V)) | PTE_S;
      }
      // printf("%p %p\n", d, *(char *)d);
    }
  }
  // MADV_WILLNEED 確保物?分配內存區域內的頁面 
  // PTE_V 位設置在那些受影響的頁表條目上
  else if(advice == MADV_WILLNEED){
    pagetable_t pt = myproc()->pagetable;
    for(uint64 d = base; d < len; d += PGSIZE){
      pte_t *pte = walk(pt, d, 0);
      // pte_t *pte = &((pagetable_t)PTE2PA(((pagetable_t)PTE2PA(pt[PX(2, d)]))[PX(1, d)]))[PX(0, d)];
      // Swap page in
      if(pte != 0 && ((*pte) & PTE_S)){
        // uint64 bno = (*pte)>>54;
        // *pte = ((*pte) & (~PTE_S)) | PTE_V;
        uint64 bno = PTE2BLOCKNO(*pte);
        char *pa = kalloc();
        // *pte = (((*pte) & (~PTE_S)) | PTE_V)<<10>>10;
        // read_page_from_disk(ROOTDEV, (char *)PTE2PA(*pte), bno);
        read_page_from_disk(ROOTDEV, pa, bno);
        // kfree(pte);
        // *pte = ((PA2PTE(*pa) | (PTE_FLAGS(*pte))) & (~PTE_S)) | PTE_V;
        // uint64 bno = PTE2BLOCKNO(*pte);
        // char *pa = kalloc(); /* Assume pa != 0 */
        // read_page_from_disk(ROOTDEV, pa, bno);
        // /* Create a PTE from a BLOCKNO and flag bits */
        *pte = ((PA2PTE(pa) | PTE_FLAGS(*pte)) & (~PTE_S)) | PTE_V;
        begin_op();
        bfree_page(ROOTDEV, bno);
        end_op();
      }// not Swap 創造
      else if(pte == 0 || ((*pte & PTE_V) == 0)){
        void *mem = kalloc();
        memset(mem, 0, PGSIZE);
        // mappages(pt, d, PGSIZE, (uint64)mem, PTE_X|PTE_W|PTE_U|PTE_R);
        *pte = PA2PTE(mem) | (PTE_X|PTE_W|PTE_U|PTE_R|PTE_V);
      }
    }
  }
  return 0;
  // panic("not implemented yet\n");
}

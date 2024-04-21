#include "param.h"
#include "types.h"
#include "memlayout.h"
#include "riscv.h"
#include "spinlock.h"
#include "defs.h"
#include "proc.h"

/* NTU OS 2022 */
/* Page fault handler */
// 始終在新分配的??上標記PTE_U、PTE_R、PTE_W、PTE_X 標誌。
int handle_pgfault() {
  // 在 hanle_page_fault() 中，調? uint64 va = r_stval() 以查找有問題的虛擬地址，
  /* Find the address that caused the fault */
  uint64 stval = r_stval(); 
  // 並使? PGROUNDDOWN() 將地址舍?到??邊界。
  stval = PGROUNDDOWN(stval);
  struct proc *p = myproc(); pagetable_t pt = p->pagetable;
  // 讀入的虛擬位址比p->sz大、讀入的虛擬位址比進程的使用者棧小
  if(stval >= p->sz || stval < PGROUNDDOWN(p->trapframe->sp)){
    p->killed = 1;
    return 0;
  }
  /* TODO */
  // panic("not implemented yet\n");
  // 利?下?的函數為有問題的虛擬地址分配?個物理??
  // 交換頁面上的頁面錯誤 處理交換頁面。如果頁面被交換到磁盤的虛擬地址
  // 上觸發了頁面錯誤，則將交換的頁面移回物理內存
  pte_t *pte = walk(pt, stval, 0);
  if(pte != 0 && (*pte) & PTE_S){
    uint64 bno = (*pte)>>54;
    *pte = (((*pte) & (~PTE_S)) | PTE_V)<<10>>10;
    read_page_from_disk(ROOTDEV, (char *)PTE2PA(*pte), bno);
    begin_op();
    bfree_page(ROOTDEV, bno);
    end_op();
    return 0;
  }
  char *mem = kalloc();
  if(mem == 0) p->killed = 1; //申請空間不夠
  else{
    memset(mem, 0, PGSIZE);
    if(mappages(p->pagetable, stval, PGSIZE, (uint64)mem, PTE_W|PTE_X|PTE_R|PTE_U) != 0)
      p->killed = 1;
  }
  return 0; //???????????
}

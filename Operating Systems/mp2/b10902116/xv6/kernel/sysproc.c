#include "types.h"
#include "riscv.h"
#include "param.h"
#include "defs.h"
#include "date.h"
#include "memlayout.h"
#include "spinlock.h"
#include "proc.h"

uint64
sys_exit(void)
{
  int n;
  if(argint(0, &n) < 0)
    return -1;
  exit(n);
  return 0;  // not reached
}

uint64
sys_getpid(void)
{
  return myproc()->pid;
}

uint64
sys_fork(void)
{
  return fork();
}

uint64
sys_wait(void)
{
  uint64 p;
  if(argaddr(0, &p) < 0)
    return -1;
  return wait(p);
}

// 刪除物理??分配部分。
// 相反，它修改 myproc()->sz 以在沒有實際分配的情況下將進程內存??增加 n 字節，
// 並返回舊的進程內存??。
// 此外，proc.c 中 proc_freepagetable() 和 vm.c 中的 uvmunmap() 假定 sbrk() 的原始?為。
// 請修改它們，以便它們不會在未分配的??上失敗??

// 修改 sys_sbrk(n) 以在 n 為負數並減? myproc()->sz 時釋放物理??。
uint64 sys_sbrk(void)
{
  int addr;
  int n;
  
  if(argint(0, &n) < 0)
    return -1;

  struct proc *p = myproc();
  addr = p->sz;
  p->sz += n;
  if(p->sz >= MAXVA) return addr;
  if(n < 0){
    if(p->sz > addr){
      p->sz = 0;
      uvmunmap(p->pagetable, 0, PGROUNDUP(addr)/PGSIZE, 1);
    }else 
      uvmunmap(p->pagetable, PGROUNDUP(p->sz), (PGROUNDUP(addr)-PGROUNDUP(p->sz))/PGSIZE, 1);
  }
  return addr;
}

uint64
sys_sleep(void)
{
  int n;
  uint ticks0;


  if(argint(0, &n) < 0)
    return -1;
  acquire(&tickslock);
  ticks0 = ticks;
  while(ticks - ticks0 < n){
    if(myproc()->killed){
      release(&tickslock);
      return -1;
    }
    sleep(&ticks, &tickslock);
  }
  release(&tickslock);
  return 0;
}


#ifdef LAB_PGTBL
int
sys_pgaccess(void)
{
  // lab pgtbl: your code here.
  return 0;
}
#endif

uint64
sys_kill(void)
{
  int pid;

  if(argint(0, &pid) < 0)
    return -1;
  return kill(pid);
}

// return how many clock tick interrupts have occurred
// since start.
uint64
sys_uptime(void)
{
  uint xticks;

  acquire(&tickslock);
  xticks = ticks;
  release(&tickslock);
  return xticks;
}

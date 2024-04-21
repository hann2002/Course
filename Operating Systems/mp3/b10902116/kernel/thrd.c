#include "types.h"
#include "riscv.h"
#include "defs.h"
#include "date.h"
#include "param.h"
#include "memlayout.h"
#include "spinlock.h"
#include "proc.h"

// for mp3
uint64
sys_thrdstop(void)
{
  int delay;
  uint64 context_id_ptr;
  uint64 handler, handler_arg;
  if (argint(0, &delay) < 0)
    return -1;
  if (argaddr(1, &context_id_ptr) < 0)
    return -1;
  if (argaddr(2, &handler) < 0)
    return -1;
  if (argaddr(3, &handler_arg) < 0)
    return -1;

  struct proc *p = myproc();

  //TODO: mp3
  
  p->handler = handler;
  p->handler_arg = handler_arg;
  p->delay = delay;
  p->curr_ticks = 0;
  p->alarm = 1;

  // thrdstop delay滴答後用參數 handler_arg 調用 handler 
  // 執行handler前，context(user registers)應存儲在內核

  // 讓context_id_ptr 指向的變量為context_id
  // Copy from user to kernel.
  // Copy len bytes to dst from virtual address srcva in a given page table.
  // Return 0 on success, -1 on error.
  // int copyin(pagetable_t pagetable, char *dst, uint64 srcva, uint64 len)
  int context_id;
  copyin(p->pagetable , (char *)(&context_id), context_id_ptr, sizeof(int));
  // printf("context_id = %d\n", context_id);
  // 如果context_id 為‑1：
  if (context_id == -1){
    // 為context_id 分配一個新ID，用於標識存儲的上下文。
    for (int i = 0; i < MAX_THRD_NUM; i++){
      if(p->tf_used[i] == 0){
        context_id = i;
        p->last_id = i;
        p->tf_used[i] = 1;
        // printf("set id = %d\n", p->last_id);
        break;
      } // 如果所有可用的 ID 都已分配，返回 ‑1 表示錯誤。
      else if(i == MAX_THRD_NUM-1)
        return -1;
    }
  }// 如果context_id是之前thrdstop賦值的：
  else if(context_id > -1 && context_id < MAX_THRD_NUM){ 
    // 直接使用thrdstop標識的這個 ID 來存儲上下文。不要修改 context_id。
    p->last_id = context_id;
    p->tf_used[context_id] = 1;
  }// 否則：返回‑1 表示錯誤
  else return -1;
  // Copy from kernel to user.
  // Copy len bytes from src to virtual address dstva in a given page table.
  // Return 0 on success, -1 on error.
  copyout(p->pagetable , context_id_ptr, (char *)(&context_id), sizeof(int));
  // printf("out thrdstop\n");
  return 0;
  // 在thrdstop的handler執行前調用另一個thrdstop 是未定義的行為。不會發生。一次只需要維護一個計時器。例如
  // thrdstop(10, &id1, handler1, (void *)0);
  // thrdstop(10, &id2, handler2, (void *)0);
  // 請注意，進程在執行處理程序時可能會切換到其他上下文，並使用另一個調用 thrdstop ID。分配ID的目的是區分不同的上下文進行恢復。
  
}

// for mp3
uint64
sys_cancelthrdstop(void)
{
  int context_id, is_exit;
  if (argint(0, &context_id) < 0)
    return -1;
  if (argint(1, &is_exit) < 0)
    return -1;
  //無論 context_id 都應取消 thrdstop（context_id 可能與之前 thrdstop不同
  // if (context_id < 0 || context_id >= MAX_THRD_NUM) {
  //   return -1;
  // }
  struct proc *p = myproc();

  //TODO: mp3
  // 系統調用應根據 is_exit 的值採取不同的操作：
  // 如果 is_exit 為 1：不存儲當前上下文。釋放context_id 指定的存儲上下文並將此 ID 回收。
  if (is_exit == 1){
    if(context_id >= 0 && context_id < MAX_THRD_NUM)
      p->tf_used[context_id] = 0;
  }else if(is_exit == 0){
    // 如果is_exit 為0：根據context_id 存儲當前上下文。
    if(p->last_id < MAX_THRD_NUM && p->last_id > -1)
      p->tf_used[p->last_id] = 0; //?????????
    // printf("last id = %d\n", p->last_id);
    if (context_id == -1){
      // 為context_id 分配一個新ID，用於標識存儲的上下文。
      for (int i = 0; i < MAX_THRD_NUM; i++){
        if(p->tf_used[i] == 0){
          context_id = i;
          p->tf_used[i] = 1;
          break;
        } // 如果所有可用的 ID 都已分配，返回 ‑1 表示錯誤。
        else if(i == MAX_THRD_NUM-1)
          return -1;
      }
    }
    p->last_id = context_id;
    struct trapframe *tf = kalloc();
    memmove(tf, p->trapframe, PGSIZE);
    p->tf_bak[p->last_id] = tf;
    p->tf_used[p->last_id] = 1;
  }
  p->alarm = 0;
  // 返回值是自調用thrdstop 以來進程消耗的滴答數。
  // 如果計時器處於非活動狀態（處理程序已執行），返回前一計時器消耗的滴答數 = 前一次 call thrdstop 設定的 delay
  return p->curr_ticks;
  // return 0;
}

// for mp3
uint64
sys_thrdresume(void)
{
  int context_id;
  if (argint(0, &context_id) < 0)
    return -1;

  struct proc *p = myproc();
  //TODO: mp3
  // 恢復由context_id 指定的上下文
  // 如果context_id 無效（未註冊或超出範圍），則返回‑1 以指示錯誤。
  if(context_id >= MAX_THRD_NUM || context_id < 0 || p->tf_used[context_id] == 0) 
    return -1;
  p->last_id = context_id;
  memmove(p->trapframe, p->tf_bak[context_id], PGSIZE);
  // 返回值：0 表示成功，‑1 表示出錯。
  return 0;
}

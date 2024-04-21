#include "kernel/types.h"
#include "user/setjmp.h"
#include "user/threads.h"
#include "user/user.h"
#define NULL 0

static struct thread* current_thread = NULL;
static int id = 1;
static jmp_buf env_st;
// static jmp_buf env_tmp;

struct thread *thread_create(void (*f)(void *), void *arg){
    struct thread *t = (struct thread*) malloc(sizeof(struct thread));
    unsigned long new_stack_p;
    unsigned long new_stack;
    new_stack = (unsigned long) malloc(sizeof(unsigned long)*0x100);
    new_stack_p = new_stack +0x100*8-0x2*8;
    t->stack = (void*) new_stack;
    t->stack_p = (void*) new_stack_p;
    t->fp = f;
    t->arg = arg;
    t->ID  = id;
    t->buf_set = 0;
    id++;

    // part 2
    t->sig_handler[0] = NULL_FUNC;
    t->sig_handler[1] = NULL_FUNC;
    t->signo = -1;
    t->handler_buf_set = 0;
    return t;
}
void thread_add_runqueue(struct thread *t){
    //在這個函數中，應該讓?線程t繼承當前線程的signal handle
    // printf("before inherit\n");
    // printf("after inherit\n");
    if(current_thread == NULL){
        // TODO
        current_thread = t;
        t->previous = t->next = t;
    }
    else{
        // TODO
        t->sig_handler[0] = current_thread->sig_handler[0];
        t->sig_handler[1] = current_thread->sig_handler[1];
        t->previous = current_thread->previous;
        current_thread->previous->next = t;
        t->next = current_thread;
        current_thread->previous = t;
    }
}
void thread_yield(void){
    // TODO
    // printf("yield\n");
    // 因handler也可調?，所以應根據是否handler將context存在不同jmp bufs
    // 如果在線程函數中調?此函數，則可以像第 1 部分?樣保存上下?。
    // 如果在信號處理程序中調?，則應將上下?保存在另?個 jmp buf 中，以防?丟棄上下?線程函數
    if(current_thread->signo != -1){
        // printf("signo yield %d\n", current_thread->ID);
        if(setjmp(current_thread->handler_env) == 0){
            // printf("signo set buf\n");
            current_thread->handler_buf_set = 1;
            // printf("%d yield setjmp\n", current_thread->ID);
            schedule(); // 確定接下來要運?哪個線程
            dispatch(); // 執?新線程    
        }    
    }else{
        // printf("function yield %d\n", current_thread->ID);
        if(setjmp(current_thread->env) == 0){
            // printf("function set buf\n");
            current_thread->buf_set = 1;
            // printf("%d yield setjmp\n", current_thread->ID);
            schedule(); // 確定接下來要運?哪個線程
            dispatch(); // 執?新線程    
        }
    }
}
void dispatch(void){
    // TODO
    // printf("dispatch\n");
    // 如果有信號來了，這個函數會調?相應的信號處理器。
    if(current_thread->signo != -1){
    // 然?，如果沒有註冊信號處理程序，則應該終?，調?thread exit()
        if(current_thread->sig_handler[current_thread->signo] == NULL_FUNC)
            thread_exit();
        else{
        // 如果處理程序以前從未運?過，您可能需要進??些初始化
            if(current_thread->handler_buf_set == 0){
                // printf("signo env set\n");
                if(setjmp(current_thread->handler_env) == 0){
                    current_thread->handler_env->sp = (unsigned long)current_thread->stack_p - sizeof(jmp_buf);
                    // printf("complete signo env set\n");
                    longjmp(current_thread->handler_env, 1);
                }else{
                    // printf("before handler\n");
                    current_thread->sig_handler[current_thread->signo](current_thread->signo);
                } 
        // 如果之前執?過信號處理程序，使? longjmp 恢復上下?就?夠了。
            }else longjmp(current_thread->handler_env, 1);
        }
        current_thread->signo = -1;
    }
    // 如果信號處理程序剛剛返回，線程應該從被信號中斷的地?繼續執?原來的線程函數
    // 當然，有可能在線程執?其線程函數之前出現信號。
    // 信號處理完
    // 未運?過，需要初始化
    if(current_thread->buf_set == 0){
        if(setjmp(current_thread->env) == 0){
            current_thread->env->sp = (unsigned long)current_thread->stack_p;
            // printf("%d set buf_set\n", current_thread->ID);
            longjmp(current_thread->env, 1);
        }else{
            (*current_thread->fp)(current_thread->arg);
            thread_exit();
        } 
    }else{ // 如果之前執?過線程，?longjmp恢復上下?就可
        // printf("%d before longjmp\n", current_thread->ID);
        // current_thread->buf_set = 0;
        longjmp(current_thread->env, 1);
    }    
}
void schedule(void){
    // TODO
    // printf("schedule %d to %d\n", current_thread->ID, current_thread->next->ID);
    current_thread = current_thread->next;
}
void thread_exit(void){
    // printf("exit\n");
    if(current_thread->next != current_thread){
        // TODO
        // 從運?隊列中移除調?線程，釋放其堆棧和線程結構，
        struct thread* t = current_thread->next;
        current_thread->next->previous =  current_thread->previous;
        current_thread->previous->next =  current_thread->next;
        free(current_thread->stack);
        free(current_thread);
        // ?運?隊列中的下?個要執?的線程更新當前線程並調?dispatch()
        current_thread = t;
        dispatch();
    }
    else{
        // TODO
        // Hint: No more thread to execute
        // 再者，想想當最後?個線程退出時會發?什麼（應該通過某種?式返回到主函數）
        longjmp(env_st, 1);
    }
}
void thread_start_threading(void){
    // TODO
    if(setjmp(env_st) == 0) dispatch();
}
// part 2
void thread_register_handler(int signo, void (*handler)(int)){
    // TODO
    // 將處理程序設置為信號 signo 的當前線程
    // 如果當前線程已經註冊了這個信號對應的信號處理器，就替換掉它
    current_thread->sig_handler[signo] = handler;
}
void thread_kill(struct thread *t, int signo){
    // TODO   向t發送信號signo
    // 該函數只發送?個信號，不觸發任何上下?切換。
    t->signo = signo;
}
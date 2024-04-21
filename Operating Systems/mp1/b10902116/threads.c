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
    //�b�o�Ө�Ƥ��A������?�u�{t�~�ӷ�e�u�{��signal handle
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
    // �]handler�]�i��?�A�ҥH���ھڬO�_handler�Ncontext�s�b���Pjmp bufs
    // �p�G�b�u�{��Ƥ���?����ơA�h�i�H���� 1 ����?�˫O�s�W�U?�C
    // �p�G�b�H���B�z�{�Ǥ���?�A�h���N�W�U?�O�s�b�t?�� jmp buf ���A�H��?���W�U?�u�{���
    if(current_thread->signo != -1){
        // printf("signo yield %d\n", current_thread->ID);
        if(setjmp(current_thread->handler_env) == 0){
            // printf("signo set buf\n");
            current_thread->handler_buf_set = 1;
            // printf("%d yield setjmp\n", current_thread->ID);
            schedule(); // �T�w���U�ӭn�B?���ӽu�{
            dispatch(); // ��?�s�u�{    
        }    
    }else{
        // printf("function yield %d\n", current_thread->ID);
        if(setjmp(current_thread->env) == 0){
            // printf("function set buf\n");
            current_thread->buf_set = 1;
            // printf("%d yield setjmp\n", current_thread->ID);
            schedule(); // �T�w���U�ӭn�B?���ӽu�{
            dispatch(); // ��?�s�u�{    
        }
    }
}
void dispatch(void){
    // TODO
    // printf("dispatch\n");
    // �p�G���H���ӤF�A�o�Ө�Ʒ|��?�������H���B�z���C
    if(current_thread->signo != -1){
    // �M?�A�p�G�S�����U�H���B�z�{�ǡA�h���Ӳ�?�A��?thread exit()
        if(current_thread->sig_handler[current_thread->signo] == NULL_FUNC)
            thread_exit();
        else{
        // �p�G�B�z�{�ǥH�e�q���B?�L�A�z�i��ݭn�i??�Ǫ�l��
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
        // �p�G���e��?�L�H���B�z�{�ǡA��? longjmp ��_�W�U?�N?���F�C
            }else longjmp(current_thread->handler_env, 1);
        }
        current_thread->signo = -1;
    }
    // �p�G�H���B�z�{�ǭ���^�A�u�{���ӱq�Q�H�����_���a?�~���?��Ӫ��u�{���
    // ��M�A���i��b�u�{��?��u�{��Ƥ��e�X�{�H���C
    // �H���B�z��
    // ���B?�L�A�ݭn��l��
    if(current_thread->buf_set == 0){
        if(setjmp(current_thread->env) == 0){
            current_thread->env->sp = (unsigned long)current_thread->stack_p;
            // printf("%d set buf_set\n", current_thread->ID);
            longjmp(current_thread->env, 1);
        }else{
            (*current_thread->fp)(current_thread->arg);
            thread_exit();
        } 
    }else{ // �p�G���e��?�L�u�{�A?longjmp��_�W�U?�N�i
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
        // �q�B?���C��������?�u�{�A������̩M�u�{���c�A
        struct thread* t = current_thread->next;
        current_thread->next->previous =  current_thread->previous;
        current_thread->previous->next =  current_thread->next;
        free(current_thread->stack);
        free(current_thread);
        // ?�B?���C�����U?�ӭn��?���u�{��s��e�u�{�ý�?dispatch()
        current_thread = t;
        dispatch();
    }
    else{
        // TODO
        // Hint: No more thread to execute
        // �A�̡A�Q�Q��̫�?�ӽu�{�h�X�ɷ|�o?����]���ӳq�L�Y��?����^��D��ơ^
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
    // �N�B�z�{�ǳ]�m���H�� signo ����e�u�{
    // �p�G��e�u�{�w�g���U�F�o�ӫH���������H���B�z���A�N��������
    current_thread->sig_handler[signo] = handler;
}
void thread_kill(struct thread *t, int signo){
    // TODO   �Vt�o�e�H��signo
    // �Ө�ƥu�o�e?�ӫH���A��Ĳ�o����W�U?�����C
    t->signo = signo;
}
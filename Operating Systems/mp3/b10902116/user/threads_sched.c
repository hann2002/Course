#include "kernel/types.h"
#include "user/user.h"
#include "user/list.h"
#include "user/threads.h"
#include "user/threads_sched.h"

#define NULL 0

/* default scheduling algorithm */
struct threads_sched_result schedule_default(struct threads_sched_args args)
{
    struct thread *thread_with_smallest_id = NULL;
    struct thread *th = NULL;
    list_for_each_entry(th, args.run_queue, thread_list) {
        if (thread_with_smallest_id == NULL || th->ID < thread_with_smallest_id->ID) {
            thread_with_smallest_id = th;
        }
    }

    struct threads_sched_result r;
    if (thread_with_smallest_id != NULL) {
        r.scheduled_thread_list_member = &thread_with_smallest_id->thread_list;
        r.allocated_time = thread_with_smallest_id->remaining_time;
    } else {
        r.scheduled_thread_list_member = args.run_queue;
        r.allocated_time = 1;
    }

    return r;
}

/* Earliest-Deadline-First scheduling */
struct threads_sched_result schedule_edf(struct threads_sched_args args)
{
    struct thread *first = NULL;
    struct thread *th = NULL;
    struct threads_sched_result r;
    struct thread *late = NULL;
    // check run miss deadline : current_deadline 超過 & id最小
    list_for_each_entry(th, args.run_queue, thread_list) {
        if (th->current_deadline <= args.current_time && (late == NULL || th->ID < late->ID))
            late = th;
    }
    // miss deadline
    if(late != NULL){ 
        r.scheduled_thread_list_member = &late->thread_list;
        r.allocated_time = 0;
        return r;
    } 
    // 找current_deadline最小
    list_for_each_entry(th, args.run_queue, thread_list) {
        if (first == NULL || th->current_deadline < first->current_deadline || 
            (th->current_deadline == first->current_deadline && th->ID < first->ID))
            first = th;
    }
    struct release_queue_entry *re_first = NULL, *re = NULL;
    if(first == NULL){
        // 如果運⾏隊列為空，將scheduled_thread_list_member 設為run_queue
        r.scheduled_thread_list_member = args.run_queue;
        // 並將allocated_time 設置為調度程序在釋放下⼀個線程之前應等待的滴答數
        // release time 最小
        list_for_each_entry(re, args.release_queue, thread_list) {
            if (re_first == NULL || re->release_time < re_first->release_time) {
                re_first = re;
            }
        }
        r.allocated_time = re_first->release_time - args.current_time;
    }else{
        r.scheduled_thread_list_member = &first->thread_list;
        // 被release搶佔 release deadline <===== first、release time最小
        list_for_each_entry(re, args.release_queue, thread_list) {
            if((((re->release_time+re->thrd->period) < first->current_deadline)
                || ((re->release_time+re->thrd->period) == first->current_deadline
                    && re->thrd->ID < first->ID))
            && (re_first == NULL || re_first->release_time > re->release_time)) {
                re_first = re;
            }
        }
        // 被搶
        if(re_first != NULL && first->remaining_time > (re_first->release_time - args.current_time))
            r.allocated_time = re_first->release_time - args.current_time;
        else r.allocated_time = first->remaining_time;
        if(r.allocated_time > first->current_deadline-args.current_time)
            r.allocated_time = first->current_deadline-args.current_time;
    }
    return r;
}

/* Rate-Monotonic Scheduling */
struct threads_sched_result schedule_rm(struct threads_sched_args args)
{
    struct thread *first = NULL;
    struct thread *th = NULL;
    struct threads_sched_result r;
    struct release_queue_entry *re_first = NULL, *re = NULL;
    struct thread *late = NULL;
    // check run miss deadline : current_deadline 超過 & id最小
    list_for_each_entry(th, args.run_queue, thread_list) {
        if (th->current_deadline <= args.current_time && (late == NULL || th->ID < late->ID))
            late = th;
    }
    // miss deadline
    if(late != NULL){ 
        r.scheduled_thread_list_member = &late->thread_list;
        r.allocated_time = 0;
        return r;
    } 
    // meet deadline
    // 找 period 最小 & id最小
    list_for_each_entry(th, args.run_queue, thread_list) {
        if (first == NULL || th->period < first->period || 
            (th->period == first->period && th->ID < first->ID))
            first = th;
    }
    if(first == NULL){ // 如果運⾏隊列為空
        // 將scheduled_thread_list_member 設為run_queue
        r.scheduled_thread_list_member = args.run_queue;
        // 並將allocated_time 設置為調度程序在釋放下⼀個線程之前應等待的滴答數
        // release time 最小
        list_for_each_entry(re, args.release_queue, thread_list) {
            if (re_first == NULL || re->release_time < re_first->release_time) {
                re_first = re;
            }
        }
        r.allocated_time = re_first->release_time - args.current_time;
        return r;
    }
    if(first->current_deadline - args.current_time < first->remaining_time)
        r.allocated_time = first->current_deadline - args.current_time;
    else r.allocated_time = first->remaining_time;
    // check release搶：period <======== 目前period & release < allocated+current_time、release time最小
    list_for_each_entry(re, args.release_queue, thread_list) {
        if((re->release_time < (r.allocated_time+args.current_time))
        && (((re->thrd->period == first->period) && re->thrd->ID < first->ID)
            || (re->thrd->period < first->period))
        && (re_first == NULL || re_first->release_time > re->release_time)) {
            re_first = re;
        }
    }
    // 會被搶
    if(re_first != NULL)
        r.allocated_time = re_first->release_time - args.current_time;
    r.scheduled_thread_list_member = &first->thread_list;
    return r;
}

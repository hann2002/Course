# HW3 - User-Level Thread Library

## 1. Problem Description
In this assignment, we are going to implement a toy example of a user-level thread library. Additionally, we will simulate asynchronous file I/O.

More specifically, there are going to be multiple user-defined threads running simultaneously. Each thread is in charge of solving a computational problem. To the kernel, there is only one process running, so there will never be two threads running at the same time. Instead, you have to use `setjmp` and `longjmp` to context switch between these threads, and make sure they each have a fair share of execution time. When a thread needs to `read` from an external file, it should be put to sleep and let other threads execute. Otherwise, the whole process would have to pause until the call to `read` returns.
We define three possible states for each thread:
- **Running.** The thread is running and occupying the CPU resource.
- **Ready.** The thread has all the input it needs at the moment, and it's waiting for the CPU resource.
- **Waiting.** The thread is waiting for specific file input.

And we maintain two queues: a **ready queue** and a **waiting queue**. The ready queue stores the **running** and **ready** threads, while the waiting queue stores the **waiting** threads. We will then write a scheduler to manage those queues.

## 2. Overview
Here is an overview of how each file in the repository work. More detailed explanations are in the next section.

- `main.c` initializes the data structures needed by the thread library, creates the threads, then hands over to `scheduler.c`
- `scheduler.c` consists of a signal handler and a scheduler.
    - In this assignment, we repurpose two signals to help us perform context-switching. SIGTSTP can be triggered by pressing Ctrl+Z on your keyboard, and SIGALRM is triggered by the `alarm` syscall.
    - The scheduler maintains the waiting queue and the ready queue. Each time the scheduler is triggered, it iterates through the waiting queue to check if any of the requested data are ready. Afterward, it brings all available threads into the ready queue.
    - There are two reasons for a thread to leave the ready queue:
        - The thread has finished executing.
        - The thread wants to read from a file, whether or not the data is ready. In this case, this thread is moved to the waiting queue.
- `threads.c` defines the threads that are going to run in parallel. The lifecycle of a thread should be:
    - Created by calling `thread_create` in `main.c`.
    - Calls `thread_setup` to initialize itself.
    - When a small portion of computation is done, call `thread_yield` to check if a context switch is needed.
    - When it needs to read from a file, call `async_read` to gather the data.
    - After all computations are done, call `thread_exit` to clean up.

## 3. File structure

### main.c
:::danger
:warning: **Warning:** We will use the default version of `main.c` for grading. Your modifications to this file will be discarded.
:::
All of the functions defined here are completed. **Understanding how they work is not required**, but you're highly encouraged to do so.

#### `main(argc, argv)`
To run the executable, you have to pass in 4 arguments:
```
./main [timeslice] [fib_arg] [col_arg] [sub_arg]
```
Where `timeslice` is the number of seconds a thread can execute before context switching. `fib_arg`, `col_arg`, and `sub_arg` are the arguments passed into the 3 thread functions [specified later](#threads.c).

#### `unbuffered_io()`
This function turns stdin, stdout, and stderr into unbuffered I/O.

#### `init_signal()`
This function initializes two signal masks, `base_mask`, `tstp_mask`, and `alrm_mask`. `base_mask` blocks both SIGTSTP and SIGALRM, `tstp_mask` only blocks SIGTSTP, and `alrm_mask` only blocks SIGALRM.
Additionally, it sets [`sighandler`](#sighandler) as the signal handler for SIGTSTP and SIGALRM, then blocks both of them.

#### `init_threads(fib_arg, col_arg, sub_arg)`
This function creates the user-level threads with the given arguments. If an argument is negative, the respective thread will not be created.

#### `start_threading()`
This function sets up the alarm, then calls the scheduler.

### threadtools.h
This file contains the definitions of some variables and structures. It may be important to know what they are, but modifications to them are not required.

#### `struct tcb`
The thread control block (TCB) serves as the storage of per-thread metadata and variables. You are allowed to add more variables if needed.

#### `struct tcb *ready_queue[]`, `struct tcb *waiting_queue[]`
The ready queue and the waiting queue are defined as arrays for simplicity. Upon the initialization of new threads, a TCB structure should be allocated and appended to the ready queue.

There are 5 defined macros **you have to complete**:

#### `thread_create(func, id, arg)`
Call the function `func` and pass in the arguments `id` and `arg`. We guarantee that the maximum number of threads created is 16, and no two threads share the same ID.

#### `thread_setup(id, arg)`
Initialize the thread control block and append it to the ready queue. This macro creates and opens a named pipe, whose name should follow this format:
```
[thread id]_[function name]
```
This macro should also call `setjmp` so the scheduler knows where to `longjump` when it decides to run the thread. more about the scheduler is [specified later](#scheduler.c). <font color="blue">Afterwards, it should return the control to `main.c`.</font>
:::info
:information_source: **Note:**
- The call to `open` should return immediately. i.e. The named pipes should be opened in nonblocking mode.
- You don't have to handle the case where a file with the same name as the named pipe already exists.
:::

#### `thread_yield()`
Every computational problem takes several iterations to finish. After each iteration, a thread should use this macro to check if there's a need to let another thread execute.
This macro should save the execution context, then, **<font color="green">sequentially</font>** unblock SIGTSTP and SIGALRM. If any of the two signals are pending, the signal handler will take over and run the scheduler. If there aren't any signals pending, this macro should block the signals again, then continue executing the current thread.
#### `async_read(count)`
Save the execution context, then jump to the scheduler with `longjmp(sched_buf, 2)`. After the thread restarts, call `read` to receive `count` bytes from the named pipe. We make the following guarantees:
- `count` is less than 512.
- Only one other process will open the FIFO, and it only opens the file for writing.
- The other process that opens the FIFO will not close it until all inputs are written.
- `read` will not return a smaller number than `count`, as long as `count` is reasonable. 

#### `thread_exit()`
Remove the named pipe owned by the thread, then jump to the scheduler with `longjmp(sched_buf, 3)`.

### threads.c
This is where the thread functions are defined. The prototype of a function should always be:
```
void thread_function(int id, int arg)
```
Where `id` is the thread ID, and `arg` is the argument passed in.
You should see 3 functions, and one of them is already implemented for you.
:::warning
:information_source: **Notice:**
- A thread function should always call `thread_setup(id, arg)` in the first line.
- All tasks should be implemented **iteratively** instead of recursively.
- Each iteration should take a bit more than 1 second. To guarantee this, call `sleep(1)` after you've done some computations.
- The variables you declare in the stack will be overwritten after context switching. If you wish to keep them, store them in the TCB.
- Both SIGTSTP and SIGALRM should be blocked when the threads are executing.
- **<font color="green">The arguments passed into the threads will follow the restrictions of each algorithm.</font>**
:::

#### Fibonacci number
A positive integer `N` is passed in as the argument. Your program has to calculate the `N`th Fibonacci number. Specifically,
$$
FIB(n) = \begin{cases}
1&\text{if }n\le 2\\
FIB(n-1) + FIB(n-2)&\text{otherwise}
\end{cases}
$$
For the `i`th iteration, you should print out a line **<font color="green">to the standard output</font>**:
```
[thread id] [FIB(i)]
```

#### Collatz's conjecture

An integer `N`  larger than 1 is passed in as the argument. For each iteration, your program should perform one of the following operations:
- If `N` is even, divide it by 2.
- If `N` is odd, multiply it by 3, then add 1 to it.

Then, it should print out a line **<font color="green">to the standard output</font>**:
```
[thread id] [N]
```
The procedure should stop when `N` is 1.

#### Maximum subarray
You should expect `N` integers written into the FIFO, where `N`, a positive integer, is passed as the argument. The integers are always 4 characters long, padded with spaces, and followed by a line break. For example,
```
   1
   0
8848
  -5
 236
   4
```
represents the array `[1, 0, 8848, -5, 236, 4]`.
For each iteration, your program reads an integer, then prints out a line **<font color="green">to the standard output</font>**:
```
[thread id] [max subarray sum so far]
```
:::info
:information_source: **Note:** A subarray of length 0 is also allowed.
:::

### scheduler.c
This file contains the functions that determine the order of execution. There are two functions you have to complete:

#### sighandler
:::danger
:warning: **Attention!** This function should only be triggered as a result of `thread_yield`. Under no circumstances should you call this function explicitly in your code.
:::
This function should be set as the signal handler for SIGTSTP and SIGALRM in main.c. Upon executing this function, it should print one of the following lines **<font color="green">to the standard output</font>**:
```
caught SIGTSTP
caught SIGALRM
```
<font color="blue">If the signal caught is SIGALRM, you should reset the alarm here.</font>
Then, you should jump to the scheduler with `longjmp(sched_buf, 1)`.

#### scheduler
There are 4 reasons to jump here:
- called by `main.c`.
- `longjmp(sched_buf, 1)` from `sighandler` triggered by `thread_yield`
- `longjmp(sched_buf, 2)` from `async_read`
- `longjmp(sched_buf, 3)` from `thread_exit`

For the first case, this function should execute the earliest created thread. Otherwise, it should perform the following tasks in order:
- Bring every ready thread from the waiting queue to the ready queue. They should be appended to the ready queue while maintaining their relative order. Then, the holes left in the waiting queue should be filled, while keeping the original relative order.
- Remove the current thread from the ready queue if needed. There are two cases:
    - For `async_read`, move the thread to the end of the waiting queue.
    - For `thread_exit`, clean up the data structures you allocated for this thread, then remove it from the ready queue.
- If you have removed a thread in the previous step, take the thread from the end of the ready queue to fill up the hole.
- Switch to the next thread. There are three cases:
    - For `thread_yield`, you should execute the next thread in the queue.
    - For `async_read` and `thread_exit`, you should execute the thread you used to fill up the hole.
    - <font color="blue">If the thread calling `thread_yield`, `thread_exit` or `async_read` is the last thread in queue, execute the first thread.</font>
- When the ready queue is empty, there are two cases:
    - The waiting queue is not empty: you have to wait until one of the threads is ready. If multiple threads are ready, bring all of them in the ready queue.
    - The waiting queue is also empty: return to `main`.

## 4. Execution
You can compile the source code or clean up by using the `make` command. If your implementation include additional files, please add them to the makefile.
:::danger
:warning: **Warning:** This assignment only runs on x86_64 Linux machines. Compatibility with other architectures / OSes is not guaranteed.
:::
:::info
:information_source: **Note:** We use the notations below to represent messages that don't come from the program:
- `// [some text]`: comments
- `^Z`: SIGTSTP delivered
:::

Sample execution 1:
```
$ ./main 3 6 40 -1
0 1
0 1
0 2
caught SIGALRM
1 20
1 10
1 5
caught SIGALRM
0 3
0 5
0 8  // thread 0 exits, SIGALRM pending
1 16
caught SIGALRM
1 8
1 4
1 2
caught SIGALRM
1 1
```

Sample execution 2:
```
$ ./main 3 5 3 -1
0 1
0 1
^Zcaught SIGTSTP
1 10
caught SIGALRM
0 2
0 3
0 5  // thread 0 exits, SIGALRM pending
1 5
^Zcaught SIGTSTP  // SIGALRM still pending
1 16
caught SIGALRM
1 8
1 4
1 2
caught SIGALRM
1 1
```

Sample execution 3:
```
$./main 3 4 -1 2
0 1
^Zcaught SIGTSTP
0 1   // thread 2 leaves the ready queue immediately, so only thread 0 is ready
0 2   // thread 2 receives '  -1\n' right after this line
caught SIGALRM
2 0
0 3   // thread 0 exits, thread 2 does not receive anything, program hangs
2 99  // thread 2 eventually receives '  99\n'
```

## 5. How to run the sample executions

The script `sample_execution.sh` only runs the programs with the appropriate arguments, singals, and inputs. It **doesn't check for errors** at all.

To run a testcase, execute

```
./sample_execution.sh [subtask]
```

Where `subtask` is a number from 1 to 3.

# MP3 - Scheduling
[problemsheet](problemsheet.pdf)
## Overview
The main tasks of this MP are as follows:
1. Exploit xv6’s timer interrupts to enable preemptive user-level threading.
2. Implement several real-time scheduling algorithms with periodic tasks.

To support preemptive scheduling, you need to exploit xv6’s timer interrupts, which is a hardware-enabled mechanism for executing a specific routine at fixed timed intervals. Specifically, you need to modify
the codes for handling timer interrupts to maintain your own timer. When your timer goes off, it preempts
the current control in the user space and call the scheduler. To be able to manipulate this timer from the user space, you also need to implement several system calls. This is the first part of this MP.

For the second part, we provided a real-time threading library that depends on the aforementioned system
calls. Your job is to implement two real-time scheduling algorithms taught in the class: Earliest-Deadline-First Scheduling and Rate-Monotonic Scheduling. Your scheduling algorithms should not produce unnecessary scheduling and dispatching overhead by allocating a proper amount of time to each thread.

## Environment Setup
Unzip MP3.zip in your working directory.

Pull docker image from Docker Hub
```bash
$ docker pull ntuos/mp3
```
Run the container:
```bash
$ docker run -it -v $(pwd)/xv6-riscv:/home/xv6-riscv/ -w /home/xv6-riscv/ \
--name osmp3 ntuos/mp3 /bin/bash
```

## Run the Public Tests
You can specify the scheduler by supplying a command line argument when running make qemu. Remember to
run make clean before you recompile. For example,
```bash
root@1234567890ab:/home/xv6-riscv# make clean
root@1234567890ab:/home/xv6-riscv# make qemu SCHEDPOLICY=THREAD_SCHEDULER_EDF
```
You can run the public tests by the python scripts grade-mp3-EDF.py and grade-mp3-RM.py. For example,
```bash
root@1234567890ab:/home/xv6-riscv# python3 grade-mp3-EDF.py
...
== Test task1 == task1: OK (39.9s)
== Test task2 == task2: OK (12.8s)
== Test task3 == task3: OK (10.0s)
== Test task4 == task4: OK (9.5s)
Score: 12/12
...
```
You can also run the user programs task1, task2, and task3 in xv6 to see the actual output of the tests.
For example,
```bash
$ task2 # SCHEDPOLICY=THREAD_SCHEDULER_EDF
dispatch thread#1 at 0: allocated_time=5
thread#1 finish one cycle at 5: 2 cycles left
dispatch thread#2 at 5: allocated_time=7
thread#2 finish one cycle at 12: 2 cycles left
dispatch thread#1 at 12: allocated_time=5
thread#1 finish one cycle at 17: 1 cycles left
dispatch thread#2 at 17: allocated_time=3
dispatch thread#1 at 20: allocated_time=5
thread#1 finish one cycle at 25: 0 cycles left
dispatch thread#2 at 25: allocated_time=4
thread#2 finish one cycle at 29: 1 cycles left
run_queue is empty, sleep for 3 ticks
dispatch thread#2 at 32: allocated_time=7
thread#2 finish one cycle at 39: 0 cycles left
```
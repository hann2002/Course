# MP1 - User-Level Thread Package
[problemsheet](problemsheet.pdf)
## Description
Implement a user-level thread package with the help of setjmp and longjmp. 

The threads explicitly yield when they no longer require CPU time. When a thread yields or exits, the next thread should run. The parent thread can send a signal to their children to kill them or trigger their signal handlers.

There are two parts in this MP. 

In the first part, implement the following functions:
- thread add runqueue
- thread yield
- dispatch
- schedule
- thread exit
- thread start threading

In the second part, you’ll need to implement the following functions:
- thread register handler
- thread kill

## Environment Setup
Unzip MP1.zip, and enter it.
```bash
$ unzip MP1.zip
$ cd mp1
```
Pull Docker image from Docker Hub.
```bash
$ docker pull ntuos/mp1
```
Use docker run to start the process in a container and allocate a TTY for the container process.
```bash
$ docker run -it -v $(pwd)/xv6:/home/os_mp1/xv6 ntuos/mp1
```
Enter os mp1/xv6 and execute xv6
```bash
$ cd os_mp1/xv6
$ make qemu
```

## Sample Output
### Part 1
```bash
$ mp1-part1-0
mp1-part1-0
thread 1: 100
thread 2: 0
thread 3: 10000
thread 1: 101
thread 2: 1
thread 3: 10001
thread 1: 102
thread 2: 2
thread 3: 10002
thread 1: 103
thread 2: 3
thread 3: 10003
thread 1: 104
thread 2: 4
thread 3: 10004
thread 1: 105
thread 2: 5
thread 1: 106
thread 2: 6
thread 1: 107
thread 2: 7
thread 1: 108
thread 2: 8
thread 1: 109
thread 2: 9
exited
```
### Past 2
```bash
$ mp1-part2-0
mp1-part2-0
thread 1: 100
handler 3: 20
thread 1: 101
handler 3: 22
thread 1: 102
handler 3: 24
thread 3: 10000
thread 1: 103
thread 3: 10001
thread 1: 104
thread 3: 10002
thread 1: 105
exited
```

## Run Public Test Cases
```bash
$ make grade
```
You can get 35 points (100 points in total) if you pass all public test cases. The output should be similar to the one below.
```bash
== Test thread package with public testcase part1-0 (10%) ==
thread package with public testcase part1-0: OK (16.8s)
== Test thread package with public testcase part1-1 (10%) ==
thread package with public testcase part1-1: OK (1.3s)
== Test thread package with public testcase part2-0 (5%) ==
thread package with public testcase part2-0: OK (0.8s)
== Test thread package with public testcase part2-1 (5%) ==
thread package with public testcase part2-1: OK (0.9s)
== Test thread package with public testcase part2-2 (5%) ==
thread package with public testcase part2-2: OK (1.0s)
Score: 35/35
```
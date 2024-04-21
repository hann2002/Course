# MP2 - Demand Paging and Swapping
[problemsheet](problemsheet.pdf)
## Description
Add demand paging and swapping to existing page table on xv6. 

This first step is to add the vmprint() syscall to show the details of page table. Then, the default behavior of sbrk() syscall will be changed to claim virtual memory without physical memory allocation. The page fault handler will be added
to usertrap() to allocate physical pages on demand. The last step is to implement madvise() syscall to allow the calling process to swap in or swap out certain virtual memory address, and change the page table data structure to support swapping.

## Launch the Docker Image for MP2
Download the MP2.zip from NTUCOOL, unzip it, and enter it.
```bash
$ unzip MP2.zip
$ cd mp2
```
Pull Docker image from Docker Hub
```bash
$ docker pull ntuos/mp2
```
In the mp2 directory, run docker run to enter to the shell in the container.
```bash
$ docker run -it -v $PWD:/root ntuos/mp2
```

## Run the Preliminary Judge
The zip provides a judge program to perform 4 public tests, respectively named mp2_N where N = 1, . . . , 4.

The source code can be found at user/mp2_N.c. The commands below runs all tests at once and produces a report in the same directory.
```bash
$ make STUDENT_ID=d10922013 zip # set your ID here
$ ./judge d10922013.zip
```

## Run Individual Tests
To run one of mp2_N individually, run make qemu to enter the shell and run the mp2_N command, where N = 1, . . . , 4
```bash
$ make clean
$ make qemu
...
xv6 kernel is booting
hart 2 starting
hart 1 starting
init: starting sh
$ mp2_1
```
In the case that the test program hangs, start a new shell and run:
```bash
killall qemu-system-riscv64
```

## Sample Outputs
### Print a Page Table
```bash
*** Now run ’gdb’ in another window.
xv6 kernel is booting
hart 1 starting
hart 2 starting
init: starting sh
$ mp2_1
page table 0x0000000087f57000
+-- 0: pte=0x0000000087f57000 va=0x0000000000000000 pa=0x0000000087f53000 V
  | +-- 0: pte=0x0000000087f53000 va=0x0000000000000000 pa=0x0000000087f52000 V
  | +-- 0: pte=0x0000000087f52000 va=0x0000000000000000 pa=0x0000000087f54000 V R W X U
  | +-- 1: pte=0x0000000087f52008 va=0x0000000000001000 pa=0x0000000087f51000 V R W X
  | +-- 2: pte=0x0000000087f52010 va=0x0000000000002000 pa=0x0000000087f50000 V R W X U
+-- 255: pte=0x0000000087f577f8 va=0x0000003fc0000000 pa=0x0000000087f56000 V
+-- 511: pte=0x0000000087f56ff8 va=0x0000003fffe00000 pa=0x0000000087f55000 V
+-- 510: pte=0x0000000087f55ff0 va=0x0000003fffffe000 pa=0x0000000087f65000 V R W
+-- 511: pte=0x0000000087f55ff8 va=0x0000003ffffff000 pa=0x0000000080007000 V R X
$ qemu-system-riscv64: terminating on signal 15 from pid 45662 (make)
```

### Demand Paging and Swappin
```bash
xv6 kernel is booting
hart 2 starting
hart 1 starting
init: starting sh
$ mp2_3
# Before madvise()
page table 0x0000000087f57000
+-- 0: pte=0x0000000087f57000 va=0x0000000000000000 pa=0x0000000087f53000 V
  | +-- 0: pte=0x0000000087f53000 va=0x0000000000000000 pa=0x0000000087f52000 V
  | +-- 0: pte=0x0000000087f52000 va=0x0000000000000000 pa=0x0000000087f54000 V R W X U
  | +-- 1: pte=0x0000000087f52008 va=0x0000000000001000 pa=0x0000000087f51000 V R W X
  | +-- 2: pte=0x0000000087f52010 va=0x0000000000002000 pa=0x0000000087f50000 V R W X U
  | +-- 4: pte=0x0000000087f52020 va=0x0000000000004000 pa=0x0000000087f58000 V R W X U
+-- 255: pte=0x0000000087f577f8 va=0x0000003fc0000000 pa=0x0000000087f56000 V
+-- 511: pte=0x0000000087f56ff8 va=0x0000003fffe00000 pa=0x0000000087f55000 V
+-- 510: pte=0x0000000087f55ff0 va=0x0000003fffffe000 pa=0x0000000087f65000 V R W
+-- 511: pte=0x0000000087f55ff8 va=0x0000003ffffff000 pa=0x0000000080007000 V R X
# After madvise()
page table 0x0000000087f57000
+-- 0: pte=0x0000000087f57000 va=0x0000000000000000 pa=0x0000000087f53000 V
  | +-- 0: pte=0x0000000087f53000 va=0x0000000000000000 pa=0x0000000087f52000 V
  | +-- 0: pte=0x0000000087f52000 va=0x0000000000000000 pa=0x0000000087f54000 V R W X U
  | +-- 1: pte=0x0000000087f52008 va=0x0000000000001000 pa=0x0000000087f51000 V R W X
  | +-- 2: pte=0x0000000087f52010 va=0x0000000000002000 pa=0x0000000087f50000 V R W X U
  | +-- 4: pte=0x0000000087f52020 va=0x0000000000004000 blockno=0x00000000000002f8 R W X U S
+-- 255: pte=0x0000000087f577f8 va=0x0000003fc0000000 pa=0x0000000087f56000 V
+-- 511: pte=0x0000000087f56ff8 va=0x0000003fffe00000 pa=0x0000000087f55000 V
+-- 510: pte=0x0000000087f55ff0 va=0x0000003fffffe000 pa=0x0000000087f65000 V R W
+-- 511: pte=0x0000000087f55ff8 va=0x0000003ffffff000 pa=0x0000000080007000 V R X
$ qemu-system-riscv64: terminating on signal 15 from pid 46206 (make)
```
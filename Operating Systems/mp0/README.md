# mp0 - tree command and mp0 command
[problemsheet](problemsheet.pdf)

## Description
tree is a command used to list the contents of directories in a tree-like format. 

Implement a command called mp0 to mimic the traversing behavior of the tree command. However, we do not need to
print the traversed file in a tree-like format. Instead, count the number of occurrences of a given key in each traversed path.

## Detailed Steps
The process mp0 reads two argument from the command line.
```bash
$ mp0 <root_directory> <key>
```
The process forks a child. The child process has to traverse the files and directories under `<root directory>`, output the path and the number of occurrences of the given key, and analyze the total number of traversed files and directories.
```bash
<path> <occurrence>
```

However, if the `<root directory>` does not exist or is not a directory, you should print the following line:
```bash
<root_directory> [error opening dir]
```

The child process sends two integers, file num and dir num, to the parent process through a pipe.
 - file num: the number of traversed files
 - dir num: the number of traversed directories

The parent process reads the integers from the pipe and prints
```bash
<dir_num> directories, <file_num> files
```

## Sample Outputs
### Testcase 1
```bash
$ testgen
$ mp0 os2023 d
os2023 0
os2023/d1 1
os2023/d2 1
os2023/d2/a 1
os2023/d2/b 1
os2023/d2/c 1
os2023/d3 1
os2023/d3/a 1
os2023/d3/b 1
6 directories, 2 files
```
### Testcase 2
```bash
$ testgen
$ mp0 os2023/ d
os2023/ 0
os2023//d1 1
os2023//d2 1
os2023//d2/a 1
os2023//d2/b 1
os2023//d2/c 1
os2023//d3 1
os2023//d3/a 1
os2023//d3/b 1
6 directories, 2 files
```
### Testcase 3
Assume that os2202 does not exist
```bash
$ mp0 os2202 d
os2202 [error opening dir]
0 directories, 0 files
```

## Public Testcases
You can get 40 points (100 points in total) if you pass all public testcases. You can judge the code by running
the following command in the docker container (not in xv6; this should run in the same place as make qemu).
```bash
$ make grade
```
The output should be the same as below
```bash
== Test mp0 command with public testcase 0 (5%) ==
mp0 command with public testcase 0: OK (10.9s)
== Test mp0 command with public testcase 1 (5%) ==
mp0 command with public testcase 1: OK (0.7s)
== Test mp0 command with public testcase 2 (5%) ==
mp0 command with public testcase 2: OK (0.7s)
== Test mp0 command with public testcase 3 (5%) ==
mp0 command with public testcase 3: OK (0.9s)
== Test mp0 command with public testcase 4 (10%) ==
mp0 command with public testcase 4: OK (1.1s)
== Test mp0 command with public testcase 5 (10%) ==
mp0 command with public testcase 5: OK (0.9s)
Score: 40/40
```
If you want to know the details about the testcases, please check xv6/grade-mp0 and xv6/user/testgen.c
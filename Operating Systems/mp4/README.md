# MP4 - File System
[problemsheet](problemsheet.pdf)
## Overview
Learn the fundamental knowledge of the file system by adding two features to xv6: large files and symbolic links.

## Environment Setup
Unzip MP4.zip, and enter the folder.
```bash
$ unzip MP4.zip
$ cd mp4
```
Pull the docker image.
```bash
$ docker pull ntuos/mp4
```
Run the following command to start a container and mount the directory.
```bash
$ docker run -it --name mp4 -v $(pwd)/xv6:/home/xv6 ntuos/mp4
```
After getting into the container, run the command to start an xv6.
```bash
(container)$ make qemu
```

## Problem 1: Large Files
### Description
In this problem, you have to increase the maximum size of an xv6 file. You need to implement “doubly-indirect” blocks, containing 256 addresses of singly-indirect blocks, each of which can contain up to 256 addresses of data blocks. By modifying one direct block into a “doubly-indirect” block, a file will be able to consist of up to 65803 blocks (11 from direct blocks, 256 from singly-indirect blocks and 256 × 256 from doubly-indirect blocks). However, it is still not sufficient to accomplish our goal. You will need to implement extra doubly-indirect blocks to achieve up to 66666 blocks.

### How to Test
```bash
# make bigfile
........qemu log........
Testing large files: (38.2s)
Large files: public testcase 1 (6 points): OK
Large files: public testcase 2 (6 points): OK
Score: 12/12
```

## Problem 2: Symbolic Links to Files
### Description
In this problem, you have to add symbolic links to xv6. You will implement the symlink(char *target, char
*path) system call, which creates a new symbolic link at path that refers to a file named target. 

In addition, you also need to handle open when encountering symbolic links. If the target is also a symbolic link, you must recursively follow it until a non-link file is reached. If the links form a cycle, you must return an error code. You may approximate this by returning an error code if the depth of links reaches some threshold (e.g., 20).
However, when a process specifies O NOFOLLOW flags, open should open symbolic links (not targets).

### How to Test
```bash
# make symlinkfile
........qemu log........
Testing symbolic links to files (public): (2.1s)
Symbolic links to files: public testcase 1 (9 points): OK
Symbolic links to files: public testcase 2 (9 points): OK
Score: 18/18
```

## Problem 3: Symbolic Links to Directories
### Description
Instead of just implementing symbolic links to files, now you should also consider symbolic links to directories. We expect that a symbolic link to a directory should have these properties:
1. It can be part of a path, and will redirect to what it links to.
2. You can cd a symbolic link if it links to a directory.
### How to Test
```bash
# make symlinkdir
........qemu log........
Testing symbolic links to directories (public): (2.1s)
Symbolic links to directories: public testcase 1 (9 points): OK
Symbolic links to directories: public testcase 2 (9 points): OK
Score: 18/18
```
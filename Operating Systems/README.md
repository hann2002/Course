# Operating Systems 2023

## MP0 - tree command and mp0 command
tree is a command used to list the contents of directories in a tree-like format. 

Implement a command called mp0 to mimic the traversing behavior of the tree command. However, we do not need to
print the traversed file in a tree-like format. Instead, count the number of occurrences of a given key in each traversed path.

### Sample Output
```bash
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

## MP1 - User-Level Thread Package
Implement a user-level thread package with the help of setjmp and longjmp. 
- thread add runqueue
- thread yield
- dispatch
- schedule
- thread exit
- thread start threading
- thread register handler
- thread kill

## MP2 - Demand Paging and Swapping
Add demand paging and swapping to existing page table on xv6. 

## MP3 - Scheduling
The main tasks are as follows:
1. Exploit xv6’s timer interrupts to enable preemptive user-level threading.
2. Implement several real-time scheduling algorithms with periodic tasks.

## MP4 - File System
Add two features to xv6: 
1. large files 
2. symbolic links.
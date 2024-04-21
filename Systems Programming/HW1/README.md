# HW1 csieBooking

## 1. Problem Description
Due to the coronavirus, people are asked to keep the social distance or even stay at home. This situation strikes the business of stores. Fortunately, as vaccines are maturely developed, we have successfully survived the epidemic and entered the post-epidemic era. In this post-epidemic era, economies are recovering. To help stores resume business, you are expected to implement a simplified multi-service booking system: **csieBooking**.

The csieBooking system is comprised of **read servers** and **write servers**. Both can access a file **`bookingRecord`** that records information about users' bookings. When a server gets a request from a client, it will respond according to the file's content. A read server tells the client how many items it has booked. A write server can modify the file to book more or less items.

However, the users of csieBooking system are somehow impatient and selfish. A user may grab a coffee after his/her connection is accepted without making request to server, which blocks all subsequent users. Moreover, users cherish their time and are unwilling to wait. Thus, it's your responsiblity to equip the csieBooking system with the ability to **serve multiple users simultaneously**.

You are expected to complete the following tasks:
1. Implement the servers. The provided sample source code `server.c` can be compiled as simple read/write servers so you don't have to code them from scratch (but feel free to edit any part of codes). Details will be described in the later part.

2. Modify the code in order that the servers will not be blocked by any single request, but can deal with many requests simultaneously.  
( 💡 You might want to use `select()` or `poll()` to implement the multiplexing system. However, remember not to do anything that will result in busy waiting. )

3. Guarantee the correctness of file content when it is being modified. You might want to use file lock to protect the file. 
( 💡 You are supposed to be aware that file lock is a process-oriented tool and a server is exactly a process. )


## 2. Running the Sample Servers
The provided sample code can be compiled as sample servers.
The sample server has handled the part of socket programming, so you are able to connect to the sample server once you run it.
Feel free to modify any part of the code as you need, or implement your own server from scratch.

### Compile
You should write your own `Makefile` to compile your code. You can use the provided command to compile sample source code:
```
$ gcc server.c -D WRITE_SERVER -o write_server
$ gcc server.c -D READ_SERVER -o read_server
```
Your `Makefile` may contain commands above to generate `write_server` and `read_server`.
Also, your `Makefile` should be able to perform cleanup after the execution correctly (i.e, delete `read_server` and `write_server`).

### Run
After you compile the code, you can run the server with following command:
```
$ ./write_server {port}
$ ./read_server {port}
```
For example, `./write_server 7777` runs a write server listening on port 7777, and `./read_server 8888` runs a read server listening on port 8888.
Note that port 0~1023 are reserved for common TCP/IP applications, so you should not pick a number within this range.

### Port in use
:::spoiler **Click me**
Only one process can listen on a port simultaneously. Thus, if you see `bind: Address already in use` after you try to run a server, you should pick another port number. You may use `netstat -tupln | grep LISTEN` to check which ports are currently in use before you run the server. The following figure shows example output of the command `netstat -tupln | grep LISTEN` after TA run `./read_server 7777` on the workstation.
![](https://i.imgur.com/kqD9ivB.png)
If the process currently listening on a port is spawned by you, you can see the process ID (PID) in the output (1332790 in the figure).

Also, you can issue `ps x` to see your process. The following figure shows example output of the command `ps x` after TA run `./read_server 7777` on the workstation.
![](https://i.imgur.com/i1n35Vt.png)
The figure shows that a read server listening on port 7777 is running with PID 1332790.
After you obtain the PID, you can issue `kill -9 {PID}` to kill the process immediately if you can't kill it with Ctrl+C. In the example, 
`kill -9 1332790` will kill the read server I run and make port 7777 available.

:::

## 3. Testing your Servers at Client Side
You can use the command `telnet {hostname} {port}` to connect to a running server.
For example, if you run `./read_server 7777` on CSIE linux1 workstation, you can interact with this read server with `telnet linux1.csie.ntu.edu.tw 7777`. 

Similarly, if you run `./write_server 10000` on CSIE linux3 workstation, you can interact with this write server with `telnet linux3.csie.ntu.edu.tw 10000`.

If you are running sample servers, try to type something on the client side. You will see some messages from servers.

(TAs will test your code on `linux1`. Make sure your code works as you expect on it.)
## 4. About the Booking Record File
The servers will access the file `bookingRecord`. The file contains 20 user's information made up with a **user id** (ranged from **902001** to **902020** only) and **user's booking state**. Booking state will be an array, `bookingState`, with 3 integer values. These integer values represent the amount of each item booked by the user. In our case, the correspondence between the items and the indexes will be:
* `Food` = 0
* `Concert` = 1
* `Electronics`= 2 

You may need following definitions to use these indexes more flexibly:

```
#define OBJ_NUM 3

#define FOOD_INDEX 0
#define CONCERT_INDEX 1
#define ELECS_INDEX 2
#define RECORD_PATH "./bookingRecord"

static char* obj_names[OBJ_NUM] = {"Food", "Concert", "Electronics"};
```
Following is the structure of a record stored in `bookingRecord`:
```
typedef struct {
 int id;          // 902001-902020
 int bookingState[OBJ_NUM]; // amount of booked objects
} record;
```
For those who are not familiar with c language, you might want to check this [website](https://www.geeksforgeeks.org/readwrite-structure-file-c/).

Note that there is a `bookingRecord` in your repository. You can use this `bookingRecord` to test your code by yourself. However, when judging your homework, TAs will use another `bookingRecord`, so make sure your code does not depend on a fixed `bookingRecord`.
## 5. Sample input and output 
### 5.1 Read Server
:::spoiler {state="open"}  **Click me**
A client can read an user's booking state. Once it connects to a read server, the terminal will show the following:
`Please enter your id (to check your booking state):`
If the client types an valid id (for example, `902001` ) on the client side, the server shall reply:
```
Food: 1 booked
Concert: 3 booked
Electronics: 0 booked

(Type Exit to leave...)
```
Now, if the client types `Exit`, server should close the connection from the client ([If typing other input, ignore it](https://github.com/NTU-SP/SP-Hw1-release/issues/3#issue-1391876971)). Note that you should keep the booking state of this id **unwritable** by others until server receive `Exit` from the client.

Booking state of the same id could be **read** simultaneously. However, if someone else is **writing** the booking state of the same id, the server shall reply:
`Locked.`
and close the connection from client.
*(Note that there always exists a newline character in the end of output.)*
:::
### 5.2 Write Server
:::spoiler {state="open"}  **Click me**
A client can edit an user's booking states. It will first show the user's previous booking state just like a read server, then ask for a booking command.
Once the client connects to a write server, the terminal will show the following
`Please enter your id (to check your booking state):`
If you type an valid id (for example, `902001` ) on the client side, the server shall reply the booking state of the id, following by a prompt:
```
Food: 1 booked
Concert: 3 booked
Electronics: 0 booked

Please input your booking command. (Food, Concert, Electronics. Positive/negative value increases/decreases the booking amount.):
```
A valid booking command consists of 3 integers, separated by a single space. If the client types a command (for example, `3 -2 4`), the server shall modify the `bookingRecord` file and reply:
```
Bookings for user 902001 are updated, the new booking state is:
Food: 4 booked
Concert: 1 booked
Electronics: 4 booked
```
And close the connection from client. Note that you should keep the booking state of this id **unwritable** & **unreadable** by others once the client determines the id until closing the connection from client.

If someone else is **reading/writing** the booking state of the same id, the server shall reply:
`Locked.`
and close the connection from client.
*(Note that there always exists a newline character in the end of output.)*
:::

### 5.3 Bounds of the booking amount
:::spoiler **Click me**
#### Upper bound
A user can book at most **15 items** in total. If a user tries to book more than 15 items, the server shall not modify the `bookingRecord` file and reply:
```
[Error] Sorry, but you cannot book more than 15 items in total.
```
Then close the connection from client. 

For instance, if an user's booking state is
```
Food: 5 booked
Concert: 3 booked
Electronics: 4 booked
```
then the command `2 1 1` should be rejected, since the user will book 16 items if this command is accepted. If another client reads this user's booking state afterwards, the result should still be
```
Food: 5 booked
Concert: 3 booked
Electronics: 4 booked
```
since the `bookingRecord` should not be modified.

#### Lower bound
On the other hand, each value of a user's booking state **shouldn't be negative**. In this case, the server shall not modify the `bookingRecord` file and reply:
```
[Error] Sorry, but you cannot book less than 0 items.
```
And close the connection from client. 

For instance, if an user's booking state is
```
Food: 1 booked
Concert: 3 booked
Electronics: 2 booked
```
then the command `-2 2 0` should be rejected, since the user will book -1 food if this command is accepted. If another client reads this user's booking state afterwards, the result should still be
```
Food: 1 booked
Concert: 3 booked
Electronics: 2 booked
```
since the `bookingRecord` should not be modified.

#### * Note that upper bound error and lower bound error will not exist simultaneously in TA's testing data

:::

### 5.4 Input checking
:::spoiler **Click me**
It's your responsibility to check whether an input is valid. If an input is invalid, it should be seen as a failed operation, and the server shall reply:

`[Error] Operation failed. Please try again.`

and close the connection from the client.
*(Note that there always exists a newline character in the end of output.)*

#### Possible **invalid** inputs in testdata
* Id not in range
* Id contains alphabets
* Booking command contains alphabets or invalid minus sign

#### Guarantee about the invalid format
* Each input is less than 32 bytes
* Every value in inputs will not start with leading 0s
* Each booking command consists of 3 parts separated by **a single space** and there will be no leading space or trailing spaces
* Each part consists of **alphabets**, **digits** and **minus sign**
* Each part consists of less than or equal to 5 characters
* Or, in [regex](https://en.wikipedia.org/wiki/Regular_expression): 
`[-A-Za-z0-9]{1,5} [-A-Za-z0-9]{1,5} [-A-Za-z0-9]{1,5}` 
* `153ab x81 -2`, `x-1 34 y-325` may appear in testdata
* `+1 2 3` (`+` must not appear), `abc123 4 123`(length of `abc123` is 6), `1 　2 3  `(multiple spaces between parts and trailing spces) will **not** appear in the testdata
* **Upper bound error** and **lower bound error** will not exist simultaneously
:::

## 6. Execution: Sample Judge
In addtion to testing your server with `./read_server`, `./write_server` and `telnet`, we provide `sample_judge.py` and a `bookingRecord` so that you can test your program with a single command `python sample_judge.py`.  

### Arguments
`sample_judge.py` accepts following optional arguments:  
* `-v`, `--verbose`: verbose. if you set this argument, `sample_judge.py` will print messages delivered between server and client, which may help debugging.
* `-t TASK [TASK ...]`, `--task TASK [TASK ...]`, Specify which tasks you want to run. If you didn't set this argument, `sample_judge.py` will run all tasks by default.
  * Valid `TASK` are `["1_1", "1_2", "2", "3", "4", "5_1", "5_2"]`.  

E.g, `python sample_judge.py -t 1_1 3 5_1 -v` set `sample_judge.py` to be verbose, and runs only task 1-1, task 3 and task 5-1.

### Notice on Sample Judge
Score printed by `sample_judge.py` is just for your reference. Real judge is much more complicated than `sample_judge.py`.  
Besides, autograding also used `sample_judge.py` for scoring.  
Thus, you should still test some complex cases by yourselves, maybe by `./read_server`, `./write_server` and `telnet`. Of course, if you can understand `sample_judge.py`, feel free to modify it.

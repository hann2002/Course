# Syetems Programming 2022

## HW1 csieBooking
Implement a simplified multi-service booking system: **csieBooking**, comprised of **read servers** and **write servers**. Both can access a file **`bookingRecord`** that records information about users' bookings. When a server gets a request from a client, it will respond according to the file's content. A read server tells the client how many items it has booked. A write server can modify the file to book more or less items. Equip the csieBooking system with the ability to **serve multiple users simultaneously**.

1. Make sure the servers will not be blocked by any single request, but can deal with many requests simultaneously.  
( Use `select()` or `poll()` to implement the multiplexing system and remember not to do anything that will result in busy waiting. )

2. Guarantee the correctness of file content when it is being modified. You might want to use file lock to protect the file. 
( 💡 You are supposed to be aware that file lock is a process-oriented tool and a server is exactly a process. )

## HW2 PvP Championship
There are 8 players (P0 - P7) in this championship. We use a simpler [Double Elimination Tournament](https://en.wikipedia.org/wiki/Double-elimination_tournament) for this championship. Each battle has only two players, so there are 14 battles(A - N) in total to generate a champion. Finish such a championship by writing 2 programs(battle.c and player.c). 
- **Four modes** in a battle's lifecycle:
    - Init Mode
        - Battle creates its log file, create pipes, fork children..., etc. Then it enters Waiting Mode. 
    - Waiting Mode
        - After the battle initializes itself, it enters Waiting Mode. It is blocked by the pipes until it receives PSSMs from both children.
    - Playing Mode
        - The battle receives children's PSSM, updates them, then sends them back to each children repeatedly until one of the player's HP $\le 0$.
    - Passing Mode
        - The battle is responsible for passing PSSM between its parent and child. The passing mode ends when all its descendant players' HP $\le 0$. After that, **the battle should terminate itself immediately**.

## HW3 User-Level Thread Library
Implement a toy example of a user-level thread library and simulate asynchronous file I/O.

There are going to be multiple user-defined threads running simultaneously. Each thread is in charge of solving a computational problem. Make sure they each have a fair share of execution time. 

Maintain two queues: a **ready queue** and a **waiting queue** and write a scheduler to manage those queues.

## HW4 Simple Movies Recommendation System
Implement a simple movies recommendation system. There are two main tasks.
1. Each request contains a keyword and an user profile, the system should (1) filter the movies by keywords and, (2) do sorting via recommendation scores.
2. Handle multiple search requests simultaneously.


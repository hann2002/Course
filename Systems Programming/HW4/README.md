# HW4 Simple Movies Recommendation System

**[SPEC Link](https://hackmd.io/@claire2222/SkLyBSnIo)**

**[Video Link](https://www.youtube.com/watch?v=ZpgwOeGoqBA)**

## 1. Description
Implement a simple movies recommendation system. There are two main tasks.
1. Each request contains a keyword and an user profile, the system should (1) filter the movies by keywords and, (2) do sorting via recommendation scores.
2. Handle multiple search requests simultaneously.



### Task 1: Filtering and Sorting
#### Content-Based Recommendation
Each request contains a keyword, we first need to filter the movies containing the keyword. Then we should calculate recommendation scores for the filtered movies. 

In MovieLens, movies are labeled with corresponding genres and users give movies ratings from 0.5 to 5 stars. We can use an one-hot vector (v) to represent each movie, where 1 means the movie belongs to this genre and 0 means not belongs to it. 

User profile (U) can be calculated by sum of (ratings * movie_profile). Then we can calculate recommendation score by cosine simalarity. (normalize U and v, then do dot product)
![](https://i.imgur.com/9nuPYUR.png =150x)

#### Parallel Merge Sort
After calculating recommendation scores, we are going to sort the movies by the scores. When doing sort, you are strictly to use our sorting library with time complexity of O(n^2) with a network delay (0.1s) provided by TAs. To verify it, TAs will randomly add secret keys to the movie titles to check whether you used the sorting library.

You may need to divide the list of the movies into several parts, delegate each part to a thread, use the sorting library to sort each part, then merge them to get the final result.

The figure below shows the details of the sorting (with depth = 3). You should use the provided sorting library in the lowest level and pick a suitable depth for a better perfomance.
![](https://i.imgur.com/RYEFMrq.png)


#### Sorting rule: 
1. Movies with higher score should be put in the front. 
2. If the scores are the same, sort with alphabetical order(strcmp) and put the smaller one in the front.

```
void* sort(char** movies, double* pts, int size);

Example:
sort(["A","B","C"], [30.0,40.0,30.0], 3); 

Result:
movies: ["B","A","C"]
pts: [40.0, 30.0, 30.0]
```

#### Hint: 
When implementing with multiprocess, [this page](https://stackoverflow.com/questions/5656530/how-to-use-shared-memory-with-linux-in-c) may help. Also, you can check about the [manpage](https://man7.org/linux/man-pages/man2/mmap.2.html).

### Task 2: Handle Multiple Requests Simultaneously
In some test cases, they will include more than one request. You may need to use multithread to handle multiple requests simultaneously. It might not be possible to expect requests to be processed sequentially within the time limit.

You should be careful to deal with possible race problems when processing requests, since the requests are globally shared. You can use any method taught in this course to protect the shared resources, i.e., critical section, but we recommend you to use mutex since using signal may be more complicated.

## 2. Implementation
### File Structure
```
SP_HW4_release
├── data
│   └── movies.txt
├── header.h
├── lib.c
├── Makefile
├── server.c
└── testcases
    ├── input0.txt
    ├── input1.txt
    ├── input2.txt
    ├── input3.txt
    ├── input4.txt
    └── input5.txt
```
#### 2.1 Makefile
This file will be provided by TA. Feel free to modify it, but the executable file name should not be modified. It should produce `tserver` for using multithread to do merge sort, and `pserver` for using multiprocess to do merge sort.

TA will test your code by running the following commands:
```!
make
./pserver < /path/to/input/data
./tserver < /path/to/input/data
```

#### 2.2 server.c
You should implement the recommender system in server.c. TAs have provided initialize code in this file. Feel free to modify the code if needed.  Please make sure all the movies you filtered are put into `sort()` in `lib.c`. You can write your code like the following example to split codes for pserver and tserver:
```!
#ifdef PROCESS
    fprintf(stderr,"usage: ./pserver");
#elif defined THREAD
    fprintf(stderr,"usage: ./tserver");
#endif
```

#### 2.3 lib.c
This file implement sorting and is provided by TA. You don't need to submit this file. To check whether your server use this library, TA will add the secret key when judging. If you don't use this library, your output will not include the secret key and will be seen as wrong answer.

#### 2.4 header.h
This file will be provided by TA. Feel free to modify it.

#### 2.5 movies.txt
This file includes titles and profiles of movies. It will be provided by TA. It should be put under `./data/`.

#### 2.6 input{0..5}.txt
The test cases are provided. They are placed under `./testcases/`

### Input Format
- format:
  ```!
  [number of requests]\n
  [request id] [keyword] [user profile]\n
  ... 
  ```
  - The `[request id]` for each request is unique for each testcase.
  - Numbers in the user profile is separated by comma(','). There are 19 genres.
  - Number of requests will be 1~32. Request id is an integer between 0~170000. Maximum length of movie titles and keywords is defined in `header.h`.
  - Regular expression for keywords is `([a-zA-Z0-9]+)|\*`. Movies filtered by keyword are case sensitive. 
  
  Note that if the keyword is `*`, it means that the system should return all of the movies. 
  
- example:
  ```!
  2      //num of requests
  0 * 2.5,5.0,5.0,9.5,0.0,3.5,9.5,9.5,4.0,2.5,1.5,6.5,8.0,5.0,0.0,1.0,3.5,5.0,0.0\n
  3 1995 9.5,9.5,4.0,2.5,5.0,5.0,9.5,0.0,1.0,3.5,5.0,0.0,0.0,3.5,2.5,1.5,6.5,8.0,5.0\n
  ```
  There are total two requests in this case. The request with id=0 above will sort all movies in the dataset while the request with id=3 above will sort the movies whose title contains "1995".

  
### Output Format
For pserver, you need to write the sorted search result to `{id}p.out` file. For example, for the input with id=0, the filename of the output should be `0p.out`.

For tserver, you need to write the sorted search result to `{id}t.out` file. For example, for the input with id=0, the filename of the output should be `0t.out`.

You only need to write the titles of the movies into output files.

Example:
```!
{sp2022}:Mudhoney (1965)\n
{sp2022}:Hard Boiled Mahoney (1947)\n
```
`{sp2022}:` is added by the sorting library. Note that this is just an example and the output is not guaranteed to be the same as above.

## 3. How to exec?
In order not to let the test result of the running time of the program be affected by the current workload, we will run your program 3-5 times and take the test result with the shortest running time for each testcase. Meanwhile, we will check the consistency of your results among the tests. If the results are inconsistent, or once the program is crashed, then you will not get points of the testcase. 

Your `Makefile` should produce executable file `tserver` for using multithread to do merge sort  and `pserver` for using multiprocess to do merge sort. The output results `{}.out` of your program should place in your current working dir. TA will pull your repository and replace the `lib.c` library and run with following command to test your program in **linux1.csie.ntu.edu.tw**:  
```
make 
./pserver < /path/to/input/data  
./tserver < /path/to/input/data
```

Remember `make clean` to remove all {}.out and executable file.  
Note that it does not mean you can get full points by successfully running with these two programs in the time limit. We will check about if you have completed the requirements, for instance, using provided sort library, multiprocess programming, i.e., `fork()`.

### Tips
You can quickly test the execution time of your program using following command (note that the variable `real time` in bash using `time` command is counted as time uses):
```
for i in {1..5};do time ./tserver < ./testcases/input$i.txt;echo "";done
for i in {1..5};do time ./pserver < ./testcases/input$i.txt;echo "";done
for i in {0..0};do time ./tserver < ./testcases/input$i.txt;echo "";done
for i in {0..0};do time ./pserver < ./testcases/input$i.txt;echo "";done
```

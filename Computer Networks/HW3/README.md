# HW3 - File transmission and Hashing system

## Description
[HW3 Problemsheet](HW3-ProblemSheet.pdf)

Implement a file transmission and hashing system with congestion control and reliable transmission.

## SACK protocol (Selective Acknowledgment)
A hybrid version of Go-Back-N and Selective Repeat.

## Congestion Control
The sender would define a finite state machine (FSM) on which it can control the window size and threshold dynamically in
order to adjust its strategy as to when to (re)transmit segments.

## Hashing and Storing File
The main application of the receiver is to provide hashing and storing services.
Keep a SHA-256 object that can digest any amount of data given to it.

## Buffer Handling
The receiver keep a buffer. When the buffer is full or the stream is completed, flush the buffer and deliver the data to the application before receiving further data segments.

## Program Building and Execution
### Environment
```bash
$ docker -compose up -d
$ docker exec -it <container_name> bash
```
### Building
After running ```make``` in hw3/, there
will be 3 executables in hw3/: sender, receiver, and agent.

### Arguments
```bash
$ ./ agent <agent_port> <send_ip> <send_port> <recv_ip> <recv_port> <error_rate>
$ ./ receiver <recv_ip> <recv_port> <agent_ip> <agent_port> <dst_filepath>
$ ./ sender <send_ip> <send_port> <agent_ip> <agent_port> <src_filepath>
```
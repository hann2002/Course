# Project 4 - Machine Language Programming
[problemsheet](https://www.nand2tetris.org/project04)

## Description
Write and test the two programs described bellow. When executed on the supplied CPU emulator, your programs should generate the results mandated by the specified tests.

## Mult.asm - Multiplication
In the Hack computer, the top 16 RAM words (RAM[0]...RAM[15]) are also referred to as R0...R15.  
With this terminology in mind, this program computes the value R0*R1 and stores the result in R2.

## Fill.asm - I/O handling
This program illustrates low-level handling of the screen and keyboard devices, as follows. 

The program runs an infinite loop that listens to the keyboard input. When a key is pressed (any key), the program blackens the screen, i.e. writes "black" in every pixel; the screen should remain fully black as long as the key is pressed. 

When no key is pressed, the program clears the screen, i.e. writes "white" in every pixel; the screen should remain fully clear as long as no key is pressed.

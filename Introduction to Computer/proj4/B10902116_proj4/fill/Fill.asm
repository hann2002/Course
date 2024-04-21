// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.
(WHILE)
	@SCREEN
	D = A  			//D = SCREEN
	@I
	M = D 			//M[I] = SCREEN
(FOR)
	@24576
	D = A  			//D = 24576
	@I
	D = D - M		//D = 24576 - M[I]
	@WHILE
	D; JEQ          //I = 24576 GOTO WHILE
(IF)
	@KBD
	D = M			//D = KBD
	@ELSE
	D; JEQ			//D == 0 GOTO ELSE
//BLACK
	@I
	A = M 			//I = M[I] 
	M = -1           //M[I] = -1
	@I
	M = M + 1       //M[I]++
	@FOR
	0;JMP			//GOTO FOR
(ELSE)  //WHITE
	@I
	A = M 			//I = M[I] 
	M = 0           //M[I] = 0
	@I
	M = M + 1       //M[I]++
	@FOR
	0;JMP			//GOTO FOR

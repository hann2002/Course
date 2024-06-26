// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.

// Put your code here.
	@R2
	M = 0 			//M[R2] = 0
	@I
	M = 0 			//M[I] = 0
(FOR)
	@I
	D = M  			//D = M[I]
	@R1
	D = D - M		//D = M[I] - M[R1]
	@END
	D; JEQ          //M[I] = M[R1] GOTO END
//mult
	@R0
	D = M 			//D = M[R0]
	@R2
	M = M + D 		//M[R2] += M[R0]
	@I
	M = M + 1 		//M[I]++
	@FOR
	0; JEQ			//GOTO FOR
(END)
	@END
	0; JMP 			//GOTO END
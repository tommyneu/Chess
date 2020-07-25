//this function will check all the possible moves that a pawn could make
function checkPawnMoves(xPos, yPos){
	
	//creates an empty array to hold the possible moves that that pawn could make
	let possibleMoves = [];
	
	//checks if the piece it is checking the moves for is a pawn
	if(board.tiles[xPos][yPos].piece == "PAWN"){
		
		//gets the color of teh pawn and the direction it is going on the board
		let dir = board.tiles[xPos][yPos].direction;
		let col = board.tiles[xPos][yPos].pieceColor;
		
		
		//checks to see if the newY location is on the board
		if(yPos+dir >= 0 && yPos+dir <= 7){
			
			//checks to see if the pawn were to move forward that there is no piece there 
			if(board.tiles[xPos][yPos+dir].piece == null){
				
				//pushes that new move object into the array 
				possibleMoves.push({x: xPos, y: yPos, newX: xPos, newY: yPos+dir, piece:"PAWN"});
			}
		}
		
		
		//checks to see if the new Y coordinate is on the board
		if(yPos+(2*dir) >= 0 && yPos+(2*dir) <= 7){
			
			//checks to see if the two spaces infront of the pawn are empty and that the pawn has not moved yet
			if(board.tiles[xPos][yPos+dir].piece == null && board.tiles[xPos][yPos+(dir*2)].piece == null && !board.tiles[xPos][yPos].moved){
				
				//pushes that new move object into the array
				possibleMoves.push({x: xPos, y: yPos, newX: xPos, newY: yPos+(2*dir), piece:"PAWN"});
			}
		}
		
		
		//checks if the new Y and X coordinates are on the board
		if(yPos+dir >= 0 && yPos+dir <= 7 && xPos+1 <= 7){
			
			//check if there is a piece to the right side of the pawn and that it is the opposite color of the pawn
			if(board.tiles[xPos+1][yPos+dir].piece != null && board.tiles[xPos+1][yPos+dir].pieceColor != col){
				
				//pushes that new move object to the array
				possibleMoves.push({x: xPos, y: yPos, newX: xPos+1, newY: yPos+dir, piece:"PAWN"});
			}
		}
		
		
		//it checks if the new X,Y coordinate are on the board
		if(yPos+dir >= 0 && yPos+dir <= 7 && xPos-1 >= 0){
			
			//checks if there is a piece to the left of the pawn and that it is the opposite color of the pawn
			if(board.tiles[xPos-1][yPos+dir].piece != null && board.tiles[xPos-1][yPos+dir].pieceColor != col){
				
				//pushes that new move object into the array
				possibleMoves.push({x: xPos, y: yPos, newX: xPos-1, newY: yPos+dir, piece:"PAWN"});
			}
		}
		
		
		//checks if the new X,Y coordinate are on the board (Passant move)
		if(yPos+dir >= 0 && yPos+dir <= 7 && xPos-1 >= 0){
			
			//it checks if the piece to the left is a pawn and that it is the opposite color
			if(board.tiles[xPos-1][yPos].piece == "PAWN" && board.tiles[xPos-1][yPos].pieceColor != col){
				
				//checks if the last move was that pawn and that it was a double jump move
				if(lastMove.newX == xPos-1 && lastMove.newY == yPos && Math.abs(lastMove.newY - lastMove.oldY) == 2){
					
					//pushes the new move object into the array with some special properties for the passant move function
					possibleMoves.push({x: xPos, y: yPos, newX: xPos-1, newY: yPos+dir, special: "passant", dir: -1, piece:"PAWN"});
				}
			}
		}
		
		
		//checks if the new X,Y are on the board (Passant move)
		if(yPos+dir >= 0 && yPos+dir <= 7 && xPos+1 <= 7){
			
			//checks if the piece to the right of the pawn is the pawn and that its color is the opposite color 
			if(board.tiles[xPos+1][yPos].piece == "PAWN" && board.tiles[xPos+1][yPos].pieceColor != col){
				
				//checks if the last move was that pawn and that he did a double jump
				if(lastMove.newX == xPos+1 && lastMove.newY == yPos && Math.abs(lastMove.newY - lastMove.oldY) == 2){
					
					//pushes that new move object into the array with a some special properties for the passant move function
					possibleMoves.push({x: xPos, y: yPos, newX: xPos+1, newY: yPos+dir, special: "passant", dir: 1, piece:"PAWN"});
				}
			}
		}
		
		//checks if the hand is already checking things(this could case an infinate loop if not there)
		if(!hand.checking){
			
			//checks if all the moves will not case a check on its self or will get out of check
			possibleMoves = checkVaildMoves(possibleMoves);
		}
	}
	
	//returns the possible moves that the pawn can do
	return possibleMoves;
}

//this function will check all the possible moves that that knight can make
function checkKnightMoves(xPos, yPos){
	
	//creates an empty array to hold all the possible moves
	let possibleMoves = [];
	
	//checks if that piece is in fact a knight
	if(board.tiles[xPos][yPos].piece == "KNIGHT"){
		
		//gets the color of the knight
		let col = board.tiles[xPos][yPos].pieceColor;
		
		//creates two loop to check the four directions of travel 
		for(let xVal = 0; xVal < 2; xVal++){
			for(let yVal = 0; yVal < 2; yVal++){
				
				//gets the two directions from those loops either -1 or 1, and -2 or 2
				let dirA = (1*(xVal))+(-1*(!(xVal))); //xVal, yVal will be 0 or 1 so only one side of the equation will be added
				let dirB = (2*(yVal))+(-2*(!(yVal)));
				
				//checks to see if the new X,Y are on the board 
				if(xPos+dirA >= 0 && xPos+dirA <= 7 && yPos+dirB >= 0 && yPos+dirB <= 7){
					
					//checks to see if there is a piece at the new X,Y and if that piece is the opposite color
					if(board.tiles[xPos+dirA][yPos+dirB].pieceColor != col || board.tiles[xPos+dirA][yPos+dirB].piece == null){
						
						//pushes that new move object into the array
						possibleMoves.push({x: xPos, y: yPos, newX: xPos+dirA, newY: yPos+dirB, piece:"KNIGHT"});
					}
				}
				
				//flips the dir variables and checks if those new X,Y coords are on the board
				if(xPos+dirB >= 0 && xPos+dirB <= 7 && yPos+dirA >= 0 && yPos+dirA <= 7){
					
					//checks if that piece is the opposite color or that there is no a piece there
					if(board.tiles[xPos+dirB][yPos+dirA].pieceColor != col || board.tiles[xPos+dirB][yPos+dirA].piece == null){
						
						//pushes that new move object into the array
						possibleMoves.push({x: xPos, y: yPos, newX: xPos+dirB, newY: yPos+dirA, piece:"KNIGHT"});
					}
				}
			}
		}
		
		//checks if the hand is already checking things(this could case an infinate loop if not there)
		if(!hand.checking){
			
			//checks if all the moves will not case a check on its self or will get out of check
			possibleMoves = checkVaildMoves(possibleMoves);
		}
	}
	
	//returns all the possible moves that knight could make
	return possibleMoves;
}

//this function will get all the possible moves that that rook can make
function checkRookMoves(xPos, yPos){
	
	//creates an empty array for possible moves to go into
	let possibleMoves = [];
	
	//checks to see if that piece is in fact a rook
	if(board.tiles[xPos][yPos].piece == "ROOK"){
		
		//makes a loop to get the two directions of travel (goes up and right then it goes down and left)
		for(let dirVal = 0; dirVal < 2; dirVal++){
			for(let hvVal = 0; hvVal < 2; hvVal++){
				
				//figures out those two directions using math
				let dir = (1*(dirVal))+(-1*(!(dirVal))); //dirVal will be 0 or 1 so only one side of the equation will be added
			
				//creates two variables for the two while loops to check the x and y directions 
				let pieceCheck = true;
			
				//creates mutliplers for the while loop to keep track of the number of times the loop has gone
				let mult = 1;
			
				//while it has not run into a piece or gone off the board the loop will keep walking away from the rook until those conditions are met
				while(pieceCheck){
				
					//cretes the new X,Y coordinate using the direction of travel and the multiplyer 
					let newX = xPos + (mult * dir * hvVal);
					let newY = yPos + (mult * dir * (!(hvVal)));
				
					//checks to see if the piece's new X,Y location is on the board
					if(newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7){
					
						//checks to see if it has run into a piece 
						if(board.tiles[newX][newY].piece != null){
						
							//it will stop the loop when it hits a piece
							pieceCheck = false;
						
							//it will check if that piece is the opposite color 
							if(board.tiles[newX][newY].pieceColor != board.tiles[xPos][yPos].pieceColor){
							
								//if its the opposite color it will push the new move object into the array
								possibleMoves.push({x: xPos, y: yPos, newX: newX, newY: newY, piece:"ROOK"});
							}
						
						//if it has not run into a piece yet it will increment the xMult variable and push the new move object 
						}else{
							mult++;
							possibleMoves.push({x: xPos, y: yPos, newX: newX, newY: newY, piece:"ROOK"});
						}
					
					//if the new X not on the board it will stop the loop by making the value false
					}else{
						pieceCheck = false;
					}
				}
			}
		}
		
		//checks if the hand is already checking things(this could case an infinate loop if not there)
		if(!hand.checking){
			
			//checks if all the moves will not case a check on its self or will get out of check
			possibleMoves = checkVaildMoves(possibleMoves);
		}
	}
	
	//returns the possible moves that that rook can make
	return possibleMoves;
}

//this function find all the possible moves that that bishop can make
function checkBishopMoves(xPos, yPos){
	
	//creates an empty array to hold all the possible moves
	let possibleMoves = [];
	
	//checks if the piece is in fact a bishop
	if(board.tiles[xPos][yPos].piece == "BISHOP"){
		
		//creates a loop to get the two directions of travel 
		for(let xVal = 0; xVal < 2; xVal++){
			for(let yVal = 0; yVal < 2; yVal++){
				
				//gets the direction of travel based on the xVal, yVal
				let dirA = (1*(xVal))+(-1*(!(xVal))); //xVal, yVal will be 0 or 1 so only one side of the equation will be added
				let dirB = (1*(yVal))+(-1*(!(yVal)));
				
				//creates variable to control the while loops
				let checkPiece = true;
			
				//creates variable to keep track of the number of time the loop has been done 
				let mult = 1;		

				//while the bishop has not run into a piece or gone off the board it will keep looping throught the spaces
				while(checkPiece){
				
					//gets the newX and Y coords 
					let newX = xPos + (mult*dirA);
					let newY = yPos + (mult*dirB);
				
					//check if the new X,Y is on the board
					if(newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7){
						
						//checks if it was run into a piece 
						if(board.tiles[newX][newY].piece != null){
							
							//it will end the loop when it runs into a piece
							checkPiece = false;
							
							//checks if that piece it ran into is the opposite color and if it is it will push a new move object into the array
							if(board.tiles[newX][newY].pieceColor != board.tiles[xPos][yPos].pieceColor){
								possibleMoves.push({x: xPos, y: yPos, newX: newX, newY: newY, piece:"BISHOP"});
							}
							
						//if it has not run into a piece it will increment the mult and push the new mve object 
						}else{
							mult++;
							possibleMoves.push({x: xPos, y: yPos, newX: newX, newY: newY, piece:"BISHOP"});
						}
						
					//if the new X,Y is off the board it will end the loop
					}else{
						checkPiece = false;
					}
				}
			}
		}
		
		//checks if the hand is already checking things(this could case an infinate loop if not there)
		if(!hand.checking){
			
			//checks if all the moves will not case a check on its self or will get out of check
			possibleMoves = checkVaildMoves(possibleMoves);
		}
	}
	
	//returns the possible moves that that bishop can make
	return possibleMoves;
}

//this function will get all the possible moves that that queen can make
function checkQueenMoves(xPos, yPos){
	
	//creates an empty array that will hold the possible moves 
	let possibleMoves = [];
	
	
	//checks to see if the piece is in fact a queen
	if(board.tiles[xPos][yPos].piece == "QUEEN"){
		
		//starts three loop to get the directions of the loops
		for(let aVal = 0; aVal < 2; aVal++){
			for(let bVal = 0; bVal < 2; bVal++){
				for(let cVal = 0; cVal < 2; cVal++){
					
					//gets the directions of travel based on the aVal bVal
					let dirA = (1*aVal)+(-1*(!(aVal)));  // aVal,bVal will be 1 or 0 so only one side of the equation will be added 
					let dirB = (1*bVal)+(-1*(!(bVal)));
				
					//makes a check fro the while loop
					let pieceCheck = true;
				
					//makes a variable to keep track of the number of times the loop runs
					let mult = 1;
				
					//while the piece has not run into another piece or gone off the board it will store those moves
					while(pieceCheck){
						//gets the newX, newY by using math to figure out the direction of travel
						let newX = xPos + (mult*dirA *bVal     *(!(cVal))) + (mult*dirA*(cVal));  //cVal is used to determine the horizontal/vertical or diagnal travel 
						let newY = yPos + (mult*dirA *(!(bVal))*(!(cVal))) + (mult*dirB*(cVal));  //bVal is used in the HV travel to determine horizontal or vertical
					
						//checks to see if that new X,Y location on the board
						if(newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7){
							
							//it checks if the tile has a piece on it
							if(board.tiles[newX][newY].piece != null){
								
								//if there is a piece it will end the loop
								pieceCheck = false;
								
								//if the piece is the opposite color it will push a new move object to the array
								if(board.tiles[newX][newY].pieceColor != board.tiles[xPos][yPos].pieceColor){
									possibleMoves.push({x: xPos, y: yPos, newX: newX, newY: newY, piece:"QUEEN"});
								}
							
							//if there is no piece it will increment mult and it will push a new move object into the array
							}else{
								mult++;
								possibleMoves.push({x: xPos, y: yPos, newX: newX, newY: newY, piece:"QUEEN"});
							}
							
						//if its not on the board it will end the loop
						}else{
							pieceCheck = false;
						}
					}
				}
			}
		}
		
		//checks if the hand is already checking things(this could case an infinate loop if not there)
		if(!hand.checking){
			
			//checks if all the moves will not case a check on its self or will get out of check
			possibleMoves = checkVaildMoves(possibleMoves);
		}
	}
	
	//returns the possible moves that that bishop can make
	return possibleMoves;
}

//this function checks for all the moves that that king can do
function checkKingMoves(xPos, yPos){
	
	//creates an empty array that will hold the possible moves 
	let possibleMoves = [];
	
	//it checks if that piece is in fact a king
	if(board.tiles[xPos][yPos].piece == "KING"){
		
		//gets the color of that piece
		let col = board.tiles[xPos][yPos].pieceColor;
		
		//does two for loops to start in the top left corner and work its way down to the bottom right (the 8 adjacent tiles centered around the king)
		for(let xVal = -1; xVal < 2; xVal++){
			for(let yVal = -1; yVal < 2; yVal++){
				
				//it checks if the new X,Y location is on the board
				if(xPos+xVal >= 0 && xPos+xVal <= 7 && yPos+yVal >= 0 && yPos+yVal <= 7){
					
					//it then checks if that tile has no piece on it or if that piece is the opposite color
					if(board.tiles[xPos+xVal][yPos+yVal].pieceColor != col || board.tiles[xPos+xVal][yPos+yVal].piece == null){
						
						//it then pushes that new move object into the array
						possibleMoves.push({x: xPos, y: yPos, newX: xPos+xVal, newY: yPos+yVal, piece:"KING"});
					}
				}
			}
		}
		
		//this checks for castle moves (you can not castle if you are in check)
		if(!hand.kingCheck){
			//it then checks if the king has not moved
			if(board.tiles[xPos][yPos].moved == false){
				
				//if it hasnt moved then it checks if the rook to the right of the king has moved
				if(board.tiles[xPos+3][yPos].moved == false){
					
					//if they both havent moved it then checks if there are no pieces inbetween the rook and the king
					if(board.tiles[xPos+1][yPos].piece == null && board.tiles[xPos+2][yPos].piece == null){
						
						//it will the push a special move object with the information for the castle move function
						possibleMoves.push({x: xPos, y: yPos, newX: xPos+2, newY: yPos, special: "castle", rookOldX: xPos+3, rookNewX: xPos+1, piece:"KING"});
					}
				}
				
				//if it hasnt moved then it checks if the rook to the left of the king has moved
				if(board.tiles[xPos-4][yPos].moved == false){
					
					//if they both havent moved it then checks if there are no pieces inbetween the rook and the king
					if(board.tiles[xPos-1][yPos].piece == null && board.tiles[xPos-2][yPos].piece == null && board.tiles[xPos-3][yPos].piece == null){
						
						//it will the push a special move object with the information for the castle move function
						possibleMoves.push({x: xPos, y: yPos, newX: xPos-2, newY: yPos, special: "castle", rookOldX: xPos-4, rookNewX: xPos-1, piece:"KING"});
					}
				}
			}
		}
		
		//checks if the hand is already checking things(this could case an infinate loop if not there)
		if(!hand.checking){
			
			//checks if all the moves will not case a check on its self or will get out of check
			possibleMoves = checkVaildMoves(possibleMoves);
		}
	}
	
	//returns the possible moves that that bishop can make
	return possibleMoves;
}
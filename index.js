//Global Variables so all the code can run it but it is not given any values outside the main function
let cdx, ctx;
let width, height;
let board, hand;
let turn;
let lastMove;
let checkMate, stalemate;

//Runs when the page fully loads
function main(){
	
	//creates a variable for the canvas and gets it ready to be drawable
	cdx = document.getElementById("screen");
	ctx = cdx.getContext("2d");
	
	//when the window is resized it will call the function resizeWindow function
	window.addEventListener('resize', resizeWindow);
	
	//when the canvas is clicked it will call the screenClicked function
	cdx.addEventListener('click', screenClicked);
	
	//creates variables for the width and height of the window
	width = window.innerWidth;
	height = window.innerHeight;
	
	//changes the size of the canvas to the full size off the window
	cdx.width = width;
	cdx.height = height;
	
	//assigned new objects to the global variables
	board = new Board();
	board.resizeBoard();
	board.fillTiles();
	
	//sets the hand to the Hand object
	hand = new Hand();
	
	//turn is set to default to true (white goes first)
	turn = true;
	
	//sets checkmate and stalemate to false to start
	checkMate = false;
	stalemate = false;
	
	// calls the draw function
	draw();
}

//this function will control what is displayed and in what order it will be drawn
function draw(){
	
	//if the game is in checkmate it will change the color to the opposite color of the turn
	if(checkMate){
		ctx.fillStyle = board.tiles[0][0].pieceColors[1-(turn)]; //gets colors from the tiles (they store black and white)
	
	//if the game is in a stalemate position it will change the background color to a nuteral grey
	}else if(stalemate){
		ctx.fillStyle = board.tiles[0][0].pieceColors[2];
		
	}else{
		//checks whos turn it is and will color the back ground accordingly
		if(turn){
			ctx.fillStyle = "mediumturquoise";
		}else{
			ctx.fillStyle = "teal";
		}
	}
	
	ctx.fillRect(0, 0, width, height);  //fills a rectangle from 0,0 with a width and height of the whole screen
	
	board.draw(); //draws the state of the board
	
	hand.draw(); //draws state of the hand
}


//when the window is resized this function is called and the sizes of the board and pieces will change accordingly
function resizeWindow(){
	
	//resets default sizes
	width = window.innerWidth;
	height = window.innerHeight;
	cdx.width = width;
	cdx.height = height;
	
	//calls the resizeBoard method
	board.resizeBoard();
	
	//will draw this new board
	draw();
}


//this function will be called when the canvas is clicked
function screenClicked(event){
	//gets the mouse click's x and y coordinates from the event
	let mouseX = event.x;
	let mouseY = event.y;
	
	//it will check if the mouse point is on the board
	if(mouseX > board.Hoffset && mouseX < board.Hoffset+board.size){
		if(mouseY > board.Voffset && mouseY < board.Voffset+board.size){
			
			//it will then do math to figure out which tile the mouse is on
			let tileX = Math.floor((mouseX-board.Hoffset)/(board.size/8));
			let tileY = Math.floor((mouseY-board.Voffset)/(board.size/8));
			
			//makes a variable to check if a move has been made
			let moveCheck = false;
			
			//loops through the possible moves stored in the hand object and checks if the mouse clicked one
			for(let i = 0; i < hand.possibleMoves.length; i++){
				if(hand.possibleMoves[i].newX == tileX && hand.possibleMoves[i].newY == tileY){
					
					//passant and castle have special move functions
					if(hand.possibleMoves[i].special == "passant"){
						passant(hand.possibleMoves[i].x, hand.possibleMoves[i].y, hand.possibleMoves[i].newX, hand.possibleMoves[i].newY, hand.possibleMoves[i].dir);
					}else if(hand.possibleMoves[i].special == "castle"){
						castle(hand.possibleMoves[i].x, hand.possibleMoves[i].y, hand.possibleMoves[i].newX, hand.possibleMoves[i].rookOldX, hand.possibleMoves[i].rookNewX);
					}else{
						//all other moves use the regular move function
						movePiece(hand.possibleMoves[i].x, hand.possibleMoves[i].y, hand.possibleMoves[i].newX, hand.possibleMoves[i].newY);
					}
					
					//if a move has been made it will switch the movecheck to true
					moveCheck = true;
					
					//it then calls the nextTurn function
					nextTurn();
				}
			}
			
			//if there hasnt been a move made it will reset the hand object and put the new location inside
			if(!moveCheck){
				//the resetHand method is called
				hand.resetHand();
			
				//it checks if the tile has a piece on it and it is the right color
				if(board.tiles[tileX][tileY].piece != null && board.tiles[tileX][tileY].pieceColor == turn){
					
					//stores the x,y coords, switches highlight to true, and calls the checkPossibleMoves function
					hand.xPos = tileX;
					hand.yPos = tileY;
					hand.highlight = true;
					hand.checkPossibleMoves();
				}
			
				//it then draws the new state of the hand object;
				draw();
			}
		}
	}
}


//this function is called to start the next turn
function nextTurn(){
	
	//switchs turn 
	turn = !turn;
	
	//it will reset the hand
	hand.resetHand();
	
	//it will call the checkCheck function with the new turn and input that to the method kingInCheck
	hand.kingInCheck(checkCheck(turn)); //checks if the king is in check or not
	
	//checks if there is insufficent material to get checkmate
	insuffMat();
	
	//draws the new state of the background and hand
	draw();
}

//this function will take the old x,y of a piece and move it to the new x,y
function movePiece(xOld, yOld, xNew, yNew){
	
	//if the piece is a pawn it has the ability to promote if the piece is at the end of the board
	if(board.tiles[xOld][yOld].piece == "PAWN"){ //checks if it is a pawn
		
		//sets a variable to check if the promotion is possible to false;
		let promotionCheck = false;
		
		//if the direction of the pawn is going down and it is at the end of the board it will change the promotionCheck to true
		if(board.tiles[xOld][yOld].direction == 1 && yNew == 7){
			promotionCheck = true;
			
		//if the direction is going up the board and its at the top of the board it will change promotionCheck to true	
		}else if(board.tiles[xOld][yOld].direction == -1 && yNew == 0){
			promotionCheck = true;
		}
		
		//if the piece can promote it will ask which piece the player wants and switches it the to that piece
		if(promotionCheck){
			
			//prompts the user for the piece they want and trims whitespace and caps it
			let newPiece = prompt("Please Type Which Piece You'd Like To Promote To:", "Queen, Rook, Knight, Bishop").trim().toUpperCase();
			
			//sets up a list of all the avalible pieces the pawn can switch to
			const possiblePieces = ["QUEEN", "ROOK", "KNIGHT", "BISHOP"];
			
			//if the player puts in a piece that is not write or if it is spelled wrong it will ask again
			while(possiblePieces.indexOf(newPiece) == -1){
				newPiece = prompt("Please Type Which Piece You'd Like To Promote To:", "Queen, Rook, Knight, Bishop").trim().toUpperCase();
			}
			
			//sets the old x,y location to the new piece identity 
			board.tiles[xOld][yOld].piece = newPiece;
		}
	}
	
	//on the board in the new x,y tile it will give all the appropriate values for that piece 
	board.tiles[xNew][yNew].piece = board.tiles[xOld][yOld].piece;
	board.tiles[xNew][yNew].pieceColor = board.tiles[xOld][yOld].pieceColor;
	board.tiles[xNew][yNew].direction = board.tiles[xOld][yOld].direction;
	
	//it also switches moved to true every time since that piece just moved
	board.tiles[xNew][yNew].moved = true;
	
	//it will then set the old piece to null (the other values are not needed)
	board.tiles[xOld][yOld].piece = null;
	
	//it then stores the last move that was made for the passant move
	lastMove = {oldX: xOld, oldY: yOld, newX: xNew, newY: yNew, piece: board.tiles[xNew][yNew].piece, firstMove: !board.tiles[xOld][yOld].moved};
}


//passant moves are moves inwhich a pawn has moved double the distance but if it had moved the regular distance the other pawn would have been able to take it
//this function will move the pawns based on the passant rule
function passant(xOld, yOld, xNew, yNew, dir){
	
	//set the new x,y tile to the pieces values
	board.tiles[xNew][yNew].piece = board.tiles[xOld][yOld].piece;
	board.tiles[xNew][yNew].pieceColor = board.tiles[xOld][yOld].pieceColor;
	board.tiles[xNew][yNew].direction = board.tiles[xOld][yOld].direction;
	
	//sets moved to true
	board.tiles[xNew][yNew].moved = true;
	
	//set the old location's piece is null
	board.tiles[xOld][yOld].piece = null;
	
	//sets the piece that was takens piece to null
	board.tiles[xOld+dir][yOld].piece = null;
	
	//sets last move to this move
	lastMove = {oldX: xOld, oldY: yOld, newX: xNew, newY: yNew, piece: board.tiles[xNew][yNew].piece, firstMove: !board.tiles[xOld][yOld].moved};
}

//castle is a move where the king moved over two spaces and the rook moved to the inside of the king
function castle(xOld, yOld, xNew, rookOldX, rookNewX){
	
	//sets the new king location to the kings values
	board.tiles[xNew][yOld].piece = board.tiles[xOld][yOld].piece;
	board.tiles[xNew][yOld].pieceColor = board.tiles[xOld][yOld].pieceColor;
	board.tiles[xNew][yOld].direction = board.tiles[xOld][yOld].direction;
	board.tiles[xNew][yOld].moved = true;
	
	//sets the new rook location to the rooks values (rook only moves on the x axis so it can borrow the kings y)
	board.tiles[rookNewX][yOld].piece = board.tiles[rookOldX][yOld].piece;
	board.tiles[rookNewX][yOld].pieceColor = board.tiles[rookOldX][yOld].pieceColor;
	board.tiles[rookNewX][yOld].direction = board.tiles[rookOldX][yOld].direction;
	board.tiles[rookNewX][yOld].moved = true;
	
	//sets their old locations to null
	board.tiles[xOld][yOld].piece = null;
	board.tiles[rookOldX][yOld].piece = null;
	
	//stores the move
	lastMove = {oldX: xOld, oldY: yOld, newX: xNew, newY: yOld, piece: board.tiles[xNew][yOld].piece, firstMove: !board.tiles[xOld][yOld].moved};
}

//this function checks if the king is in check and if the king is in check mate
function checkCheck(){
	//sets the defaults for the inCheck and the inCheckMate
	let inCheck = false;
	let inCheckMate = true;
	let inStalemate = true;
	
	//creates two arrays for the two colors of the moves (it needs to look at the opposite's color for check and its own color for checkmate)
	let possibleMovesCheck = [];
	let possibleMovesMate = [];
	
	//sets a default value for the king's x,y location
	let kingX = -1; 
	let kingY = -1;
	
	//it gets the king's color from the turn
	let kingColor = turn;
	
	//it loops through the whole board to get the moves all the pieces as well as the kings location
	for(let xVal = 0; xVal < 8; xVal++){
		for(let yVal = 0; yVal < 8; yVal++){
			
			//if the piece is the opposite color and there is a piece it will get theit moves for possibleMovesCheck
			if(board.tiles[xVal][yVal].pieceColor != kingColor && board.tiles[xVal][yVal].piece != null){
				possibleMovesCheck = possibleMovesCheck.concat(checkPawnMoves(xVal, yVal));
				possibleMovesCheck = possibleMovesCheck.concat(checkKnightMoves(xVal, yVal));
				possibleMovesCheck = possibleMovesCheck.concat(checkRookMoves(xVal, yVal));
				possibleMovesCheck = possibleMovesCheck.concat(checkBishopMoves(xVal, yVal));
				possibleMovesCheck = possibleMovesCheck.concat(checkQueenMoves(xVal, yVal));
				possibleMovesCheck = possibleMovesCheck.concat(checkKingMoves(xVal, yVal));
				
			//if the piece is the same color and there is a piece there it will get their moves for possibleMovesMate
			}else if(board.tiles[xVal][yVal].pieceColor == kingColor && board.tiles[xVal][yVal].piece != null){
				possibleMovesMate = possibleMovesMate.concat(checkPawnMoves(xVal, yVal));
				possibleMovesMate = possibleMovesMate.concat(checkKnightMoves(xVal, yVal));
				possibleMovesMate = possibleMovesMate.concat(checkRookMoves(xVal, yVal));
				possibleMovesMate = possibleMovesMate.concat(checkBishopMoves(xVal, yVal));
				possibleMovesMate = possibleMovesMate.concat(checkQueenMoves(xVal, yVal));
				possibleMovesMate = possibleMovesMate.concat(checkKingMoves(xVal, yVal));
			}
			
			//if the color of the piece matches the kingColor and it is a KING it will store its x,y
			if(board.tiles[xVal][yVal].pieceColor == kingColor && board.tiles[xVal][yVal].piece == "KING"){
				kingX = xVal;
				kingY = yVal;
			}
		}
	}
	
	//it will then loop throught the possibleMovesCheck and see if any of the new locations lands on the king
	for(let moveVal = 0; moveVal < possibleMovesCheck.length; moveVal++){
		if(possibleMovesCheck[moveVal].newX == kingX && possibleMovesCheck[moveVal].newY == kingY){
			
			//if any of the moves does land on the king it will set the inCheck value to true since it is in check
			inCheck = true;
		}
	}
	
	//if it is in check it will check if its in checkMate
	if(inCheck){
		
		//if its in check it cant be in stalemate
		inStalemate = false;
		
		//the piece's move functions already check for valid moves to get out of check so it can just check the length of the array to see if their are any valid moves to get out of check
		if(possibleMovesMate.length > 0){
			inCheckMate = false;
		}
	}else{
		//it can not be in checkmate if its not in check, that would be a stalemate 
		inCheckMate = false;
		
		//if they are not in check but there are not valid moves then its a stalemate
		if(possibleMovesMate.length > 0){
			inStalemate = false;
		}
	}
	
	//returns if the color is in check and checkMate
	return {check: inCheck, checkMate: inCheckMate, stalemate: inStalemate, x: kingX, y: kingY};
}

//this fucntion when called will check if there is insufficent material to force check on the other player 
function insuffMat(){
	
	//creates all variables needed to increment
	let pawn_queen_rook = [0];
	let bishopL = [0];	//bishops on the same tile matter for one possiblility
	let bishopD = [0];
	let bishop = [0, 0]; // regular bishops
	let knight = [0, 0]; //knights and bishops are considered minor pieces
	
	//loops through all the pieces on the board and depending on their identity it will increment the appropriate variable
	for(let xVal = 0; xVal < 8; xVal++){
		for(let yVal = 0; yVal < 8; yVal++){
			
			//creates a variable that gets the piece(makes the code simpler)
			let piece = board.tiles[xVal][yVal].piece;
			
			//the pawn rook and queen are all lumped together 
			if(piece == "PAWN" || piece == "QUEEN" || piece == "ROOK"){ 
				pawn_queen_rook++;
				
			}else if(piece == "BISHOP"){
				//certain color bishop
				bishop[0+(board.tiles[xVal][yVal].pieceColor)]++; //(0+) is needed becuase javascript is weird
				
				//bishops on a specific tile color matter as well
				if(board.tiles[xVal][yVal].backgroundColor){
					bishopD++;
				}else{
					bishopL++;
				}
				
			}else if(piece == "KNIGHT"){
				knight[0+(board.tiles[xVal][yVal].pieceColor)]++;
			}
		}
	}
	
	//if you have a pawn, queen, or rook you can still check the king
	if(pawn_queen_rook == 0){
		if((bishop[0]+bishop[1]+knight[0]+knight[1]) == 0){  //if you have two kings and no other pieces is a draw
			stalemate = true;
			
		}else if((bishop[0]+bishop[1]+knight[0]+knight[1]) == 1){  //if there is only one minor piece its a draw
			stalemate = true;
			
		}else if(knight[0]==2 && (knight[1]+bishop[0]+bishop[1]) == 0){ //if there is two knights on one side or the other its a draw
			stalemate = true;
			
		}else if(knight[1]==2 && (knight[0]+bishop[0]+bishop[1]) == 0){
			stalemate = true;
			
		}else if(knight[0]+bishop[0] == 1 && knight[1]+bishop[1] == 1 && bishopD != 2 && bishopL != 2){  //if there is one minor piece on either side 
			stalemate = true;                                                                            //and those minor pieces are not bishops on the same color 
		}	                                                                                             // its a draw
	}
}


//this function checks to see if after the move is done the playerr is still in check
function checkStillInCheck(move){
	
	//sets inCheck to default value of true
	let inCheck = true;
	
	//creates an empty array to hold the possible moves
	let possibleMoves = [];
	
	//sets the default value fo the kings x,y to -1
	let kingX = -1;
	let kingY = -1;
	
	//it then stores all the relavant data for the two pieces that will move
	const tempPieceA = board.tiles[move.newX][move.newY].piece;
	const tempColorA = board.tiles[move.newX][move.newY].pieceColor;
	const tempDirectionA = board.tiles[move.newX][move.newY].direction;
	const tempMovedA = board.tiles[move.newX][move.newY].moved;
	
	const tempPieceB = board.tiles[move.x][move.y].piece;
	const tempColorB = board.tiles[move.x][move.y].pieceColor;
	const tempDirectionB = board.tiles[move.x][move.y].direction;
	const tempMovedB = board.tiles[move.x][move.y].moved;
	
	//passant and castle moves need to have a third variable set 
	let tempPieceC;
	let tempColorC;
	let tempDirectionC;
	let tempMovedC;
	
	//it checks if the moves special property is passant
	if(move.special == "passant"){
		//stores and preformes the speical part of the move
		tempPieceC = board.tiles[move.x+move.dir][move.y].piece;
		tempColorC = board.tiles[move.x+move.dir][move.y].pieceColor;
		tempDirectionC = board.tiles[move.x+move.dir][move.y].direction;
		tempMovedC = board.tiles[move.x+move.dir][move.y].moved;
		
		board.tiles[move.x+move.dir][move.y].piece = null;
		
	//checks to see if the move's special property is castle
	}else if(move.special == "castle"){
		//stores and preforms the special part of the castle move
		tempPieceC = board.tiles[move.rookOldX][move.y].piece;
		tempColorC = board.tiles[move.rookOldX][move.y].pieceColor;
		tempDirectionC = board.tiles[move.rookOldX][move.y].direction;
		tempMovedC = board.tiles[move.rookOldX][move.y].moved;
		
		board.tiles[move.rookNewX][move.y].piece = board.tiles[move.rookOldX][move.y].piece;
		board.tiles[move.rookNewX][move.y].pieceColor = board.tiles[move.rookOldX][move.y].pieceColor;
		board.tiles[move.rookNewX][move.y].direction = board.tiles[move.rookOldX][move.y].direction;
		board.tiles[move.rookNewX][move.y].moved = true;
		
		board.tiles[move.rookOldX][move.y].piece = null;
		
	}
	
	//preforms the regular move
	board.tiles[move.newX][move.newY].piece = board.tiles[move.x][move.y].piece;
	board.tiles[move.newX][move.newY].pieceColor = board.tiles[move.x][move.y].pieceColor;
	board.tiles[move.newX][move.newY].direction = board.tiles[move.x][move.y].direction;
	board.tiles[move.newX][move.newY].moved = board.tiles[move.x][move.y].moved;
	
	board.tiles[move.x][move.y].piece = null;
	
	//sets hand.checking to true to stop the moves from calling this function again and creating an infinate loop
	hand.checking = true;
	
	//loops through all the tiles and gets all the moves from all the moves from the opposite color pieces
	for(let xVal = 0; xVal < 8; xVal++){
		for(let yVal = 0; yVal < 8; yVal++){
			
			//checks if the pieces are the oppoiste colors and they are there
			if(board.tiles[xVal][yVal].pieceColor != board.tiles[move.newX][move.newY].pieceColor && board.tiles[xVal][yVal].piece != null){
				possibleMoves = possibleMoves.concat(checkPawnMoves(xVal, yVal));
				possibleMoves = possibleMoves.concat(checkKnightMoves(xVal, yVal));
				possibleMoves = possibleMoves.concat(checkRookMoves(xVal, yVal));
				possibleMoves = possibleMoves.concat(checkBishopMoves(xVal, yVal));
				possibleMoves = possibleMoves.concat(checkQueenMoves(xVal, yVal));
				possibleMoves = possibleMoves.concat(checkKingMoves(xVal, yVal));
			}
			
			//it gets the king's x,y as well
			if(board.tiles[xVal][yVal].pieceColor == board.tiles[move.newX][move.newY].pieceColor && board.tiles[xVal][yVal].piece == "KING"){
				kingX = xVal;
				kingY = yVal;
			}
		}
	}
	//sets hand.checking to false to have the pieces check themselves again when they need
	hand.checking = false;
	
	//loops through all the possibleMoves and checks if they end up on the king's x,y
	for(let moveVal = 0; moveVal < possibleMoves.length; moveVal++){
		if(possibleMoves[moveVal].newX == kingX && possibleMoves[moveVal].newY == kingY){
			inCheck = false;
		}
	}
	
	//resets the pieces to their original locations
	board.tiles[move.newX][move.newY].piece = tempPieceA;
	board.tiles[move.newX][move.newY].pieceColor = tempColorA;
	board.tiles[move.newX][move.newY].direction = tempDirectionA;
	board.tiles[move.newX][move.newY].moved = tempMovedA;
	
	board.tiles[move.x][move.y].piece = tempPieceB;
	board.tiles[move.x][move.y].pieceColor = tempColorB;
	board.tiles[move.x][move.y].direction = tempDirectionB;
	board.tiles[move.x][move.y].moved = tempMovedB;
	
	//resets the special piece for passant
	if(move.special == "passant"){
		board.tiles[move.x+move.dir][move.y].piece = tempPieceC;
		board.tiles[move.x+move.dir][move.y].pieceColor = tempColorC;
		board.tiles[move.x+move.dir][move.y].direction = tempDirectionC;
		board.tiles[move.x+move.dir][move.y].moved = tempMovedC;
	}
	
	//resets the special piece for castle
	if(move.special == "castle"){
		board.tiles[move.rookOldX][move.y].piece = tempPieceC;
		board.tiles[move.rookOldX][move.y].pieceColor = tempColorC;
		board.tiles[move.rookOldX][move.y].direction = tempDirectionC;
		board.tiles[move.rookOldX][move.y].moved = tempMovedC;
		
		board.tiles[move.rookNewX][move.y].piece = null;	
	}
	
	//returns if they are still in check after the move
	return inCheck;
} 

//checks if the moves are valid moves and returns the valid moves
function checkVaildMoves(moves){
	
	//creates an empty array to hold the valid moves
	let validMoves = [];

	//loops through all the moves and checks if the move will cuase a check or gets out of check
	for(let moveVal = 0; moveVal < moves.length; moveVal++){
		if(checkStillInCheck(moves[moveVal])){
			//pushes them into the array if they are valid
			validMoves.push(moves[moveVal]);
		}
	}
	
	//returns the valid moves
	return validMoves;
}
//this function creates a custom hand object to represent/show which piece you have your hand on and what moves that piece you can make 
function Hand(){
	
	//sets a defualt x,y location off the board
	this.xPos = -1;
	this.yPos = -1;
	
	//highlight shows if a tile has been selected
	this.highlight = false;
	
	//it sets the size of the highlighted square to the same size as the tiles
	this.size = board.size/8;
	
	//this is an array full the different colors of highlights
	this.colors = ["blue", "yellow", "red"];
	
	//this stores the moves that the selected piece can make 
	this.possibleMoves = [];
	
	//this will store if the king is in check and where the king is
	this.kingCheck = false; 
	this.kingPos = {x: -1, y:-1};
	
	//this stores if the program is in the middle of checking pieces moves 
	this.checking = false;
	
	//this method is called when the hand needs to be reset at the end of the turn
	this.resetHand = function(){
		
		//resets values to defaults (king variables are reset every turn using their own method)
		this.xPos = -1;
		this.yPos = -1;
		this.highlight = false;
		this.possibleMoves = [];	
	}
	
	//this method is called when storing the new values of the king variable 
	this.kingInCheck = function(inCheck){
		this.kingCheck = inCheck.check; 
		this.kingPos.x = inCheck.x;
		this.kingPos.y = inCheck.y;
		
		//checkMate will be set to true if the board is in a checkMate position
		checkMate = inCheck.checkMate;
		stalemate = inCheck.stalemate;
	}
	
	//this method is called when you are wanting to get the possible moves from a highlighted tile
	this.checkPossibleMoves = function(){
		//checks if there is a tile highlighted
		if(this.highlight){
			
			//checks all possible move types for that specific tile
			this.possibleMoves = this.possibleMoves.concat(checkPawnMoves(this.xPos, this.yPos));
			this.possibleMoves = this.possibleMoves.concat(checkKnightMoves(this.xPos, this.yPos));
			this.possibleMoves = this.possibleMoves.concat(checkRookMoves(this.xPos, this.yPos));
			this.possibleMoves = this.possibleMoves.concat(checkBishopMoves(this.xPos, this.yPos));
			this.possibleMoves = this.possibleMoves.concat(checkQueenMoves(this.xPos, this.yPos));
			this.possibleMoves = this.possibleMoves.concat(checkKingMoves(this.xPos, this.yPos));
		}
	}
	
	//this method draws the highlighted tile, the highlighted tile's possible moves, and the checked king
	this.draw = function(){
		
		//resets the size of the highlights incase the board changed sizes
		this.size = board.size/8;
		
		//sets the global alpha to very see through
		ctx.globalAlpha = 0.3;
		
		//if highlighted then it will draw the highlighted tile and the moves
		if(this.highlight){
			//sets the color to yellow and highlights the tile
			ctx.fillStyle = this.colors[0];
			ctx.fillRect(board.Hoffset + (this.size*this.xPos), board.Voffset+ (this.size*this.yPos), this.size, this.size);
			
			//loops throught the moved and colors them blue
			for(let i = 0; i < this.possibleMoves.length; i++){
				ctx.fillStyle = this.colors[1];
				ctx.fillRect(board.Hoffset + (this.size*this.possibleMoves[i].newX), board.Voffset+ (this.size*this.possibleMoves[i].newY), this.size, this.size);
			}
		}
		
		//if the king is in check it will highlight it red
		if(this.kingCheck){
			ctx.fillStyle = this.colors[2];
			ctx.fillRect(board.Hoffset + (this.size*this.kingPos.x), board.Voffset+ (this.size*this.kingPos.y), this.size, this.size);
		}
		
		//reset the global alpha to normal
		ctx.globalAlpha = 1;
	}
}
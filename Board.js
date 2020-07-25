//this function creates a custom object for the board
function Board(){
	
	//creates some default values for the horizonal and Vertical offsets
	this.Hoffset = 0;
	this.Voffset = 0;
	
	//has a default size value
	this.size = 0;
	
	//creates an empty array to store the tiles
	this.tiles = [];
	
	//creates an array that will store all the colors for the board itself
	this.colors = ["burlywood", "saddlebrown", "#432109"];
	
	//this method when called will fill the board with all the pieces for chess
	this.fillTiles = function(){
		
		//clears the array incase anything was in there
		this.tiles = [];
		
		//loops through xValues 
		for(let xVal = 0; xVal < 8; xVal++){
			
			//it then makes the array 2d
			this.tiles[xVal] = [];
			
			//it then loops all the yValues
			for(let yVal = 0; yVal < 8; yVal++){
				
				//it will set the colorVal to defualt true
				let colorVal = true;
				
				//if the xVal is divisable by two
				if(!(xVal%2)){
					//and the yVal is divisable by two 
					if(!(yVal%2)){
						//it will not color in that tile
						colorVal = false;
					}
				}else{
					//if the xVal and yVal are not divisable by 2 it will not color in that tile either
					if(yVal%2){
						colorVal = false;
					}
				}
			
				//it then sets that tile as a new tile object using the xVal, yVal, and the colorVal
				this.tiles[xVal][yVal] = new Tile(xVal, yVal, colorVal);
				
				//it the yVal is the last row or the first row it will fill with the bigger pieces
				if(yVal == 0 || yVal == 7){
					//if it the 7th row it will set the color to true (false by default)
					this.tiles[xVal][yVal].pieceColor = (yVal == 7);
					
					//if it is the 7th row it will set the direction to -1(1 by defualt)
					if(yVal == 7){
						this.tiles[xVal][yVal].direction = -1;
					}
					
					//it then checks the xVal and sets the correct piece there
					if(xVal == 0 || xVal == 7){
						this.tiles[xVal][yVal].piece = "ROOK";
					}else if(xVal == 1 || xVal == 6){
						this.tiles[xVal][yVal].piece = "KNIGHT";
					}else if(xVal == 2 || xVal == 5){
						this.tiles[xVal][yVal].piece = "BISHOP";
					}else if(xVal == 3){
						this.tiles[xVal][yVal].piece = "QUEEN";
					}else if(xVal == 4){
						this.tiles[xVal][yVal].piece = "KING";
					}
					
				//if it is the second or second to last row it will fill with pawns
				}else if(yVal == 1 || yVal == 6){
					//sets the color to true if the 6th row (false by default)
					this.tiles[xVal][yVal].pieceColor = (yVal == 6);
					
					//sets the piece to a pawn
					this.tiles[xVal][yVal].piece = "PAWN";
					
					//if the 6th row it will set the direction to -1 (1 by default)
					if(yVal == 6){
						this.tiles[xVal][yVal].direction = -1;
					}
				}
			}
		}
	}
	
	//this method resizes the board when called
	this.resizeBoard = function(){
		
		//if the width is larger than the height
		if(width > height){
			
			//it will make the size the height
			this.size = height;
			
			//and it will set the horizontal offset to the middle of the width minus half the size
			this.Hoffset = (width/2) - (this.size/2);
			
		//if the height is greater than the width
		}else if(height > width){
			//it will set the size to the width
			this.size = width;
			
			//and it set the vertical offset to half the height minus half the size
			this.Voffset = (height/2) - (this.size/2);
		}else{
			
			//if its a square window it will just set the size to the width
			this.size = width;
		}
	}
	
	//the draw method will draw the board and its contense
	this.draw = function(){
		
		//it will create one large rectangle to serve as the over all background
		ctx.fillStyle = this.colors[0];
		ctx.fillRect(this.Hoffset+(this.size/200), this.Voffset+(this.size/200), this.size, this.size);
		
		
		//the tiles will draw the darker square and the pieces
		for(let xVal = 0; xVal < 8; xVal++){
			for(let yVal = 0; yVal < 8; yVal++){
				this.tiles[xVal][yVal].draw();
			}
		}
		
		//it will then draw a border around the whole board
		ctx.lineWidth = this.size/100;
		ctx.strokeStyle = this.colors[2];
		ctx.strokeRect(this.Hoffset, this.Voffset, this.size, this.size);
	}
}
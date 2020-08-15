//this function creates a custom object for the tiles of the board
class Tile {
	constructor(xIn, yIn, cIn) {
		//it gets the x and y values of the tile's location
		this.xPos = xIn;
		this.yPos = yIn;

		//it gets the size of the tile based on the size of the board
		this.size = board.size / 8;

		//it gets the color of the background based on the input
		this.backgroundColor = cIn;

		//it defines the colors for the pieces that are on the tiles
		this.pieceColors = ["black", "white", "grey"];

		//it creates default values for all the important information about the pieces
		this.piece = null;
		this.pieceColor = true;
		this.moved = false;
		this.direction = 1;

		//this method will draw the tile and the piece on it
		this.draw = function () {
			//it redefines the size incase the board has changed sizes
			this.size = board.size / 8;

			//it will use math to find the center x,y coords of the tile
			let xCenter = board.Hoffset + this.size * this.xPos + this.size / 2;
			let yCenter = board.Voffset + this.size * this.yPos + this.size / 2;

			//if this.backgroundColor is true it will get the boards color background and draw a square tile
			if (this.backgroundColor) {
				ctx.fillStyle = board.colors[1];
				ctx.fillRect(board.Hoffset + this.size * this.xPos, board.Voffset + this.size * this.yPos, this.size, this.size);
			}

			//it will then check to see what the piece is and call the appropriate function for that piece
			if (this.piece == "PAWN") {
				//it uses the xCenter and yCenter as well as the colors and size
				drawPawn(xCenter, yCenter, this.size, this.pieceColors[1 - this.pieceColor], this.pieceColors[0 + this.pieceColor]); //the stroke is the opposite of the pieceColor and the fill is the same

				//it needs the "0+" to make the value a number(javascript is weird like that)
			} else if (this.piece == "ROOK") {
				drawRook(xCenter, yCenter, this.size, this.pieceColors[1 - this.pieceColor], this.pieceColors[0 + this.pieceColor]);
			} else if (this.piece == "KNIGHT") {
				drawKnight(xCenter, yCenter, this.size, this.pieceColors[1 - this.pieceColor], this.pieceColors[0 + this.pieceColor]);
			} else if (this.piece == "BISHOP") {
				drawBishop(xCenter, yCenter, this.size, this.pieceColors[1 - this.pieceColor], this.pieceColors[0 + this.pieceColor]);
			} else if (this.piece == "KING") {
				drawKing(xCenter, yCenter, this.size, this.pieceColors[1 - this.pieceColor], this.pieceColors[0 + this.pieceColor]);
			} else if (this.piece == "QUEEN") {
				drawQueen(xCenter, yCenter, this.size, this.pieceColors[1 - this.pieceColor], this.pieceColors[0 + this.pieceColor]);
			}
		};
	}
}

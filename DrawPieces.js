//this function draws a pawn based upon a x,y center point and the size and will color it according to stroke and fill colors
function drawPawn(xCenter, yCenter, size, strokeColor, fillColor) {
	//resizes the stroke line's width based on the size of the board
	ctx.lineWidth = board.size / 400;

	//sets the colors based upon the inputs
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	//draws the bottom largest semi circle
	ctx.beginPath();
	ctx.arc(xCenter, yCenter + size / 2.3, size / 4, 1 * Math.PI, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	//draws the bottom line across the bottom of the semi circle
	ctx.beginPath();
	ctx.moveTo(xCenter - size / 4, yCenter + size / 2.3);
	ctx.lineTo(xCenter + size / 4, yCenter + size / 2.3);
	ctx.stroke();

	//draws the body of the snowman shape
	ctx.beginPath();
	ctx.arc(xCenter, yCenter + size / 8, size / 6, 0.75 * Math.PI, 2.25 * Math.PI);
	ctx.fill();
	ctx.stroke();

	//draws the head of the snowman shape
	ctx.beginPath();
	ctx.arc(xCenter, yCenter - size / 13, size / 9, 0.75 * Math.PI, 2.25 * Math.PI);
	ctx.fill();
	ctx.stroke();
}

//this function draws a rook based upon a x,y center point and the size and will color it according to stroke and fill colors
function drawRook(xCenter, yCenter, size, strokeColor, fillColor) {
	//resizes the stroke line's width based on the size of the board
	ctx.lineWidth = board.size / 400;

	//sets the colors based upon the inputs
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	//draws the center rectangle
	ctx.fillRect(xCenter - size / 6, yCenter - size / 10, size / 3, size / 2.2);
	ctx.strokeRect(xCenter - size / 6, yCenter - size / 10, size / 3, size / 2.2);

	//draws the bottom small rectangle
	ctx.fillRect(xCenter - size / 5, yCenter + size / 3.5, size / 2.5, size / 20);
	ctx.strokeRect(xCenter - size / 5, yCenter + size / 3.5, size / 2.5, size / 20);

	//draws the base rectangle
	ctx.fillRect(xCenter - size / 4, yCenter + size / 3, size / 2, size / 10);
	ctx.strokeRect(xCenter - size / 4, yCenter + size / 3, size / 2, size / 10);

	//draws the top small rectangle
	ctx.fillRect(xCenter - size / 5, yCenter - size / 9, size / 2.5, size / 20);
	ctx.strokeRect(xCenter - size / 5, yCenter - size / 9, size / 2.5, size / 20);

	//draws the top castle bit
	ctx.beginPath();

	//starts in the bottom left corner of the top part
	ctx.moveTo(xCenter - size / 4, yCenter - size / 9);
	ctx.lineTo(xCenter - size / 4, yCenter - size / 3.2);

	//first rectangular bite
	ctx.lineTo(xCenter - size / 6, yCenter - size / 3.2);
	ctx.lineTo(xCenter - size / 6, yCenter - size / 4);
	ctx.lineTo(xCenter - size / 18, yCenter - size / 4);
	ctx.lineTo(xCenter - size / 18, yCenter - size / 3.2);

	//next rectangluar bite
	ctx.lineTo(xCenter + size / 18, yCenter - size / 3.2);
	ctx.lineTo(xCenter + size / 18, yCenter - size / 4);
	ctx.lineTo(xCenter + size / 6, yCenter - size / 4);
	ctx.lineTo(xCenter + size / 6, yCenter - size / 3.2);

	//finishes the rest fo the rectangle
	ctx.lineTo(xCenter + size / 4, yCenter - size / 3.2);
	ctx.lineTo(xCenter + size / 4, yCenter - size / 9);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

//this function draws a knight based upon a x,y center point and the size and will color it according to stroke and fill colors
function drawKnight(xCenter, yCenter, size, strokeColor, fillColor) {
	//resizes the stroke line's width based on the size of the board
	ctx.lineWidth = board.size / 400;

	//sets the colors based upon the inputs
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	//draws the body and head of the horse
	ctx.beginPath();
	ctx.moveTo(xCenter + size / 4.8, yCenter + size / 3.5);
	ctx.quadraticCurveTo(xCenter + size / 3, yCenter - size / 4, xCenter + size / 20, yCenter - size / 3.2);
	ctx.lineTo(xCenter - size / 3.5, yCenter - size / 9);
	ctx.quadraticCurveTo(xCenter - size / 3, yCenter, xCenter - size / 4, yCenter + size / 20);
	ctx.lineTo(xCenter - size / 20, yCenter);
	ctx.quadraticCurveTo(xCenter, yCenter + size / 9, xCenter - size / 6, yCenter + size / 3.5);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	//draws the semi circle shoulder part at the bottom
	ctx.beginPath();
	ctx.arc(xCenter, yCenter + size / 2.2, size / 4, 1 * Math.PI, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	//draws the line at the bottom of the semi circle
	ctx.beginPath();
	ctx.moveTo(xCenter - size / 4, yCenter + size / 2.2);
	ctx.lineTo(xCenter + size / 4, yCenter + size / 2.2);
	ctx.stroke();

	//draws the eye
	ctx.beginPath();
	ctx.arc(xCenter - size / 20, yCenter - size / 5, size / 40, 0 * Math.PI, 2 * Math.PI);
	ctx.stroke();

	//draws the ear
	ctx.beginPath();
	ctx.moveTo(xCenter + size / 20, yCenter - size / 3.5);
	ctx.lineTo(xCenter + size / 15, yCenter - size / 2.5);
	ctx.quadraticCurveTo(xCenter + size / 5, yCenter - size / 3, xCenter + size / 8, yCenter - size / 4);
	ctx.fill();
	ctx.stroke();
}

//this function draws a bishop based upon a x,y center point and the size and will color it according to stroke and fill colors
function drawBishop(xCenter, yCenter, size, strokeColor, fillColor) {
	//resizes the stroke line's width based on the size of the board
	ctx.lineWidth = board.size / 400;

	//sets the colors based upon the inputs
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	//draws the main head part of the bishop
	ctx.beginPath();
	ctx.moveTo(xCenter + size / 4, yCenter + size / 4.1);
	ctx.quadraticCurveTo(xCenter + size / 2.5, yCenter, xCenter, yCenter - size / 3);
	ctx.quadraticCurveTo(xCenter - size / 2.5, yCenter, xCenter - size / 4, yCenter + size / 4.1);
	ctx.lineTo(xCenter + size / 4, yCenter + size / 4.1);
	ctx.fill();
	ctx.stroke();

	//draws the small circle at the top of the hat
	ctx.beginPath();
	ctx.arc(xCenter, yCenter - size / 2.6, size / 20, 0 * Math.PI, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	//draws the small transistion piece between the base and the hat
	ctx.fillRect(xCenter - size / 4.8, yCenter + size / 3.9, size / 2.4, size / 17);
	ctx.strokeRect(xCenter - size / 4.8, yCenter + size / 3.9, size / 2.4, size / 17);

	//draws the base of the piece
	ctx.fillRect(xCenter - size / 4, yCenter + size / 3.1, size / 2, size / 8);
	ctx.strokeRect(xCenter - size / 4, yCenter + size / 3.1, size / 2, size / 8);

	//draws the cross at the middle of the hat
	ctx.strokeRect(xCenter - size / 40, yCenter - size / 8, size / 20, size / 4); //vertical doesn't need a fill because it is already on a white background
	ctx.fillRect(xCenter - size / 10, yCenter - size / 23, size / 5, size / 20);
	ctx.strokeRect(xCenter - size / 10, yCenter - size / 23, size / 5, size / 20);
}

//this function draws a queen based upon a x,y center point and the size and will color it according to stroke and fill colors
function drawQueen(xCenter, yCenter, size, strokeColor, fillColor) {
	//resizes the stroke line's width based on the size of the board
	ctx.lineWidth = board.size / 400;

	//sets the colors based upon the inputs
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	//draws the crown part of the queen
	ctx.beginPath();
	ctx.moveTo(xCenter - size / 3.5, yCenter + size / 2.5); // starts in the bottom left side
	ctx.lineTo(xCenter - size / 2.8, yCenter - size / 5);
	ctx.lineTo(xCenter - size / 5, yCenter + size / 15);
	ctx.lineTo(xCenter - size / 8, yCenter - size / 3);
	ctx.lineTo(xCenter, yCenter);
	ctx.lineTo(xCenter + size / 8, yCenter - size / 3);
	ctx.lineTo(xCenter + size / 5, yCenter + size / 15);
	ctx.lineTo(xCenter + size / 2.8, yCenter - size / 5);
	ctx.lineTo(xCenter + size / 3.5, yCenter + size / 2.5);
	ctx.fill();
	ctx.stroke();

	//draws the small transistion rectangle at the bottom
	ctx.fillRect(xCenter - size / 3.2, yCenter + size / 3.5, size / 1.6, size / 20);
	ctx.strokeRect(xCenter - size / 3.2, yCenter + size / 3.5, size / 1.6, size / 20);

	//draws the base rectangle
	ctx.fillRect(xCenter - size / 3, yCenter + size / 3, size / 1.5, size / 10);
	ctx.strokeRect(xCenter - size / 3, yCenter + size / 3, size / 1.5, size / 10);

	//draws the four balls at the top of each spike
	ctx.beginPath();
	ctx.arc(xCenter - size / 2.8, yCenter - size / 5, size / 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(xCenter + size / 2.8, yCenter - size / 5, size / 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(xCenter + size / 8, yCenter - size / 3, size / 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(xCenter - size / 8, yCenter - size / 3, size / 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
}

//this function draws a king based upon a x,y center point and the size and will color it according to stroke and fill colors
function drawKing(xCenter, yCenter, size, strokeColor, fillColor) {
	//resizes the stroke line's width based on the size of the board
	ctx.lineWidth = board.size / 400;

	//sets the colors based upon the inputs
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;

	//draws the vertical part of the cross
	ctx.fillRect(xCenter - size / 30, yCenter - size / 3, size / 15, size / 2.5);
	ctx.strokeRect(xCenter - size / 30, yCenter - size / 3, size / 15, size / 2.5);

	//draw a small circle at the top of the crown
	ctx.beginPath();
	ctx.arc(xCenter, yCenter, size / 8, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();

	//draws the horizontal part of the crown's cross
	ctx.fillRect(xCenter - size / 8, yCenter - size / 4, size / 4, size / 20);
	ctx.strokeRect(xCenter - size / 8, yCenter - size / 4, size / 4, size / 20);

	//draws the main body, bunny ears sort of shape
	ctx.beginPath();
	ctx.moveTo(xCenter - size / 3.5, yCenter + size / 2.5);
	ctx.quadraticCurveTo(xCenter - size / 2, yCenter - size / 2, xCenter, yCenter - size / 40);
	ctx.quadraticCurveTo(xCenter + size / 2, yCenter - size / 2, xCenter + size / 3.5, yCenter + size / 2.5);
	ctx.fill();
	ctx.stroke();

	//draws the transistion rectangle at the bottom
	ctx.fillRect(xCenter - size / 3.2, yCenter + size / 3.5, size / 1.6, size / 20);
	ctx.strokeRect(xCenter - size / 3.2, yCenter + size / 3.5, size / 1.6, size / 20);

	//draws the base of the crown
	ctx.fillRect(xCenter - size / 3, yCenter + size / 3, size / 1.5, size / 10);
	ctx.strokeRect(xCenter - size / 3, yCenter + size / 3, size / 1.5, size / 10);
}

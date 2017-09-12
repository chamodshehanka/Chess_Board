/**
 * Copyright (c) 2017 , Chamod Shehanka (http://chamodshehanka.com)
 *
 * All rights received
 * */

var BLACK = 'b';
var WHITE = 'w';

var PAWN = 'p';
var KNIGHT = 'n';
var BISHOP = 'b';
var ROOK = 'r';
var QUEEN = 'q';
var KING = 'k';

var LEFT='l';
var RIGHT='r';

var chessChars=["a","b","c","d","e","f","g","h"];
var chessPieces=[
    "WhiteRook",
    "WhiteKnight",
    "WhiteBishop",
    "WhiteQueen",
    "WhiteKing",
    "WhiteBishop",
    "WhiteKnight",
    "WhiteRook",

    "WhitePawn",
    "WhitePawn",
    "WhitePawn",
    "WhitePawn",
    "WhitePawn",
    "WhitePawn",
    "WhitePawn",
    "WhitePawn",


    "BlackPawn",
    "BlackPawn",
    "BlackPawn",
    "BlackPawn",
    "BlackPawn",
    "BlackPawn",
    "BlackPawn",
    "BlackPawn",

    "BlackRook",
    "BlackKnight",
    "BlackBishop",
    "BlackQueen",
    "BlackKing",
    "BlackBishop",
    "BlackKnight",
    "BlackRook"
];
var pieceNo=[
    WHITE+ROOK+LEFT,
    WHITE+KNIGHT+LEFT,
    WHITE+BISHOP+LEFT,
    WHITE+QUEEN,
    WHITE+KING,
    WHITE+BISHOP+RIGHT,
    WHITE+KNIGHT+RIGHT,
    WHITE+ROOK+RIGHT,

    WHITE+PAWN+"1",
    WHITE+PAWN+"2",
    WHITE+PAWN+"3",
    WHITE+PAWN+"4",
    WHITE+PAWN+"5",
    WHITE+PAWN+"6",
    WHITE+PAWN+"7",
    WHITE+PAWN+"8",

    BLACK+PAWN+"8",
    BLACK+PAWN+"7",
    BLACK+PAWN+"6",
    BLACK+PAWN+"5",
    BLACK+PAWN+"4",
    BLACK+PAWN+"3",
    BLACK+PAWN+"2",
    BLACK+PAWN+"1",

    BLACK+ROOK+RIGHT,
    BLACK+KNIGHT+RIGHT,
    BLACK+BISHOP+RIGHT,
    BLACK+QUEEN,
    BLACK+KING,
    BLACK+BISHOP+LEFT,
    BLACK+KNIGHT+LEFT,
    BLACK+ROOK+RIGHT
];

var SQUARES={
    a8: 56, b8: 57, c8: 58, d8: 59, e8: 60, f8: 61, g8: 62, h8: 63,
    a7: 48, b7: 49, c7: 50, d7: 51, e7: 52, f7: 53, g7: 54, h7: 55,
    a6: 40, b6: 41, c6: 42, d6: 43, e6: 44, f6: 45, g6: 46, h6: 47,
    a5: 32, b5: 33, c5: 34, d5: 35, e5: 36, f5: 37, g5: 38, h5: 39,
    a4: 24, b4: 25, c4: 26, d4: 27, e4: 28, f4: 29, g4: 30, h4: 31,
    a3: 16, b3: 17, c3: 18, d3: 19, e3: 20, f3: 21, g3: 22, h3: 23,
    a2:  8, b2:  9, c2: 10, d2: 11, e2: 12, f2: 13, g2: 14, h2: 15,
    a1:  0, b1:  1, c1:  2, d1:  3, e1:  4, f1:  5, g1:  6, h1:  7
};

var SQUARE_ID={
    56 : "a8", 57 : "b8", 58 : "c8", 59 : "d8", 60 : "e8", 61 : "f8", 62 : "g8", 63 : "h8",
    48 : "a7", 49 : "b7", 50 : "c7", 51 : "d7", 52 : "e7", 53 : "f7", 54 : "g7", 55 : "h7",
    40 : "a6", 41 : "b6", 42 : "c6", 43 : "d6", 44 : "e6", 45 : "f6", 46 : "g6", 47 : "h6",
    32 : "a5", 33 : "b5", 34 : "c5", 35 : "d5", 36 : "e5", 37 : "f5", 38 : "g5", 39 : "h5",
    24 : "a4", 25 : "b4", 26 : "c4", 27 : "d4", 28 : "e4", 29 : "f4", 30 : "g4", 31 : "h4",
    16 : "a3", 17 : "b3", 18 : "c3", 19 : "d3", 20 : "e3", 21 : "f3", 22 : "g3", 23 : "h3",
    8  : "a2", 9  : "b2", 10 : "c2", 11 : "d2", 12 : "e2", 13 : "f2", 14 : "g2", 15 : "h2",
    0  : "a1", 1  : "b1", 2  : "c1", 3  : "d1", 4  : "e1", 5  : "f1", 6  : "g1", 7  : "h1"
};

var KING_POSSIBLE_MOVES=[8,7,9,-1,1,-9,-8,-7];
var KNIGHT_POSSIBLE_MOVES=[15,6,-10,-17,-15,-6,10,17];
var PAWN_POSSIBLE_MOVES=[8];

var PAWN_DEFAULT_POSITION = {
    wp1 : "a2",
    wp2 : "b2",
    wp3 : "c2",
    wp4 : "d2",
    wp5 : "e2",
    wp6 : "f2",
    wp7 : "g2",
    wp8 : "h2",

    bp8 : "a7",
    bp7 : "b7",
    bp6 : "c7",
    bp5 : "d7",
    bp4 : "e7",
    bp3 : "f7",
    bp2 : "g7",
    bp1 : "h7"
};

var turn=WHITE;

function setChessPieces() {

    var pointer=0;
    var pieceId="";

    for (var i=0;i<8;i++){
        for (var j=0;j<8;j++){
            if(i>1 && i<6)continue;
            pieceId=chessChars[j]+(i+1);
            $('#'+pieceId+'').prepend('<img src="images/'+chessPieces[pointer]+'.png" draggable="true" id="'+pieceNo[pointer]+
                '" width="100px" height="100px" style="position: absolute;" ondragstart="drag(event)">');
            pointer+=1;
        }
    }
    Materialize.toast("🏰 Let's start the game", 2000,'rounded');
}

function resetChessBoard() {

    var imgId="";
    var pointer=0;
    for (var i=0;i<8;i++){
        for (var j=0;j<8;j++){
            if(i>1 && i<6)continue;
            imgId="#"+pieceNo[pointer];
            $(imgId).remove();
            pointer+=1;
        }
    }

    setChessPieces();
    resetMoveSuggestions();
    setSquareColor(CLICKED_PIECE_POSITION,null);
    resetDefaultSquareColor();
}

//Rotate board
var angle=($('#mainChessBoard').data('angle')) || 0;
var playerSide=0;
function rotateBoard() {
    angle+=180;
    playerSide+=1;
    document.getElementById('mainChessBoard').style['-webkit-transition']= '-webkit-transform 2.5s ease-in';
    document.getElementById('mainChessBoard').style['-webkit-transform']= 'rotateZ('+angle+'deg)';
    document.getElementById('mainChessBoard').style['-moz-transform']= 'rotateZ('+angle+'deg)';
    document.getElementById('mainChessBoard').style['transform']= 'rotateZ('+angle+'deg)';

    if (playerSide%2===0){
        document.getElementById('chess-board').style['-webkit-transition']= '-webkit-transform 2.5s ease-in';
        document.getElementById('chess-board').style['-webkit-transform']= 'rotateX(50deg)';
        document.getElementById('chess-board').style['-moz-transform']= 'rotateX(50deg)';
        document.getElementById('chess-board').style['transform']= 'rotateX(50deg)';
        Materialize.toast("White's turn", 3500,'rounded');
        turn=WHITE;

        //For Squares
        for (var i=0;i<pieceNo.length;i++){
            var pid="#"+pieceNo[i];
            $(pid).css({
                "-webkit-transition":"-webkit-transform 2.5s ease-in",
                "-webkit-transform":"rotateZ(0deg)",
                "-moz-transform":"rotateZ(0deg)",
                "transform":"rotateZ(0deg)"
            });
        }
    }else {
        document.getElementById('chess-board').style['-webkit-transition']= '-webkit-transform 2.5s ease-in';
        document.getElementById('chess-board').style['-webkit-transform']= 'rotateX(-50deg)';
        document.getElementById('chess-board').style['-moz-transform']= 'rotateX(-50deg)';
        document.getElementById('chess-board').style['transform']= 'rotateX(-50deg)';
        Materialize.toast("Black's turn", 3500,'rounded');
        turn=BLACK;

        //For Squares
        for (var i=0;i<pieceNo.length;i++){
            var pid="#"+pieceNo[i];
            $(pid).css({
                "-webkit-transition":"-webkit-transform 2.5s ease-in",
                "-webkit-transform":"rotateZ(180deg)",
                "-moz-transform":"rotateZ(180deg)",
                "transform":"rotateZ(180deg)"
            });
        }
    }
}


//When keys pressed
window.onkeypress = function(event) {
    if (event.keyCode === 98) {
        setChessPieces();
    }
    if (event.keyCode === 116) {
        rotateBoard();
    }
    if (event.keyCode === 114){
        resetChessBoard();
    }
};


//Draggable
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var droppingId=ev.target.id;
    var legalMove=false;
    var id="#"+droppingId;
    var droppingSquareId=$(id).parent().attr("id");

    for (var i=0;i<squareSuggestions.length;i++){
        if (droppingId===squareSuggestions[i] || droppingSquareId===squareSuggestions[i]){
            legalMove=true;
        }
    }

    for (var i=0;i<attackSuggestions.length;i++){
        if (droppingId===attackSuggestions[i] || droppingSquareId===attackSuggestions[i]){
            legalMove=true;
        }
    }

    if (legalMove===true){
        if (isSquareAvailable(droppingId)===true){
            ev.target.appendChild(document.getElementById(data));
        }else {
            ev.target.replaceWith(document.getElementById(data));
        }
        rotateBoard();
    }



    resetDefaultSquareColor();
}

function resetDefaultSquareColor() {
    isClicked=false;

    resetMoveSuggestions();

    for (var i=0;i<63;i++){
        setSquareColor(SQUARE_ID[i],null);
    }
}

//squareSelectedColors
var RED    = "#e74c3c";
var GREEN  = "#2ecc71";
var BLUE   = "#3498db";
var YELLOW = "#f1c40f";
var ORANGE = "#e67e22";
var PURPLE = "#9b59b6";
function setSquareColor(squareId,color) {

    var id="#"+squareId;

    if (color===RED){
        $(id).css({
            "box-shadow":"inset 0 0 5px 5px"+RED
        });
        Materialize.toast("👸🏻: Protect my King", 3500,'rounded');
    }
    if (color===GREEN){
        $(id).css({
            "box-shadow":"inset 0 0 5px 5px"+GREEN
        });
    }
    if (color===BLUE){
        $(id).css({
            "box-shadow":"inset 0 0 5px 5px"+BLUE
        });
    }
    if (color===YELLOW){
        $(id).css({
            "box-shadow":"inset 0 0 5px 5px"+YELLOW
        });
        Materialize.toast("🤴: Launch attack", 3500,'rounded');
    }
    if (color===ORANGE){
        $(id).css({
            "box-shadow":"inset 0 0 5px 5px"+ORANGE
        });
    }
    if (color===PURPLE){
        $(id).css({
            "box-shadow":"inset 0 0 5px 5px"+PURPLE
        });
        Materialize.toast("👸🏻: I'll kill you ⚔️", 3500,'rounded');
    }
    if (color===null){
        $(id).css({
            "box-shadow":""
        });
    }
}

var clickCount=0;
var CLICKED_PIECE_ID;
var CLICKED_PIECE_POSITION=null;

var isClicked;
$(".white-square,.black-square").on("click", function() {

    var tempPosition=$(this).attr("id");
    function enableClicked() {
        isClicked=true;
    }
    function disableClicked() {
        isClicked=false;
    }

    if (isClicked===undefined || isClicked===false){
        CLICKED_PIECE_POSITION=tempPosition;

        CLICKED_PIECE_ID=$(this).find('img').attr("id");
        chessPiece(CLICKED_PIECE_ID,CLICKED_PIECE_POSITION);
    }

    if (tempPosition===CLICKED_PIECE_POSITION){
        clickCount+=1;
        if (clickCount===2){
            disableClicked();
            setSquareColor(CLICKED_PIECE_POSITION,null);
            clickCount=0;
            isClicked=undefined;
            resetMoveSuggestions();
        }else {
            enableClicked();
            setSquareColor(CLICKED_PIECE_POSITION,BLUE);
        }

    }else {
        Materialize.toast("Invalid click", 3500,'rounded');
    }

});

var squareSuggestions=[];
var pawnMoves=0;

var COLUMN={
    a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8
};
var ROW=[0,1,2,3,4,5,6,7,8];

var KNIGHT_OFFSETS = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1]
];
function chessPiece(piece,piecePosition) {
    var row;
    var column;

    if (piece===undefined && piecePosition===undefined){
        return "NullPointerException";
    }

    for (var i=0;i<pieceNo.length;i++){
        if (piece===pieceNo[i]){
            var pieceType=piece.substring(0,1);
            if (pieceType==="w"){
                genarateMoveSuggestions(WHITE,piece);
            }else {
                genarateMoveSuggestions(BLACK,piece);
            }
        }
    }

    function genarateMoveSuggestions(pieceType,piece) {
        var positionX=piecePosition.substring(0,1);
        var positionY;
        var pieceTitle=piece.substring(1,2);
        var squareId;

        attack(pieceTitle,piecePosition,pieceType);

        if (pieceTitle===PAWN){
            squareSuggestions.length=0;

            for (var i=0;i<16;i++){
                if (PAWN_DEFAULT_POSITION[piece]===piecePosition){
                    pawnMoves=0;
                }else {
                    pawnMoves=1;
                }
            }

            if (pawnMoves===0){
                var secondId;
                if (pieceType===WHITE){
                    squareId=SQUARE_ID[SQUARES[piecePosition]+8];

                    if (isSquareAvailable(squareId)===true){
                        squareSuggestions.push(squareId);

                        secondId=SQUARE_ID[SQUARES[squareId]+8];

                        if (isSquareAvailable(secondId)===true){
                            squareSuggestions.push(secondId);
                        }
                    }
                }else {
                    squareId=SQUARE_ID[SQUARES[piecePosition]-8];

                    if (isSquareAvailable(squareId)===true){
                        squareSuggestions.push(squareId);

                        secondId=SQUARE_ID[SQUARES[squareId]-8];

                        if (isSquareAvailable(secondId)===true){
                            squareSuggestions.push(secondId);
                        }
                    }
                }
            }else {
                if (pieceType===WHITE){
                    squareId=SQUARE_ID[SQUARES[piecePosition]+8];

                    if (isSquareAvailable(squareId)===true){
                        squareSuggestions.push(squareId);
                    }
                }else {
                    squareId=SQUARE_ID[SQUARES[piecePosition]-8];

                    if (isSquareAvailable(squareId)===true){
                        squareSuggestions.push(squareId);
                    }
                }
            }

            for (var i=0;i<squareSuggestions.length;i++){
                setSquareColor(squareSuggestions[i],GREEN);
            }
        }

        if (pieceTitle===ROOK){
            squareSuggestions.length=0;
            column=piecePosition.substring(0,1);
            row=parseInt(piecePosition.substring(1,2));

            //Rook up moves
            for (var i = ROW[row]+1; i < 9; i++){
                squareId=column+i;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(column+(row+1))===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //Rook down moves
            for (var i=ROW[row]-1;i>0;i--){
                squareId=column+i;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(column+(row-1))===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //Rook right moves
            for (var i=COLUMN[column]+1;i<9;i++){
                squareId=chessChars[i-1]+row;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[(COLUMN[column])]+row)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //Rook left movement
            for (var i=COLUMN[column]-1;i>0;i--){
                squareId=chessChars[i-1]+row;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[i-1]+row)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }
        }
        
        if (pieceTitle===KNIGHT){
            squareSuggestions.length=0;

            if (isKingSafe()===true){
                var id=SQUARES[piecePosition];

                for (var i=0;i<KNIGHT_POSSIBLE_MOVES.length;i++){
                    squareSuggestions[i]=SQUARE_ID[id+KNIGHT_POSSIBLE_MOVES[i]];
                }

                for (var i=0;i<squareSuggestions.length;i++){

                    if (isSquareAvailable(squareSuggestions[i])===true){
                        setSquareColor(squareSuggestions[i],GREEN);
                    }

                }
            }

            KNIGHT_OFFSETS.forEach(function(array2) {
                array2.forEach(function (i) {
                    // console.log();
                });
            });
        }
        
        if (pieceTitle===BISHOP){
            squareSuggestions.length=0;

            column=piecePosition.substring(0,1);
            row=parseInt(piecePosition.substring(1,2));

            //all possible moves in the down positive diagonal
            for (var j=COLUMN[column],i=row+1;j<9 && i<9;j++,i++){
                squareId=chessChars[j]+""+i;

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //all possible moves in the up positive diagonal
            for (var j=COLUMN[column]-2,i=row+1;j>-1 && i<9;j--,i++){
                squareId=chessChars[j]+""+(i);

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //all possible moves in the up negative diagonal
            for (var j=COLUMN[column]-2,i=row-1;j>-1 && i>-1;j--,i--){
                squareId=chessChars[j]+""+(i);

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //all possible moves in the down negative diagonal
            for (var j=COLUMN[column],i=row-1;j<9 && i>0;j++,i--){
                squareId=chessChars[j]+""+(i);

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

        }
        
        if (pieceTitle===QUEEN){
            squareSuggestions.length=0;

            column=piecePosition.substring(0,1);
            row=parseInt(piecePosition.substring(1,2));

            for (var i = ROW[row]+1; i < 9; i++){
                squareId=column+i;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(column+(row+1))===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //Rook down moves
            for (var i=ROW[row]-1;i>0;i--){
                squareId=column+i;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(column+(row-1))===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //Rook right moves
            for (var i=COLUMN[column]+1;i<9;i++){
                squareId=chessChars[i-1]+row;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[(COLUMN[column])]+row)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //Rook left movement
            for (var i=COLUMN[column]-1;i>0;i--){
                squareId=chessChars[i-1]+row;
                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[i-1]+row)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }


            //all possible moves in the down positive diagonal
            for (var j=COLUMN[column],i=row+1;j<9 && i<9;j++,i++){
                squareId=chessChars[j]+""+i;

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //all possible moves in the up positive diagonal
            for (var j=COLUMN[column]-2,i=row+1;j>-1 && i<9;j--,i++){
                squareId=chessChars[j]+""+(i);

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //all possible moves in the up negative diagonal
            for (var j=COLUMN[column]-2,i=row-1;j>-1 && i>-1;j--,i--){
                squareId=chessChars[j]+""+(i);

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }

            //all possible moves in the down negative diagonal
            for (var j=COLUMN[column],i=row-1;j<9 && i>0;j++,i--){
                squareId=chessChars[j]+""+(i);

                if (isSquareAvailable(squareId)===true && isSquareAvailable(chessChars[j]+i)===true){
                    setSquareColor(squareId,GREEN);
                    squareSuggestions.push(squareId);
                }else if (isOpponent(piece,squareId)===true){
                    setSquareColor(squareId,YELLOW);
                    squareSuggestions.push(squareId);
                    break;
                }else {
                    break;
                }
            }
        }
        
        if (pieceTitle===KING){
            squareSuggestions.length=0;

            if ((isKingSafe() && canKingMove(pieceType,piecePosition))===true){
                var id=SQUARES[piecePosition];

                for (var ii=0;ii<KING_POSSIBLE_MOVES.length;ii++){
                    squareSuggestions[ii]=SQUARE_ID[id+KING_POSSIBLE_MOVES[ii]];
                }

                for (var i1=0;i1<squareSuggestions.length;i1++){
                    if (isSquareAvailable(squareSuggestions[i1])===true){
                        setSquareColor(squareSuggestions[i1],GREEN);
                    }
                }
            }else {
                Materialize.toast("King can't move", 3500,'rounded');
            }
        }

    }

}
function resetMoveSuggestions() {

    for (var i=0;i<squareSuggestions.length;i++){
        setSquareColor(squareSuggestions[i],null);
    }

    if (attackSuggestions.length !==0){
        for (var i=0;i<attackSuggestions.length;i++){
            setSquareColor(attackSuggestions[i],null);
        }
    }
}

function isSquareAvailable(squareId) {
    var isIdAvailable=false;
    for (var i=0;i<63;i++){
        if (SQUARE_ID[i]===squareId){
            isIdAvailable=true;
        }
    }

    if (isIdAvailable===true){
        var id="#"+squareId;
        return $(id).children().length===0;
    }else {
        return false;
    }
}

//King ♔
function checkKing() {
    var kingPosition;
    if (turn===WHITE){
        kingPosition=$('#bk').parent().attr("id");
        setSquareColor(kingPosition,RED);
        Materialize.toast("Check ♔", 3500,'rounded');
    }else {
        kingPosition=$('#wk').parent().attr("id");
        setSquareColor(kingPosition,RED);
        Materialize.toast("Check ♔", 3500,'rounded');
    }
}

function isKingSafe() {
    return true;
}

function canKingMove(pieceType,piecePosition) {

    return true;
}

function checkMate() {
    var kingPosition;
    if (turn===WHITE){
        kingPosition=$('#bk').parent().attr("id");
        setSquareColor(kingPosition,PURPLE);
        Materialize.toast("Check Mate ♔", 3500,'rounded');
    }else {
        kingPosition=$('#wk').parent().attr("id");
        setSquareColor(kingPosition,PURPLE);
        Materialize.toast("Check Mate ♔", 3500,'rounded');
    }
}

var attackSuggestions=[];
var PAWN_ATTACK_MOVES=[7,9];
function attack(pieceTitle,piecePosition,pieceType) {

    var id;
    var targetPieceType;
    var attackId;

    if (pieceTitle===KING){

    }

    if (pieceTitle===QUEEN){

    }

    if (pieceTitle===ROOK){

    }

    if (pieceTitle===BISHOP){

    }

    if (pieceTitle===KNIGHT){

    }

    if (pieceTitle===PAWN){
        attackSuggestions.length=0;
        for (var i=0;i<PAWN_ATTACK_MOVES.length;i++){

            if (pieceType===WHITE){

                if (isSquareAvailable(SQUARE_ID[SQUARES[piecePosition]+PAWN_ATTACK_MOVES[i]])===false){

                    id="#"+SQUARE_ID[SQUARES[piecePosition]+PAWN_ATTACK_MOVES[i]];
                    targetPieceType=$(id).find("img").attr('id').substring(0,1);

                    attackId=SQUARE_ID[SQUARES[piecePosition]+PAWN_ATTACK_MOVES[i]];

                    if (pieceType!==targetPieceType){
                        attackSuggestions.push(attackId);
                        setSquareColor(attackId,YELLOW);
                        squareSuggestions.push(attackId);
                    }

                }

            }else {

                if (isSquareAvailable(SQUARE_ID[SQUARES[piecePosition]-PAWN_ATTACK_MOVES[i]])===false){

                    id="#"+SQUARE_ID[SQUARES[piecePosition]-PAWN_ATTACK_MOVES[i]];
                    targetPieceType=$(id).find("img").attr('id').substring(0,1);

                    attackId=SQUARE_ID[SQUARES[piecePosition]-PAWN_ATTACK_MOVES[i]];

                    if (pieceType!==targetPieceType){
                        attackSuggestions.push(attackId);
                        setSquareColor(attackId,YELLOW);
                        squareSuggestions.push(attackId);
                    }

                }
            }

        }
    }
}

function isOpponent(piece,squareId) {

    var pieceType=piece.substring(0,1);

    var targetSquareId="#"+squareId;
    var targetPiece=""+$(targetSquareId).children().attr("id");
    var targetPieceType=targetPiece.substring(0,1);
    var targetPieceTitle=targetPiece.substring(1,2);//If king check available

    // console.log(targetPiece+" "+targetPieceType+" "+targetPieceTitle);
    // console.log(pieceType+" "+targetPieceType+" "+pieceType===targetPieceType);
    if (targetPieceTitle===KING){
        // checkKing();
    }

    if (pieceType!==targetPieceType && targetPieceTitle !==KING && targetPiece !==""+undefined){
        return true;
    }else {
        return false;
    }
}

function selectKnight() {
    var knightPosition;
    if (turn===WHITE){
        knightPosition=$('#wnl').parent().attr("id");
        chessPiece("wnl",knightPosition);
        setSquareColor(knightPosition,BLUE);
    }else {
        knightPosition=$('#bnl').parent().attr("id");
        chessPiece("bnl",knightPosition);
        setSquareColor(knightPosition,BLUE);
    }
}

function movetoAthree() {
    var nId="#wnl";
    var nTemp=$(nId).clone();
    $(nId).remove();
    $('#a3').prepend(nTemp);
    resetMoveSuggestions();
    rotateBoard();
}
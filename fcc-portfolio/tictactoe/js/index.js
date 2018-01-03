/***
 * To-Do:
 * Fix 2p turn bug
 * fix correct win bug
 * Make Responsive
 * Commit
 * FCC
 * */

var currentBoard = 'b';
var closedBoards = [];
var turn = 0; //where 0 is player 1

var translateValue;

var black = "#4b3832"
var red = "#854442";
var blue = "#3c2f2f";

var ai = false;
var running = true;
$('document').ready(function(){
    translateValue = $("#a").width();
})
var boardsArray = [];
for(var i = 0; i < 3 ; i++){
    var rows = [];
    for(var j= 0; j < 3; j++){
        rows[j] = [];
        for(var k = 0; k < 3; k++){
            rows[j][k] = "0";
        }
    }
    boardsArray[i] = rows;
}
resize();
$("#arrowRight").click(function(){
    switch (currentBoard) {
        case 'a':
            $("#boards").css("transform", "translateX(0)");
            currentBoard = 'b';
            resize();
            break;
        case 'b':
            $("#boards").css("transform", "translateX(-"+translateValue+"px)");
            currentBoard = 'c';
            resize();
            break; 
        case 'c':
            break;   
        default:
    }
    resize();
});
$("#arrowLeft").click(function(){
    switch (currentBoard) {
        case 'c':
            $("#boards").css("transform", "translateX(0)");
            currentBoard = 'b';
            resize();
            break;
        case 'b':
            $("#boards").css("transform", "translateX("+translateValue+"px)");
            currentBoard = 'a';
            resize();
            break; 
        case 'a':
            break;   
        default:
    }
});

function resize(){
    $(".board").each(function(i, obj){
        var id = $(obj).attr("id");
        if(id == currentBoard){
            $("#"+id).css("transform", "scale(1)");
            $("#"+id  + " .cell").css("border-color", black);
        }
        else{
            $(obj).css("transform", "scale(0.7)");
            $("#"+id  + " .cell").css("border-color", "grey");
        }
    });
}

/****Cell clickiing************/
var color;
$(".cell").click(function(){
    if((turn == 0 || ai == false) && $(this).parent().attr("id") == currentBoard){
        switch (turn) {
            case 0:
                color = red;
                break;
            
            default:
                color = blue;
        }
        var indexClass = $(this).attr("class").replace("cell ", "");
        var indexes = getIndexes(indexClass);
           
       if(boardsArray[indexes[0]][indexes[1]][indexes[2]] != 'x'){
           $(this).html("<h2 class='animated bounceIn' style='color:"+color+"'>X</h2>");
           $("h2").one("animationend", function(){
               boardsArray[indexes[0]][indexes[1]][indexes[2]] = "x";
               logArray();
               if(checkBoard(indexes)){
                closeBoard();   
               }
               else{
                turn = 1 - turn;
                console.log(turn);
                var nextPlayer =  turn + 1;
                $("#turner").text("Player " + nextPlayer + "'s Turn");
               }
                
                if(ai == true){
                    color = blue;
                    playai();
                }
           });
       }
    
    }
});

function playai(){
    if(running){
    //console.log("ai playing");
    /**
     * Ai functioning is going to be dirt simple:
     * 1 - the computer will select a random not closed board
     * 2 - then it will add to an empty cell
     * 3 - unless there is only one board
     * 4 - then it will check for options that dont close it
     * 5 - if there are no options, place on a random
     * */
     
     //1 - random board - random number between 0 and 2 - check if closed - + 1 mod 2
     var selBoard = Math.floor(Math.random() * 3);
     //console.log("Board " + selBoard);
     var selBoardChar = numToCharBoard(selBoard);
     
     //console.log(closedBoards);
     while(closedBoards.includes(selBoardChar)){
         selBoard = (selBoard + 1)%3;
         selBoardChar = numToCharBoard(selBoard);
         //console.log("closed, changed to " + selBoardChar);
     }
     //console.log("Char: " + selBoardChar);
     var trans = -(selBoard-1)*translateValue;
     //console.log("translate: " + trans);
    
    //now, for choosing cells, we will get smarter on the last board
    var selCell;
    var selRow;
    var selCol;
     if(closedBoards.length == 2){
         selCell = Math.floor(Math.random() * 9);
         //we get a random cell, get its coordinates
         selRow = Math.floor(selCell/3);
         selCol = selCell%3;
        //console.log("Selected cell: " + selRow + " | " + selCol);         
         //first, the cell has to be blank
         //then, the cell cannot complete any lines
         var start = selCell;
         
         //console.log("Makes line? : " + checkBoard(indexes));
         if(boardsArray[selBoard][selRow][selCol]  != 'x'){
            boardsArray[selBoard][selRow][selCol] = "t";
         }
         logArray()
         while(boardsArray[selBoard][selRow][selCol] == "x" || checkBoard( [selBoard, selRow, selCol])){
             //go to the next one
             if(boardsArray[selBoard][selRow][selCol]  != 'x'){
                boardsArray[selBoard][selRow][selCol] = "O";
             }
             selCell = (selCell+1)%9;
             selRow = Math.floor(selCell/3);
             selCol = selCell%3;
             //console.log("Something wrong! Selected cell: " + selRow + " | " + selCol);
             if(boardsArray[selBoard][selRow][selCol]  != 'x'){
                boardsArray[selBoard][selRow][selCol] = "t";
             }
             logArray()
             //console.log("MakesLine?" + checkBoard([selBoard, selRow, selCol]));
             
             if(selCell == start){
                 if(boardsArray[selBoard][selRow][selCol]  != 'x'){
                    boardsArray[selBoard][selRow][selCol] = "O";
                 }
                 //darn, we are back where we started,
                 //just find a blank cell and end this!
                 //console.log("darn!");
                          //2.1 - random cell - random number between 0 and 8 - check if empty - + 1 mod 8 
                         selCell = Math.floor(Math.random() * 9);
                         //this gives us a number between 0 and 8
                         //our row num will be math.floor of the number divided by 3
                         selRow = Math.floor(selCell/3);
                         selCol = selCell%3;
                         //console.log("Selected cell: " + selRow + " | " + selCol);
                         //now check if empty
                         //console.log("value: " + boardsArray[selBoard][selRow][selCol]);
                         while(boardsArray[selBoard][selRow][selCol] == "x"){
                             selCell = (selCell+1)%9;
                             selRow = Math.floor(selCell/3);
                             selCol = selCell%3;
                             //console.log("Opupied! Selected cell: " + selRow + " | " + selCol);
                         }
                break;
             }
         }
         logArray();
     }
     else{
         //2.1 - random cell - random number between 0 and 8 - check if empty - + 1 mod 8 
         selCell = Math.floor(Math.random() * 9);
         //this gives us a number between 0 and 8
         //our row num will be math.floor of the number divided by 3
         selRow = Math.floor(selCell/3);
         selCol = selCell%3;
         //console.log("Selected cell: " + selRow + " | " + selCol);
         //now check if empty
         //console.log("value: " + boardsArray[selBoard][selRow][selCol]);
         while(boardsArray[selBoard][selRow][selCol] == "x"){
             selCell = (selCell+1)%9;
             selRow = Math.floor(selCell/3);
             selCol = selCell%3;
             //console.log("Opupied! Selected cell: " + selRow + " | " + selCol);
         }
     }
     //2.2 - add to the array
     boardsArray[selBoard][selRow][selCol] = 'x';
     //2.3 - add to the board
     var celClass =  numToCharCell(selRow) + numToCharCell(selCol);
     var cells = $("." + celClass);
     cells.each(function(){
         var cell = this;
         if($(this).parent().attr("id") == selBoardChar){
            var indexes = [selBoard, selRow, selCol];
            if(currentBoard == selBoardChar){
                //console.log("direct");
                aiEnd(cell, indexes);
            }
            else{
                currentBoard = selBoardChar;
                resize();
                //console.log("wait");
                //console.log("should now transition");
                $("#boards").css("transform", "translateX("+trans +"px)");
                $("#boards").one("transitionend", function(){
                    aiEnd(cell, indexes);
                });
            }
         }
         else{
             //console.log($(this).parent().attr("id") );
         }
     })
   }
   logArray();
}
function aiEnd(cell, indexes){
    //console.log("transitionend");
    //console.log(cell);
    $(cell).html("<h2 class='animated bounceIn' style='color:"+color+"'>X</h2>");  
    //add another event listener
    $("h2").one("animationend", function(){
        //2.4 - check if closed
        //console.log(indexes);
        
        if(checkBoard(indexes)){
            closeBoard();   
        }
        else{
            turn = 1 - turn;
            console.log(turn);
            var nextPlayer =  turn + 1;
            $("#turner").text("Player " + nextPlayer + "'s Turn");  
        }
         
        //end
        //console.log("ai played"); 
   });
}
function closeBoard(){
    closedBoards.push(currentBoard);
    $("#"+currentBoard).html("<h2 style='color:white'>Closed</h2>").css("background-color", color);
    if(closedBoards.length >= 3){
        var player = 2 - turn;
        //alert("Player " + player + " won!");
        running = false;
        
        $("#won").removeClass("bounceOut").addClass("bounceIn").css("display", "inline-block");
        $("#dark").removeClass("fadeOut").addClass("fadeIn").css("display", "inline-block");
        $("#who").text("Player " + player + " won!");
        
    }
    else{
        turn = 1 - turn;
        var nextPlayer =  turn + 1;
        $("#turner").text("Player " + nextPlayer + "'s Turn");
        console.log(turn);
    }
}

function checkBoard(indexes){
    var shouldClose = false;
    /****we need to check horizontal, vertical and 2 diagonals*****/
    
    //Horizontal, fix the y axis and every item on the x axis should be an 'x'
    for(var i = 0; i < 3; i++){
        //console.log(boardsArray[indexes[0]][i][indexes[2]]);
        if(boardsArray[indexes[0]][i][indexes[2]] != 'x' && boardsArray[indexes[0]][i][indexes[2]] != 't') {
            console.log("Break on i = " + i);
            break;
        }
        else if(i == 2) {
            console.log("makesLine! hor");
            shouldClose = true;
        }
    }
    //Vertical, same idea but inverse
    for(i = 0; i < 3; i++){
        if(boardsArray[indexes[0]][indexes[1]][i] != 'x' && boardsArray[indexes[0]][indexes[1]][i] != 't') {
            break;
        }
        else if(i == 2) {
            console.log("makesLine! ver");
            shouldClose = true;
        }
    }
    //diagonal 1
    for(i = 0; i < 3; i++){
        if(boardsArray[indexes[0]][i][i] != 'x' && boardsArray[indexes[0]][i][i] != 't') {
            break;
        }
        else if(i == 2) {
            console.log("makesLine! 1");
            shouldClose = true;
        }
    }
    //diagonal 2
    for(i = 0; i < 3; i++){
        if(boardsArray[indexes[0]][2-i][i] != 'x' && boardsArray[indexes[0]][2-i][i] != 't') {
            break;
        }
        else if(i == 2) {
            console.log("makesLine! 2");
            shouldClose = true;
        }
    }
    
    if(shouldClose){
        //console.log("makes line confirmed!");
        return true;
    }
    else{
        return false;
    }
}

function logArray(){
    console.log("////////////log array///////");
    var row;
    var z = getBoardNum();
    console.log("board: " + z);
    
    for(var i = 0; i < 3; i++){
        row = i + ": ";
        for(var j = 0; j < 3; j++){
            row = row + " | " + boardsArray[z][j][i] + " | ";
            ////console.log("j = " + j);
        }
        ////console.log(i);
        console.log(row);
    }
}

function getBoardNum(){
    var boardNum;
    switch (currentBoard) {
        case 'a':
            boardNum = 0;
            break;
        case 'b':
            boardNum = 1;
            break;
        case 'c':
            boardNum = 2;
            break;
        default:
            // code
    }
    return boardNum;
}
function getIndexes(objClass){
    var boardNum = getBoardNum();

    switch (objClass) {
        case 'zz':
            return [boardNum,0,0];
            break;
        case 'zo':
            return [boardNum,0,1];
            break;        
        case 'zt':
            return [boardNum,0,2];
            break;  
        case 'oz':
            return [boardNum,1,0];
            break;
        case 'oo':
            return [boardNum,1,1];
            break;        
        case 'ot':
            return [boardNum,1,2];
            break;   
        case 'tz':
            return [boardNum,2,0];
            break;
        case 'to':
            return [boardNum,2,1];
            break;        
        case 'tt':
            return [boardNum,2,2];
            break;   
        default:
            // code
    }
}

function numToCharCell(num){
    switch (num) {
        case 0:
            return "z";
            break;
        case 1:
            return "o";
            break;
        case 2:
            return "t";
            break;
        default:
            // code
    }
}
function numToCharBoard(num){
    switch (num) {
        case 0:
            return "a";
            break;
        case 1:
            return "b";
            break;
        case 2:
            return "c";
            break;
        default:
            // code
    }
}

function charToNumBoard(char){
    switch (char) {
        case 'a':
            return 0;
            break;
        case 'b':
            return 1;
            break;
        case 'c':
            return 2;
            break;
        default:
            // code
    }    
}

$(".mybtn").click(function(){
   $("#dark").removeClass("fadeIn").addClass("fadeOut");
   $("#popup").removeClass("bounceIn").addClass("bounceOut");
   $("#popup").one("animationend", function(){
      $("#dark").css("display", "none");
      $("#popup").css("display", "none");
   });
   if($(this).attr("id") == "1p"){
       ai = true;
   }
});

$("#redo").click(function(){
   location.reload(); 
});
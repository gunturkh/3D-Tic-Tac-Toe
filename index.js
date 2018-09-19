var paths = [];      
      
// Everything in the bottom level (z=0)
paths[0] = [[0,0,0],[1,0,0],[2,0,0]];
paths[1] = [[0,1,0],[1,1,0],[2,1,0]];
paths[2] = [[0,2,0],[1,2,0],[2,2,0]];
paths[3] = [[0,0,0],[0,1,0],[0,2,0]];
paths[4] = [[1,0,0],[1,1,0],[1,2,0]];
paths[5] = [[2,0,0],[2,1,0],[2,2,0]];
paths[6] = [[0,0,0],[1,1,0],[2,2,0]];
paths[7] = [[2,0,0],[1,1,0],[0,2,0]];

// Everything in the middle level (z=1)
paths[8] = [[0,0,1],[1,0,1],[2,0,1]];
paths[9] = [[0,1,1],[1,1,1],[2,1,1]];
paths[10] = [[0,2,1],[1,2,1],[2,2,1]];
paths[11] = [[0,0,1],[0,1,1],[0,2,1]];
paths[12] = [[1,0,1],[1,1,1],[1,2,1]];
paths[13] = [[2,0,1],[2,1,1],[2,2,1]];
paths[14] = [[0,0,1],[1,1,1],[2,2,1]];
paths[15] = [[2,0,1],[1,1,1],[0,2,1]];

// Everything in the top layer (z=2)
paths[16] = [[0,0,2],[1,0,2],[2,0,2]];
paths[17] = [[0,1,2],[1,1,2],[2,1,2]];
paths[18] = [[0,2,2],[1,2,2],[2,2,2]];
paths[19] = [[0,0,2],[0,1,2],[0,2,2]];
paths[20] = [[1,0,2],[1,1,2],[1,2,2]];
paths[21] = [[2,0,2],[2,1,2],[2,2,2]];
paths[22] = [[0,0,2],[1,1,2],[2,2,2]];
paths[23] = [[2,0,2],[1,1,2],[0,2,2]];

// All the straight columns
paths[24] = [[0,0,0],[0,0,1],[0,0,2]];
paths[25] = [[1,0,0],[1,0,1],[1,0,2]];
paths[26] = [[2,0,0],[2,0,1],[2,0,2]];     
paths[27] = [[0,1,0],[0,1,1],[0,1,2]];
paths[28] = [[1,1,0],[1,1,1],[1,1,2]];
paths[29] = [[2,1,0],[2,1,1],[2,1,2]];      
paths[30] = [[0,2,0],[0,2,1],[0,2,2]];
paths[31] = [[1,2,0],[1,2,1],[1,2,2]];
paths[32] = [[2,2,0],[2,2,1],[2,2,2]];

// All the diagonal columns - back to front
paths[33] = [[0,0,0],[0,1,1],[0,2,2]];
paths[34] = [[1,0,0],[1,1,1],[1,2,2]];
paths[35] = [[2,0,0],[2,1,1],[2,2,2]];

// All the diagonal columns - front to back
paths[36] = [[0,2,0],[0,1,1],[0,0,2]];
paths[37] = [[1,2,0],[1,1,1],[1,0,2]];
paths[38] = [[2,2,0],[2,1,1],[2,0,2]];

// All the diagonal columns - left to right
paths[39] = [[0,0,0],[1,0,1],[2,0,2]];
paths[40] = [[0,1,0],[1,1,1],[2,1,2]];
paths[41] = [[0,2,0],[1,2,1],[2,2,2]];

// All the diagonal columns - right to left
paths[42] = [[2,0,0],[1,0,1],[0,0,2]];
paths[43] = [[2,1,0],[1,1,1],[0,1,2]];
paths[44] = [[2,2,0],[1,2,1],[0,2,2]];

// All the diagonal columns - corner to corner
paths[45] = [[0,0,0],[1,1,1],[2,2,2]];
paths[46] = [[0,2,0],[1,1,1],[2,0,2]];
paths[47] = [[2,0,0],[1,1,1],[0,2,2]];
paths[48] = [[2,2,0],[1,1,1],[0,0,2]];

function computeColor(x,y,z) {
  return this.grid.charAt((z*9)+(y*3)+x);
}

function changeColor(x,y,z,color) {
  var before = this.grid.substr(0,(z*9)+(y*3)+x);
  var after = this.grid.substr((z*9)+(y*3)+x + 1);
  this.grid = before + color + after;
}

function otherPlayerColor() {
  if (this.currentPlayer == "R") {
    return "B";
  } else {
    return "R";
  }
}

function changePlayer() {
  this.winner();
  this.stalemate();
  this.currentPlayer = this.otherPlayer();
}

function checkForWinner() {        
  for (var i=0; i < paths.length; i++) {
    
    var first = paths[i][0];
    var second = paths[i][1];
    var third = paths[i][2];
    
    if (this.color(first[0],first[1],first[2]) == this.color(second[0],second[1],second[2]) &&
    this.color(second[0],second[1],second[2]) == this.color(third[0],third[1],third[2]) &&
    this.color(first[0],first[1],first[2]) == this.color(third[0],third[1],third[2]) &&
    this.color(third[0],third[1],third[2]) == this.currentPlayer) {
      this.gameOver = true;
      console.log(`Paths : ${i}, First[0] : ${first[0]}, First[1] : ${first[1]}, First[2] : ${first[2]}, Color : ${this.color(first[0],first[1],first[2])}`);
      console.log(`Paths : ${i}, Second[0] : ${second[0]}, Second[1] : ${second[1]}, Second[2] : ${second[2]}, Color : ${this.color(second[0],second[1],second[2])} `);
      console.log(`Paths : ${i}, Third[0] : ${third[0]}, Third[1] : ${third[1]}, Third[2] : ${third[2]}, Color : ${this.color(third[0],third[1],third[2])}  `);
      
          $("#dialogDiv").removeAttr("style");
          if (this.currentPlayer == "R") {
            $("#dialogText").text("Red won the game!");
          } else {
            $("#dialogText").text("Blue won the game!");
          }                
          
          return true;
        }
  }        
  return false;        
}

function checkDraw() {
  var result =this.grid.indexOf("G") < 0;
  if (result) {
    this.gameOver = true;
    
    $("#dialogDiv").removeAttr("style");
    $("#dialogText").val("The game ended in a draw.");
  } 
  return result;
}

function board(input, player1, player2) {
  this.grid = input;
  this.currentPlayer = "R";
  this.player1 = player1;
  this.player2 = player2;
  
  this.gameOver = false;
  this.otherPlayer = otherPlayerColor;
  this.endTurn = changePlayer;
  this.color = computeColor;      
  this.setColor = changeColor;
  this.winner = checkForWinner;
  this.stalemate = checkDraw;
}

function drawCubeBottom(x, y, sides) {
  var canvas = document.getElementById("output");
  var context = canvas.getContext("2d");
  
  var gradient = context.createLinearGradient(0,0,0,360);
  gradient.addColorStop(0, "#000000");
  gradient.addColorStop(1, "grey");
  
  context.shadowBlur = 10;
  context.shadowColor = "black";
  
  context.fillStyle = gradient;  
  
  context.beginPath();
  
  context.moveTo(x,y);
  context.lineTo(x + (sides/2),y - (sides/2));
  context.lineTo(x + (sides/2) + sides,y - (sides/2));
  context.lineTo(x + sides,y);
  context.lineTo(x,y);
  
  context.closePath();
  context.fill();
  
  context.shadowBlur = 0;
}

function drawOuterCube(x, y, sides) {          
  var canvas = document.getElementById("output");
  var context = canvas.getContext("2d");
  
  context.beginPath();
               
  // draw the bottom panel
  context.moveTo(x-(sides/2),y+(sides/2));
  context.lineTo(x+(sides/2),y+(sides/2));
  context.lineTo(x+sides,y);
  context.lineTo(x,y);
  context.lineTo(x-(sides/2),y+(sides/2));
  context.closePath();               
  
  context.fill();
}

function drawInnerCube(x, y, sides, frontLight, frontDark, rightLight, rightDark, topLight, topDark) {
  var canvas = document.getElementById("output");
  var context = canvas.getContext("2d");        
  
  var front = context.createLinearGradient(x, y-sides, x, y);
  front.addColorStop(0, frontLight);
  front.addColorStop(1, frontDark);
            
  context.fillStyle = front;
  context.fillRect(x-(sides/2),y-(sides/2),sides,sides);                
  
  var top = context.createLinearGradient(x, y - sides, x + (sides * 1.5), y - (sides * 1.5));
  top.addColorStop(0, topDark);
  top.addColorStop(1, topLight);          
  
  context.fillStyle = top;
  context.beginPath();
  context.moveTo(x-(sides/2),y-(sides/2)); // front top left
  context.lineTo(x,y-(sides)); // top back left
  context.lineTo(x+sides,y-sides); // top back right
  context.lineTo(x+(sides/2),y-(sides/2)); // front top right
  context.lineTo(x-(sides/2),y-(sides/2)); // front top left
  context.closePath();
  context.fill();               
  
  var right = context.createLinearGradient(x + sides, y - (sides * 1.5), x + sides, y);
  right.addColorStop(0, rightLight);
  right.addColorStop(1, rightDark);
  
  context.fillStyle = right;
  context.beginPath();
  context.moveTo(x+(sides/2),y-(sides/2)); // front top right
  context.lineTo(x+sides,y-sides); // top back right
  context.lineTo(x+sides,y); // right back bottom
  context.lineTo(x+(sides/2),y+(sides/2)); // front bottom right
  context.lineTo(x+(sides/2),y-(sides/2)); // front top right
  context.closePath();
  context.fill();          
}
      
function draw(board, selectedX, selectedY, selectedZ) {
  if (selectedX === undefined) {
     selectedX = -1;
     selectedY = -1;
     selectedZ = -1;
  }         
  
  var canvas = document.getElementById("output");
  canvas.width = canvas.width;
  
  var context = canvas.getContext("2d");
  var gradient = context.createLinearGradient(0,0,0,360);
  gradient.addColorStop(0, "#888888");
  gradient.addColorStop(1, "#B0B0B0");
  
  context.shadowBlur = 10;
  context.shadowColor = "black";
  
  context.fillStyle = gradient;        
  drawOuterCube(160,320,240);   
  
  context.shadowBlur = 0;     
  
  var redFrontLight = "#FB0000";
  var redFrontDark = "#BB0000";        
  var redRightLight = "#FF4535";
  var redRightDark = "#D41201";        
  var redTopLight = "#FF5445";
  var redTopDark = "#FB0000";
  
  var blueFrontLight = "#0000D4";
  var blueFrontDark = "#000099";        
  var blueRightLight = "#2C2CD4";
  var blueRightDark = "#0000BA";        
  var blueTopLight = "#3E3ED6";
  var blueTopDark = "#0000D4";                        
  
  var sides = 80;
  var spacing = 6;
  var baseX = 160;
  var baseY = 320;
  for (x=0;x<=2;x++) {
    for (y=0;y<=2;y++) {
      for (z=0;z<=2;z++) {
        var color = board.color(x,y,z);
        var xOutline = baseX + (x * sides) - (y * (sides / 2)) - (sides / 2);
        var yOutline = baseY + (y * (sides/2)) - (z * sides) + (sides / 2);
        var xCoordinate = baseX + (spacing/2) + (x * sides) - (y * (sides / 2));
        var yCoordinate = baseY - spacing + (y * (sides/2)) - (z * sides);              
        
        if (x == selectedX && y == selectedY && z == 0) {
          drawCubeBottom(xOutline, yOutline, sides);
        }
        
        if (color == 'R') {                
          drawInnerCube(xCoordinate, yCoordinate, sides - (spacing * 2), redFrontLight, redFrontDark, redRightLight, redRightDark, redTopLight, redTopDark);                
        }
        if (color == 'B') {
          drawInnerCube(xCoordinate, yCoordinate, sides - (spacing * 2), blueFrontLight, blueFrontDark, blueRightLight, blueRightDark, blueTopLight, blueTopDark);
        }             
      }
    }
  }        
}

function pathStatus(board, first, second, third) {
  this.friendly = 0;
  this.neutral = 0;
  this.enemy = 0;
  if (board.color(first[0],first[1],first[2]) == board.currentPlayer) { this.friendly++; }
  if (board.color(first[0],first[1],first[2]) == "G") { this.neutral++; }
  if (board.color(first[0],first[1],first[2]) == board.otherPlayer()) { this.enemy++; }
  if (board.color(second[0],second[1],second[2]) == board.currentPlayer) { this.friendly++; }
  if (board.color(second[0],second[1],second[2]) == "G") { this.neutral++; }
  if (board.color(second[0],second[1],second[2]) == board.otherPlayer()) { this.enemy++; }
  if (board.color(third[0],third[1],third[2]) == board.currentPlayer) { this.friendly++; }
  if (board.color(third[0],third[1],third[2]) == "G") { this.neutral++; }
  if (board.color(third[0],third[1],third[2]) == board.otherPlayer()) { this.enemy++; }
}

function divide ( numerator, denominator ) {
  var remainder = numerator % denominator;
  var quotient = ( numerator - remainder ) / denominator;
  
  return quotient;
}

function move(x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function doComputerMove(board) {        
  
  var priorities = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  if (!updatePrioritiesForWinning(board, priorities)) {
    if (!updatePrioritiesForBlockingOpponentFromWinning(board, priorities)) {
      updatePrioritesForWinningAndBlockingPaths(board, priorities);  
    }
  }        
  
  var maximum = -1;
  for (var i=0; i < priorities.length; i++) {
    if (priorities[i] > maximum) {
      maximum = priorities[i];
    }
  }        
  
  // More than one entry could have the maximum priority
  var entriesContainingTheMaximumPriority = [];
  for (var i=0; i < priorities.length; i++) {
    if (priorities[i] == maximum) {
      entriesContainingTheMaximumPriority.push(i);
    }
  }                
  
  var indexOfChosenPlay = Math.floor(Math.random() * entriesContainingTheMaximumPriority.length);
  var chosenPlay = entriesContainingTheMaximumPriority[indexOfChosenPlay];        
  
  var z = divide(chosenPlay,9);                
  var y = divide(chosenPlay - (z*9),3);
  var x = chosenPlay % 3;                
  
  board.setColor(x,y,z,board.currentPlayer);
  return new move(x,y,z);
} 

function updatePrioritiesForWinning(board, priorities) {
  for (var i=0; i < paths.length; i++) {
    var first = paths[i][0];
    var second = paths[i][1];
    var third = paths[i][2];
    
    var path = new pathStatus(board, first, second, third);                    
    if (path.friendly == 2 && path.neutral == 1) {
      if (board.color(first[0],first[1],first[2]) == "G") { priorities[first[0] + (first[1]*3) + (first[2]*9)]++; }
      if (board.color(second[0],second[1],second[2]) == "G") { priorities[second[0] + (second[1]*3) + (second[2]*9)]++; }
      if (board.color(third[0],third[1],third[2]) == "G") { priorities[third[0] + (third[1]*3) + (third[2]*9)]++; }
      return true;
    }
  }
  return false;
}     

function updatePrioritiesForBlockingOpponentFromWinning(board, priorities) {
  for (var i=0; i < paths.length; i++) {
    var first = paths[i][0];
    var second = paths[i][1];
    var third = paths[i][2];
    
    var path = new pathStatus(board, first, second, third);
    if (path.enemy == 2 && path.neutral == 1) {
      if (board.color(first[0],first[1],first[2]) == "G") { priorities[first[0] + (first[1]*3) + (first[2]*9)]++; }
      if (board.color(second[0],second[1],second[2]) == "G") { priorities[second[0] + (second[1]*3) + (second[2]*9)]++; }
      if (board.color(third[0],third[1],third[2]) == "G") { priorities[third[0] + (third[1]*3) + (third[2]*9)]++; }
      return true;
    } 
  }
  return false;
}

function updatePrioritesForWinningAndBlockingPaths(board, priorities) {
  for (var i=0; i < paths.length; i++) {
    var first = paths[i][0];
    var second = paths[i][1];
    var third = paths[i][2];
    
    var path = new pathStatus(board, first, second, third);
    if (path.neutral == 2) {
      if (board.color(first[0],first[1],first[2]) == "G") { priorities[first[0] + (first[1]*3) + (first[2]*9)]++; }
      if (board.color(second[0],second[1],second[2]) == "G") { priorities[second[0] + (second[1]*3) + (second[2]*9)]++; }
      if (board.color(third[0],third[1],third[2]) == "G") { priorities[third[0] + (third[1]*3) + (third[2]*9)]++; }
    }
  }
}

function pcVsPc(board) {
  if (!board.gameOver) {        
    var move = doComputerMove(board);
    var selector = "div[boardx='" + move.x + "'][boardy='" + move.y + "'][boardz='" + move.z + "']";
    $(selector).addClass(board.currentPlayer);                
    draw(board);          
  }  
  
  if (!board.gameOver) {
    board.endTurn();
    setTimeout(function() { pcVsPc(board) },1000);
  }
}

function startNewGame() {
  $("#dialogDiv").attr("style", "display:none");
  
  var player1 = $("#player1").children("div").html().toLowerCase();
  var player2 = $("#player2").children("div").html().toLowerCase();
  var newBoard = new board("GGGGGGGGGGGGGGGGGGGGGGGGGGG", player1, player2);
  $(".tile").removeClass("R");
  $(".tile").removeClass("B");
  draw(newBoard);                
              
  if (newBoard.player1 == "computer" && newBoard.player2 == "computer") {
    setTimeout(function() { pcVsPc(newBoard) },1000); 
  } else if (newBoard.player1 == "computer") {
    var move = doComputerMove(newBoard);
    var selector = "div[boardx='" + move.x + "'][boardy='" + move.y + "'][boardz='" + move.z + "']";
    $(selector).addClass(newBoard.currentPlayer);        
    draw(newBoard);
    newBoard.endTurn();            
  }
  
  return newBoard;
}

jQuery(function() {
                        
  var currentBoard = startNewGame();
  
  $(".tile").hover(
    function() {
      if (!currentBoard.gameOver) {
        var x = parseInt($(this).attr("boardx"));
        var y = parseInt($(this).attr("boardy"));
        var z = parseInt($(this).attr("boardz"));
        
        var tempBoard = new board(currentBoard.grid, currentBoard.player1, currentBoard.player2);
        if (currentBoard.color(x,y,z) == 'G') {                          
          tempBoard.setColor(x,y,z,currentBoard.currentPlayer);              
        } 
        draw(tempBoard, x, y, z);    
      }       
    },
    function() {
      if (!currentBoard.gameOver) {
        draw(currentBoard);
      }
    } 
  );    
  
  $(".tile").click(function() { 
    if (!currentBoard.gameOver) {                    
      var x = parseInt($(this).attr("boardx"));
      var y = parseInt($(this).attr("boardy"));
      var z = parseInt($(this).attr("boardz"));
      
      if (currentBoard.color(x,y,z) == 'G') {            
        $(this).addClass(currentBoard.currentPlayer);
        
        currentBoard.setColor(x,y,z,currentBoard.currentPlayer);
        draw(currentBoard);
        
        if (currentBoard.winner() || currentBoard.stalemate()) {
          //alert("finished");
        } else {
          currentBoard.endTurn();         
          if ((currentBoard.currentPlayer == 'R' && currentBoard.player1 == "computer") ||
              (currentBoard.currentPlayer == 'B' && currentBoard.player2 == "computer")) {
                var move = doComputerMove(currentBoard);
                var selector = "div[boardx='" + move.x + "'][boardy='" + move.y + "'][boardz='" + move.z + "']";
                $(selector).addClass(currentBoard.currentPlayer);
                currentBoard.endTurn();
                draw(currentBoard);
              }                                         
        }                        
      }
    }
  });
  
  $("li.option").click(function() {
    $(this).parent().siblings("div").html($(this).text());
    currentBoard.gameOver = true;
    currentBoard = startNewGame();
  });
  
  $("#newGameButton").click(function() {
    currentBoard = startNewGame();
    return false;
  });                      
});
let paths = [];      
      
//Bottom level (z=0)
paths[0] = [[0,0,0],[1,0,0],[2,0,0]];
paths[1] = [[0,1,0],[1,1,0],[2,1,0]];
paths[2] = [[0,2,0],[1,2,0],[2,2,0]];
paths[3] = [[0,0,0],[0,1,0],[0,2,0]];
paths[4] = [[1,0,0],[1,1,0],[1,2,0]];
paths[5] = [[2,0,0],[2,1,0],[2,2,0]];
paths[6] = [[0,0,0],[1,1,0],[2,2,0]];
paths[7] = [[2,0,0],[1,1,0],[0,2,0]];

//Middle level (z=1)
paths[8] = [[0,0,1],[1,0,1],[2,0,1]];
paths[9] = [[0,1,1],[1,1,1],[2,1,1]];
paths[10] = [[0,2,1],[1,2,1],[2,2,1]];
paths[11] = [[0,0,1],[0,1,1],[0,2,1]];
paths[12] = [[1,0,1],[1,1,1],[1,2,1]];
paths[13] = [[2,0,1],[2,1,1],[2,2,1]];
paths[14] = [[0,0,1],[1,1,1],[2,2,1]];
paths[15] = [[2,0,1],[1,1,1],[0,2,1]];

//Top level (z=2)
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
  let before = this.grid.substr(0,(z*9)+(y*3)+x);
  let after = this.grid.substr((z*9)+(y*3)+x + 1);
  this.grid = before + color + after;
}

function otherPlayerColor() {
  if (this.currentPlayer == "B") {
    return "W";
  } else {
    return "B";
  }
}

function changePlayer() {
  this.winner();
  this.stalemate();
  this.currentPlayer = this.otherPlayer();
}

function checkForWinner() {        
  for (let i=0; i < paths.length; i++) {
    
    let first = paths[i][0];
    let second = paths[i][1];
    let third = paths[i][2];
    
    if (this.color(first[0],first[1],first[2]) == this.color(second[0],second[1],second[2]) &&
    this.color(second[0],second[1],second[2]) == this.color(third[0],third[1],third[2]) &&
    this.color(first[0],first[1],first[2]) == this.color(third[0],third[1],third[2]) &&
    this.color(third[0],third[1],third[2]) == this.currentPlayer) {
      this.gameOver = true;
      console.log(`Paths : ${i}, First[0] : ${first[0]}, First[1] : ${first[1]}, First[2] : ${first[2]}, Color : ${this.color(first[0],first[1],first[2])}`);
      console.log(`Paths : ${i}, Second[0] : ${second[0]}, Second[1] : ${second[1]}, Second[2] : ${second[2]}, Color : ${this.color(second[0],second[1],second[2])} `);
      console.log(`Paths : ${i}, Third[0] : ${third[0]}, Third[1] : ${third[1]}, Third[2] : ${third[2]}, Color : ${this.color(third[0],third[1],third[2])}  `);
      
          $("#dialogDiv").removeAttr("style");
          if (this.currentPlayer == "B") {
            $("#dialogText").text("Black won the game!");
          } else {
            $("#dialogText").text("White won the game!");
          }                
          
          return true;
        }
  }        
  return false;        
}

function checkDraw() {
  let result =this.grid.indexOf("G") < 0;
  if (result) {
    this.gameOver = true;
    
    $("#dialogDiv").removeAttr("style");
    $("#dialogText").val("The game ended in a draw.");
  } 
  return result;
}

function board(input, player1, player2) {
  this.grid = input;
  this.currentPlayer = "B";
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
  let canvas = document.getElementById("output");
  let context = canvas.getContext("2d");
  
  let gradient = context.createLinearGradient(0,0,0,360);
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
  let canvas = document.getElementById("output");
  let context = canvas.getContext("2d");
  
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
  let canvas = document.getElementById("output");
  let context = canvas.getContext("2d");        
  
  let front = context.createLinearGradient(x, y-sides, x, y);
  front.addColorStop(0, frontLight);
  front.addColorStop(1, frontDark);
            
  context.fillStyle = front;
  context.fillRect(x-(sides/2),y-(sides/2),sides,sides);                
  
  let top = context.createLinearGradient(x, y - sides, x + (sides * 1.5), y - (sides * 1.5));
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
  
  let right = context.createLinearGradient(x + sides, y - (sides * 1.5), x + sides, y);
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
  
  let canvas = document.getElementById("output");
  canvas.width = canvas.width;
  
  let context = canvas.getContext("2d");
  let gradient = context.createLinearGradient(0,0,0,360);
  gradient.addColorStop(0, "#000000");
  gradient.addColorStop(1, "#2d2d2d");
  
  context.shadowBlur = 10;
  context.shadowColor = "black";
  
  context.fillStyle = gradient;        
  drawOuterCube(160,320,240);   
  
  context.shadowBlur = 0;     
  
  let blackFrontLight = "#2d3d56";
  let blackFrontDark = "#192230";        
  let blackRightLight = "#283851";
  let blackRightDark = "#1f2c42";        
  let blackTopLight = "#394966";
  let blackTopDark = "#2e3a51";
  
  let whiteFrontLight = "#e0e2e5";
  let whiteFrontDark = "#d4d6d8";        
  let whiteRightLight = "#c9d1d8";
  let whiteRightDark = "#c2c8ce";        
  let whiteTopLight = "#d9dee2";
  let whiteTopDark = "#d2d7db";                        
  
  let sides = 80;
  let spacing = 6;
  let baseX = 160;
  let baseY = 320;
  for (x=0;x<=2;x++) {
    for (y=0;y<=2;y++) {
      for (z=0;z<=2;z++) {
        let color = board.color(x,y,z);
        let xOutline = baseX + (x * sides) - (y * (sides / 2)) - (sides / 2);
        let yOutline = baseY + (y * (sides/2)) - (z * sides) + (sides / 2);
        let xCoordinate = baseX + (spacing/2) + (x * sides) - (y * (sides / 2));
        let yCoordinate = baseY - spacing + (y * (sides/2)) - (z * sides);              
        
        if (x == selectedX && y == selectedY && z == 0) {
          drawCubeBottom(xOutline, yOutline, sides);
        }
        
        if (color == 'B') {                
          drawInnerCube(xCoordinate, yCoordinate, sides - (spacing * 2), blackFrontLight, blackFrontDark, blackRightLight, blackRightDark, blackTopLight, blackTopDark);                
        }
        if (color == 'W') {
          drawInnerCube(xCoordinate, yCoordinate, sides - (spacing * 2), whiteFrontLight, whiteFrontDark, whiteRightLight, whiteRightDark, whiteTopLight, whiteTopDark);
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
  let remainder = numerator % denominator;
  let quotient = ( numerator - remainder ) / denominator;
  
  return quotient;
}

function move(x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function doComputerMove(board) {        
  
  let priorities = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  if (!updatePrioritiesForWinning(board, priorities)) {
    if (!updatePrioritiesForBlockingOpponentFromWinning(board, priorities)) {
      updatePrioritesForWinningAndBlockingPaths(board, priorities);  
    }
  }        
  
  let maximum = -1;
  for (let i=0; i < priorities.length; i++) {
    if (priorities[i] > maximum) {
      maximum = priorities[i];
    }
  }        
  
  // More than one entry could have the maximum priority
  let entriesContainingTheMaximumPriority = [];
  for (let i=0; i < priorities.length; i++) {
    if (priorities[i] == maximum) {
      entriesContainingTheMaximumPriority.push(i);
    }
  }                
  
  let indexOfChosenPlay = Math.floor(Math.random() * entriesContainingTheMaximumPriority.length);
  let chosenPlay = entriesContainingTheMaximumPriority[indexOfChosenPlay];        
  
  let z = divide(chosenPlay,9);                
  let y = divide(chosenPlay - (z*9),3);
  let x = chosenPlay % 3;                
  
  board.setColor(x,y,z,board.currentPlayer);
  return new move(x,y,z);
} 

function updatePrioritiesForWinning(board, priorities) {
  for (let i=0; i < paths.length; i++) {
    let first = paths[i][0];
    let second = paths[i][1];
    let third = paths[i][2];
    
    let path = new pathStatus(board, first, second, third);                    
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
  for (let i=0; i < paths.length; i++) {
    let first = paths[i][0];
    let second = paths[i][1];
    let third = paths[i][2];
    
    let path = new pathStatus(board, first, second, third);
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
  for (let i=0; i < paths.length; i++) {
    let first = paths[i][0];
    let second = paths[i][1];
    let third = paths[i][2];
    
    let path = new pathStatus(board, first, second, third);
    if (path.neutral == 2) {
      if (board.color(first[0],first[1],first[2]) == "G") { priorities[first[0] + (first[1]*3) + (first[2]*9)]++; }
      if (board.color(second[0],second[1],second[2]) == "G") { priorities[second[0] + (second[1]*3) + (second[2]*9)]++; }
      if (board.color(third[0],third[1],third[2]) == "G") { priorities[third[0] + (third[1]*3) + (third[2]*9)]++; }
    }
  }
}

function pcVsPc(board) {
  if (!board.gameOver) {        
    let move = doComputerMove(board);
    let selector = "div[boardx='" + move.x + "'][boardy='" + move.y + "'][boardz='" + move.z + "']";
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
  
  let player1 = $("#player1").children("div").html().toLowerCase();
  let player2 = $("#player2").children("div").html().toLowerCase();
  let newBoard = new board("GGGGGGGGGGGGGGGGGGGGGGGGGGG", player1, player2);
  $(".tile").removeClass("B");
  $(".tile").removeClass("W");
  draw(newBoard);                
              
  if (newBoard.player1 == "computer" && newBoard.player2 == "computer") {
    setTimeout(function() { pcVsPc(newBoard) },1000); 
  } else if (newBoard.player1 == "computer") {
    let move = doComputerMove(newBoard);
    let selector = "div[boardx='" + move.x + "'][boardy='" + move.y + "'][boardz='" + move.z + "']";
    $(selector).addClass(newBoard.currentPlayer);        
    draw(newBoard);
    newBoard.endTurn();            
  }
  
  return newBoard;
}

jQuery(()=> {
                        
  let currentBoard = startNewGame();
  
  $(".tile").hover(
    function() {
      if (!currentBoard.gameOver) {
        let x = parseInt($(this).attr("boardx"));
        let y = parseInt($(this).attr("boardy"));
        let z = parseInt($(this).attr("boardz"));
        
        let tempBoard = new board(currentBoard.grid, currentBoard.player1, currentBoard.player2);
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
      let x = parseInt($(this).attr("boardx"));
      let y = parseInt($(this).attr("boardy"));
      let z = parseInt($(this).attr("boardz"));
      
      if (currentBoard.color(x,y,z) == 'G') {            
        $(this).addClass(currentBoard.currentPlayer);
        
        currentBoard.setColor(x,y,z,currentBoard.currentPlayer);
        draw(currentBoard);
        
        if (currentBoard.winner() || currentBoard.stalemate()) {
        } else {
          currentBoard.endTurn();         
          if ((currentBoard.currentPlayer == 'B' && currentBoard.player1 == "computer") ||
              (currentBoard.currentPlayer == 'W' && currentBoard.player2 == "computer")) {
                let move = doComputerMove(currentBoard);
                let selector = "div[boardx='" + move.x + "'][boardy='" + move.y + "'][boardz='" + move.z + "']";
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
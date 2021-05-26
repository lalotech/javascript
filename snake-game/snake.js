/***********************************************
 *   SNAKE V 1.1.0 - 2021 Mexico City
 ***********************************************/
var canvas = document.getElementById("game-panel");
document.addEventListener("keypress", onPressKey);
document.addEventListener("keydown", onPressKey);
var ctx = canvas.getContext("2d");
var txS = document.getElementById("txScore");
var txSpeed = document.getElementById("txSpeed");

var ch = 400;
var cw = 480;

var options = {
  player2: { color: "#2A55FF" },
};
var frameSpeed = 200;
var snakeWidth = 10;
var snakeSpace = 1;
var direction = 4; // 1,2,3,4 WASD controls
var startSnakeSize = 3; //snake length
canvas.width = cw;
canvas.height = ch;
var spx = cw / 2;
var spy = ch / 2;
var nsn = undefined;

var pause = false;
var crash = false;
var crossMode = true;
var player2Enable = false;

var speed = 0;
var snakes = [];
var ctl_wasd = [119, 97, 115, 100];
var ctl_arrows = [38, 37, 40, 39];

const GAME_OVER_TEXT = "Game over!";
const PAUSE_TEXT = "Pause!";

/***********************************************
 *   START
 ***********************************************/
init();
buildNewSlotSnake();

var frameint = setInterval(function () {
  frame();
}, frameSpeed);

function frame() {
  if (!pause) {
    if (!crash) {
      checkEat();
      checkCollision();
      drawBackground();
      for (const snake of snakes) {
        snake.draw();
      }
      drawNewSlotSnake();
      //txS.innerHTML = sn.length;
      txSpeed.innerHTML = Math.ceil(5000 / frameSpeed);
    } else {
      drawTextOver(GAME_OVER_TEXT);
    }
  } else {
    drawTextOver(PAUSE_TEXT);
  }

  //CROSS MODE
  if (crossMode) {
    crossMode();
  }
}

/***********************************************
 *   UTIL
 ***********************************************/

function resetFrame() {
  window.clearInterval(frameint);
  frameint = setInterval(function () {
    frame();
  }, frameSpeed);
}

function init() {
  snakes = [];

  //snake positions
  spx = cw / 2;
  spy = ch / 2;

  //player 1
  snakes.push(new Snake("#00FF00", ctl_wasd, spx, spy));

  //player 2
  if (player2Enable) {
    snakes.push(new Snake("#2A55FF", ctl_arrows, spx, spy + 20));
  }

  nsn = undefined;
  buildNewSlotSnake();
  crash = false;
}

function checkCollision() {
  for (const snake of snakes) {
    for (var i = 1; i < snake.cells.length; i++) {
      if (
        snake.cells[0][0] == snake.cells[i][0] &&
        snake.cells[0][1] == snake.cells[i][1]
      ) {
        console.log("crash!!");
        crash = true;
        //drawGameOver();
        //window.clearInterval(frameint);
      }
    }
  }
}

function checkEat() {
  for (const snake of snakes) {
    if (
      (nsn[0] == snake.cells[0][0] && nsn[1] == snake.cells[0][1]) ||
      (nsn[0] == snake.cells[1][0] && nsn[1] == snake.cells[1][1])
    ) {
      //nsn[4] = sn[sn.length-1][4];
      var n = JSON.parse(JSON.stringify(snake.cells[snake.cells.length - 1]));
      switch (n[4]) {
        case 4:
          n[0] = n[0] - snakeWidth;
          break;
        case 3:
          n[1] = n[1] - snakeWidth;
          break;
        case 2:
          n[0] = n[0] + snakeWidth;
          break;
        case 1:
          n[1] = n[1] + snakeWidth;
          break;
      }
      snake.cells.push(n);
      buildNewSlotSnake();
    }
    //console.log(JSON.stringify(sn));
  }
}

function buildSnake(size, x, y) {
  var b = [];
  for (var i = 0; i < size; i++) {
    //sn[i] = [snakeWidth*i*-1+spx-snakeSpace*i,spy,snakeWidth,snakeWidth,4]; // direction right
    b[i] = [snakeWidth * i * -1 + x, y, snakeWidth, snakeWidth, 4]; // direction right
  }
  //console.log(sn);
  return b;
}

function buildNewSlotSnake() {
  var rand_x =
    Math.ceil((Math.random() * cw) / snakeWidth) * snakeWidth - snakeWidth;
  var rand_y =
    Math.ceil((Math.random() * ch) / snakeWidth) * snakeWidth - snakeWidth;
  if (
    rand_x != 0 &&
    rand_x != cw - snakeWidth &&
    rand_y != 0 &&
    rand_y != ch - snakeWidth
  ) {
    //console.log("new snake: " + rand_x + "," + rand_y);
    nsn = [rand_x, rand_y, snakeWidth, snakeWidth, 4];
  } else {
    buildNewSlotSnake();
  }
  //nsn = [390, 390, snakeWidth, snakeWidth, 4];
}

var crossMode = function () {
  for (const snake of snakes) {
    for (const cell of snake.cells) {
      if (cell[0] == cw - snakeWidth && cell[4] == 4) {
        //right
        cell[0] = -snakeWidth;
      } else if (cell[1] == ch - snakeWidth && cell[4] == 3) {
        //buttom
        cell[1] = -snakeWidth;
      } else if (cell[0] == 0 && cell[4] == 2) {
        //left
        cell[0] = cw;
      } else if (cell[1] == 0 && cell[4] == 1) {
        //top
        cell[1] = ch;
      }
    }
  }
};

/***********************************************
 *   EVENTS
 ***********************************************/

function onUpSpeed() {
  if (frameSpeed > 10) {
    frameSpeed = frameSpeed - 10;
    resetFrame();
  }
  //console.log(frameSpeed);
}

function onDownSpeed() {
  frameSpeed = frameSpeed + 10;
  resetFrame();
}

function onRandom() {
  nsn = undefined;
  buildNewSlotSnake();
}

function onReset() {
  //console.log("reset call");
  init();
  frameSpeed = 200;
  resetFrame();
}

function onPause() {
  pause = !pause;
}

function onPressKey(evt) {
  //console.log(evt);
  for (i in snakes) {
    snakes[i].control(evt);
  }
}
// WASD - [119,97,115,100]
// TLRB - [38,37,40,39]

/***********************************************
 *   MODEL
 ***********************************************/
function Snake(color, keys, x, y) {
  this.x;
  this.y;
  this.cells = buildSnake(startSnakeSize, x, y);
  this.color = color;
  this.keys = keys;
  this.control = function (evt) {
    if (evt.keyCode == this.keys[0]) {
      // - W
      if (this.cells[0][4] != 3) this.cells[0][4] = 1;
    } else if (evt.keyCode == this.keys[1]) {
      // - A
      if (this.cells[0][4] != 4) this.cells[0][4] = 2;
    } else if (evt.keyCode == this.keys[2]) {
      // - S
      if (this.cells[0][4] != 1) this.cells[0][4] = 3;
    } else if (evt.keyCode == this.keys[3]) {
      // - D
      if (this.cells[0][4] != 2) this.cells[0][4] = 4;
    }
  };
  this.draw = function () {
    ctx.fillStyle = color;
    for (i in this.cells) {
      //console.log(sn[i][4]);
      switch (this.cells[i][4]) {
        case 4:
          this.cells[i][0] = this.cells[i][0] + snakeWidth;
          break;
        case 3:
          this.cells[i][1] = this.cells[i][1] + snakeWidth;
          break;
        case 2:
          this.cells[i][0] = this.cells[i][0] - snakeWidth;
          break;
        case 1:
          this.cells[i][1] = this.cells[i][1] - snakeWidth;
          break;
      }
      ctx.fillRect(
        this.cells[i][0],
        this.cells[i][1],
        snakeWidth - snakeSpace,
        snakeWidth - snakeSpace
      );
    }
    for (var j = this.cells.length - 1; j > 0; j--) {
      if (this.cells[j][4] != this.cells[j - 1][4]) {
        this.cells[j][4] = this.cells[j - 1][4];
      }
    }
  };
  return this;
}

/***********************************************
 *   DRAW
 ***********************************************/

function drawNewSlotSnake() {
  ctx.fillStyle = "#FF002A";
  ctx.fillRect(nsn[0], nsn[1], snakeWidth, snakeWidth);
}

function drawTextOver(text) {
  ctx.fillStyle = "#FF002A";
  ctx.font = "50px Georgia";
  ctx.fillText(text, cw / 2 - cw / 2 / 2, cw / 2 - 30);
}

function drawBackground() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, cw, ch);
}

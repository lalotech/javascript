/***********************************************
 *   SNAKE V 1.0.0 - 2020 Mexico City
 ***********************************************/
var canvas = document.getElementById('game-panel');
document.addEventListener("keypress", onPressKey);
var ctx = canvas.getContext('2d');
var txS = document.getElementById('txScore');
var txSpeed = document.getElementById('txSpeed');

var ch = 400;
var cw = 480;

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
var speed = 0;

/***********************************************
 *   START
 ***********************************************/
init();
buildNewSnake();

var frameint = setInterval(function() {
    frame();
}, frameSpeed);

function frame() {

    if (!pause) {
        if (!crash) {
            checkEat();
            checkCollision();
            drawBackground();
            drawSnake();
            drawNewSnake();
            txS.innerHTML = sn.length;
            txSpeed.innerHTML = Math.ceil(5000 / frameSpeed);
        } else {
            drawGameOver();
        }

    }

    //CROSS MODE
    for (i in sn) {
        if (sn[i][0] == cw - snakeWidth && sn[i][4] == 4) { //right
            sn[i][0] = -snakeWidth;
        } else if (sn[i][1] == ch - snakeWidth && sn[i][4] == 3) { //buttom
            sn[i][1] = -snakeWidth;
        } else if (sn[i][0] == 0 && sn[i][4] == 2) { //left
            sn[i][0] = cw;
        } else if (sn[i][1] == 0 && sn[i][4] == 1) { //top
            sn[i][1] = ch;
        }
    }
}

/***********************************************
 *   UTIL
 ***********************************************/

function resetFrame() {
    window.clearInterval(frameint);
    frameint = setInterval(function() {
        frame();
    }, frameSpeed);
}

function init() {
    //snake positions        
    spx = cw / 2;
    spy = ch / 2;

    sn = buildSnake(startSnakeSize);
    nsn = undefined;
    buildNewSnake();
    crash = false;
}

function checkCollision() {
    for (var i = 1; i < sn.length; i++) {
        if (sn[0][0] == sn[i][0] && sn[0][1] == sn[i][1]) {
            console.log("crash!!");
            crash = true;
            //drawGameOver();
            //window.clearInterval(frameint);
        }
    }
}

function checkEat() {
    if (nsn[0] == sn[0][0] && nsn[1] == sn[0][1] ||
        nsn[0] == sn[1][0] && nsn[1] == sn[1][1]
    ) {
        //nsn[4] = sn[sn.length-1][4];
        var n = JSON.parse(JSON.stringify(sn[sn.length - 1]));
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
        sn.push(n);
        buildNewSnake();
    }
    //console.log(JSON.stringify(sn));
}


function buildSnake(size) {
    var sn = [];
    for (var i = 0; i < size; i++) {
        //sn[i] = [snakeWidth*i*-1+spx-snakeSpace*i,spy,snakeWidth,snakeWidth,4]; // direction right
        sn[i] = [snakeWidth * i * -1 + spx, spy, snakeWidth, snakeWidth, 4]; // direction right
    }
    //console.log(sn);
    return sn;
}

function buildNewSnake() {
    var rand_x = Math.ceil(Math.random() * cw / snakeWidth) * snakeWidth - snakeWidth;
    var rand_y = Math.ceil(Math.random() * ch / snakeWidth) * snakeWidth - snakeWidth;
    if (rand_x != 0 && rand_x != cw - snakeWidth &&
        rand_y != 0 && rand_y != ch - snakeWidth) {
        console.log("new snake: " + rand_x + "," + rand_y);
        nsn = [rand_x, rand_y, snakeWidth, snakeWidth, 4];
    } else {
        buildNewSnake();
    }
    //nsn = [390, 390, snakeWidth, snakeWidth, 4];
}

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
    buildNewSnake();
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
    if (evt.keyCode == 119) { // - W
        if (sn[0][4] != 3)
            sn[0][4] = 1;
    } else if (evt.keyCode == 97) { // - A
        if (sn[0][4] != 4)
            sn[0][4] = 2;
    } else if (evt.keyCode == 115) { // - S
        if (sn[0][4] != 1)
            sn[0][4] = 3;
    } else if (evt.keyCode == 100) { // - D
        if (sn[0][4] != 2)
            sn[0][4] = 4;
    }
}

/***********************************************
 *   DRAW
 ***********************************************/

function drawNewSnake() {
    ctx.fillStyle = "#FF002A";
    ctx.fillRect(nsn[0], nsn[1], snakeWidth, snakeWidth);
}

function drawSnake() {
    ctx.fillStyle = "#00FF00";
    //console.log(JSON.stringify(sn));
    //console.log(sn[0][0]+","+sn[0][1]);

    //just draw
    for (i in sn) {
        //console.log(sn[i][4]);                
        switch (sn[i][4]) {
            case 4:
                sn[i][0] = sn[i][0] + snakeWidth;
                break;
            case 3:
                sn[i][1] = sn[i][1] + snakeWidth;
                break;
            case 2:
                sn[i][0] = sn[i][0] - snakeWidth;
                break;
            case 1:
                sn[i][1] = sn[i][1] - snakeWidth;
                break;
        }
        ctx.fillRect(sn[i][0], sn[i][1], snakeWidth - snakeSpace, snakeWidth - snakeSpace);
    }
    for (var j = sn.length - 1; j > 0; j--) {
        if (sn[j][4] != sn[j - 1][4]) {
            sn[j][4] = sn[j - 1][4];
        }
    }
}

function drawGameOver() {
    ctx.fillStyle = "#FF002A";
    ctx.font = "50px Georgia";
    ctx.fillText("Game over!", cw / 2 - (cw / 2) / 2, cw / 2 - 30);
}

function drawBackground() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cw, ch);
}
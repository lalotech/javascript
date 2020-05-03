var cvs = document.getElementById('title-panel');
var ctx2 = cvs.getContext('2d');

ctx2.fillStyle = "#000000";
ctx2.fillRect(0, 0, 400, 200);

/*setTimeout(function(){
    console.log("asdas");
}),0;*/
var space=1;
var squareSize=9;
var digitMargin=10;

drawS();
drawN();
drawA();
drawK();
drawE();

function drawE(){
    drawLine(280,0,6);
    drawLine(280,40,4);
    drawLine(280,80,6);
    drawColumn(280,0,9);
}

function drawK(){
    drawColumn(220,0,9);
    drawPolylineDoubleLeft(257,0,3);
    drawPolylineDoubleRight(237,35,3);
}

function drawA(){
    drawPolylineDoubleLeft(170,0,5);
    drawPolylineDoubleRight(170,0,5);
    drawLine(150,50,5);
}

function drawN(){        
    drawColumn(70,0,9);
    drawPolylineDoubleRight(80,0,5);
    drawColumn(118,2,9);
}

function drawS(){
    drawLine(0,0,6);
    drawLine(0,40,6);
    drawLine(0,80,6);    
    drawColumn(0,0,4);
    drawColumn(50,50,4);
}
function drawPolylineDoubleLeft(x,y,s){
    ctx2.fillStyle = "#00FF00"; //green
    for(var i=0;i<s;i++){
        drawColumn(x-i*squareSize,y+i*(squareSize*2),2);
    }
}
function drawPolylineDoubleRight(x,y,s){
    ctx2.fillStyle = "#00FF00"; //green
    for(var i=0;i<s;i++){
        drawColumn(x+i*squareSize,y+i*(squareSize*2),2);
    }
}
function drawPolyline(x,y,s){
    ctx2.fillStyle = "#00FF00"; //green
    for(var i=0;i<s;i++){
        ctx2.fillRect(squareSize*i+digitMargin+x+i*space,squareSize*i+digitMargin+y+i*space,squareSize,squareSize);
    }
}
function drawLine(x,y,size){    
    ctx2.fillStyle = "#00FF00"; //green
    for(var i=0;i<size;i++){
        ctx2.fillRect(squareSize*i+digitMargin+x+i*space,digitMargin+y,squareSize,squareSize);
    }
}
function drawColumn(x,y,size){    
    ctx2.fillStyle = "#00FF00"; //green
    for(var i=0;i<size;i++){
        ctx2.fillRect(digitMargin+x,squareSize*i+digitMargin+y+i*space,squareSize,squareSize);
    }
}
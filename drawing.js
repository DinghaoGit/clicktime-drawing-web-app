/**
 * Created by dinghaoli on 11/25/16.
 */
var context = document.getElementById('myCanvas').getContext("2d");
var clickX = [];
var clickY = [];
var clickDrag = [];
var clickColor = [];
var drawing = false;
var userColor = '#' + Math.random().toString(16).substr(-6);

// Saves x and y mouse coordinates
function addClick(x, y, dragging, color) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(color);
}

// Each time this function is called,
// the canvas will be cleared and everything will be redrawn.
function redraw() {
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }
        else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.stroke();
    }
}

$("#myCanvas").mousedown(function(e) {
    drawing = true;

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    // send a msg to server to broadcast it to all other users in the room
    socket.emit('message', JSON.stringify({
        x: mouseX,
        y: mouseY,
        drag: false,
        color: userColor
    }));

    addClick(mouseX, mouseY, false, userColor);
    redraw();
});

$("#myCanvas").mouseup(function(e) {
    drawing = false;
});

$("#myCanvas").mousemove(function(e) {
    if (!drawing)
        return;

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    // send a msg to server to broadcast it to all other users in the room
    socket.emit('message', JSON.stringify({
        x: mouseX,
        y: mouseY,
        drag: true,
        color: userColor
    }));

    addClick(mouseX, mouseY, true, userColor);
    redraw();
});
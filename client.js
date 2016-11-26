/**
 * Created by dinghaoli on 11/25/16.
 */
var base = 'http://clicktime.herokuapp.com:80/rooms/';
var roomName = 'dinghaoli-room';
var socket = io.connect(base + roomName);

/**
 * These are the events that the websocket server will emit
 *
 * When sending messages, make sure the type is set to 'message', or other clients won't receive your data
 * (e.g. socket.emit('message', { ... }); )
 */
socket.on('welcome', function () {
    // Connection is established, start using the socket
});

socket.on('message', function (data) {
    // The 'message' event is emitted whenever another client sends a message
    // Messages are automatically broadcasted to everyone in the room
    var info = JSON.parse(data)
    addClick(info.x, info.y, info.drag, info.color);
    redraw();
});

socket.on('heartbeat', function () {
    // You can listen on this event to make sure your connection is receiving events correctly
    // The server will emit a heartbeat every 30 seconds to all connected clients
});

socket.on('error', function (err) {
    // Sometimes things go wrong!
    var type = err.type;    // This is the type of error that occurred
    var message = err.message;    // This is a friendly message that should describe the error
});

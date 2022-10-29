// Init express
const express = require('express');
const app = express();

// Init http and socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);  // the library socket.io simplifies the creation of a socket

// http port to listen
const port = 3000;

// Store Position
let sockets = {}

// Socket.io
// what happens when a new clients connects to a socker
io.on('connection', function(socket) {
    console.log('Socket Connected ', socket.id);
    
    // here the positionToServer works as a label to be sent from the client
    socket.on('positionToServer', function (data) {
        console.log('positionToServer ', data);
        
    });

    //Whenever someone disconnects this piece of code executed
    // this might not require the client to send the label disconnect as it is a default action
    // the client just disconnects and the default label is disconnect
    socket.on('disconnect', function () {
        console.log('Socket disconnected ', socket.id);
        
    });
});

// Create API  
app.get('/api', (req, res) => {
    res.send('Hello World!!!')
});

// Init the Frontend
app.use(express.static( __dirname + '/app' ));

// Start the server
http.listen(port, () => console.log(`Example app listening on port ${port}`));

const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile('/Users/rafal.mlynski/Desktop/nodeGpsApp/client/index.html');
});

const server = app.listen(1337, () => {
    console.log('Server running!')
})

const io = socketio(server)

io.on('connection', (socket) => {
    var lat = 0
    var lng = 0
  console.log('A user connected');

  // Listen for GPS coordinate updates from client
  socket.on('updateCoordinates', (data) => {
    console.log('Received GPS coordinates:', data);
    // Broadcast the coordinates to all connected clients
    io.emit('updateCoordinatesForWeb', {"lat": data.latitude, "lng":data.longitude});
  });




  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

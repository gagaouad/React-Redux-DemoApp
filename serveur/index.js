const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const io = require('socket.io');

const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};

const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
  res.status(200).send(HTML_FILE);
});

// Socket Section
const socketIO = io(server);
socketIO.on('connection', (socket) => {
  // Broadcast
  socket.on('action', (msg) => {
    socket.emit('action', msg);
  });
});

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { getWinner } = require('../duplicate/src/components/Box'); // Adjust the path accordingly

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Your existing game logic and state variables
let gameBoard = Array(9).fill(null);
let players = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinGame', (player) => {
    players.push({ id: socket.id, name: player });
    io.emit('updatePlayers', players);
  });

  socket.on('makeMove', ({ row, col, value }) => {
    // Update the game state and broadcast to all players
    // updateMatrix(row, col, value);
    gameBoard[row][col] = value;
    io.emit('updateGame', gameBoard);

    // Check for a winner using the imported getWinner function
    let winner = getWinner(gameBoard);
    if (winner === 1) {
      io.emit('gameOver', { winner: '0' });
    } else if (winner === 2) {
      io.emit('gameOver', { winner: '*' });
    } else if (flag > 9) {
      io.emit('gameOver', { winner: 'draw' });
    }
  });

  socket.on('disconnect', () => {
    // Handle player disconnect
    players = players.filter((player) => player.id !== socket.id);
    io.emit('updatePlayers', players);
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
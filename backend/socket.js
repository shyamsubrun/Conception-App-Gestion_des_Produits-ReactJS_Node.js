const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    });

    io.on('connection', (socket) => {
      console.log('Un utilisateur est connecté.');

      socket.on('message', (data) => {
        console.log(`Message reçu : ${data}`);
        io.emit('message', data);
      });

      socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté.');
      });
    });
  }
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io n’est pas encore initialisé. Appelez initSocket d’abord.');
  }
  return io;
};

module.exports = { initSocket, getIo };

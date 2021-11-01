import socketio from 'socket.io';

const io = new socketio.Server();

io.on('connection', (socket) => {});

export default io;

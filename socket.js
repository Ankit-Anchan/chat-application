// const userSockets = {};
const socketRepository = require('./repository/user-socket.repository');
const messageSocket = require('./service/message-socket.service');

let socket = {};

socket.io = {};

socket.init = (_io) => {
    socket.io = _io;
    socket.events();
}

socket.events = () => {
    socket.io.sockets.on('connection', (socket) => {
        console.log('new user connected with id ' + socket.id);
        // TODO save user socket objects for future use
    
        socket.on('new_user', (data) => {
            console.log('new_user event invoked');
            console.log(data);
            socketRepository.addNewSocket(socket.id, socket, data);
        });
    
        socket.on('message', (data) => {
            console.log(data);
            socket.io.emit('group/crispy', data);
        });

        socket.on('logout', () => {
            console.log('user log out ' + socket.id);
            socketRepository.deleteSocket(socket.id);
        });
    
        socket.on('disconnect', function() {
            // remove socket from in-memory user connection list
            console.log('socket disconnected ' + socket.id);
            socketRepository.deleteSocket(socket.id);
        });
        
        messageSocket.init(socket);

    });
}

module.exports = socket;
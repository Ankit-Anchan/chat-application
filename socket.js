var io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
    console.log('new user connected with id ' + socket.id);

    socket.on('new_user', (data) => {
        console.log(data);
        io.emit('new_user', data);
    });

    socket.on('update_chat', (data) => {
        console.log(data);
        io.emit('group/crispy', data);
    });

    socket.on('disconnect', function() {
        // remove socket from in-memory user connection list
    });
});

module.exports = io;

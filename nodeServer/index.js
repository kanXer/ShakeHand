// socket Connection
const io = require(`socket.io`)(8000, {
    cors:{
        origin:`*`
    }
});
const users={};

// new user function


io.on(`connection`, socket => {
    socket.on(`new-user-joined`, Name =>{
        console.log(`new user` ,Name);
        users[socket.id] = Name;
        socket.broadcast.emit(`user-joined`, Name);
    });


    // msg send or recive function
    
    
    socket.on('send',message =>{
        socket.broadcast.emit('recived', {message:message,Name : users[socket.id]})
    });
    
    
    // user left function
    
    
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})

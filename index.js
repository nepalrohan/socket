
import express from "express";
import http from 'http'
import {Server} from "socket.io";

const app=express();


const server = http.createServer(app);

//initialize socket io

const io =new  Server(server);

app.use(express.static('public'));


const users = new Set();

io.on('connection', (socket)=>{
    console.log(' user connected');
//handle user when they join the chat
    socket.on('join', (userName)=>{
        users.add(userName);

        socket.userName=userName;

        //broadcast to all user that a new user join
io.emit('userJoined', userName);

//send updated userlist to clients
io.emit('userList', Array.from(users))
    })

socket.on('chatMessage', (message)=>{
    //broadcast the received message to all connected clients

    io.emit('chatMessage', message)
})


socket.on('disconnect', ()=>{
    console.log('A user has disconnected');
    users.forEach(user=>{
        if(user === socket.userName){
            users.delete(user);
            io.emit('userleft', user);
            io.emit('userList', Array.from(users));
        }
    })
})

})




const port = 3000;
server.listen(port, ()=>{
    console.log('server is running')
})
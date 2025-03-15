
import express from "express";
import http from 'http'
import socketIo from "socket.io";

const app=express();


const server = http.createServer(app);

//initialize socket io

const io = socketIo(server);

app.use(express.static(' public'));

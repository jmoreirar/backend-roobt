const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const routes = require('./routes');

const app = express();

const server = http.Server(app);
const io =  socketio(server);

mongoose.connect('mongodb+srv://leandrofdx:senha123@cluster0.tipgb.mongodb.net/projeto?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })

 const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use(cors());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers","*");

    return next();
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});


app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

var porta =  process.env.PORT || 443

http.createServer(app).listen(porta, function() {
    console.log('Servidor rodando na porta :' + this.address().port);
});



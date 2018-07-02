var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var app=express();
var server = app.listen(4200)
var io = require('socket.io').listen(server);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'./public/index.html');

});
io.on('connection',(socket)=>{
console.log('connected');
socket.on('disconnect',()=>{
    console.log('user disconnected')
});
socket.on('chat',(msg)=>{
    socket.broadcast.emit('chat message',msg);
});
});
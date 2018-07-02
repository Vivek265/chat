var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'./public/index.html');

});
io.on('connection',(socket)=>{
console.log('connected');
});
app.listen(4200,()=>{
    console.log('listening');
})
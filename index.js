var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var app=express();
var port=process.env.PORT || 8080;
var server = app.listen(port)
var io = require('socket.io').listen(server);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'./public/index.html');

});
var currentUsers=[];
var offline=[];
var userName;
io.on('connection',(socket)=>{
console.log('connected',socket.id);
socket.on('login',(username)=>{
var user={
    name:username,
    id:socket.id
};userName=user.name;
for(x in offline){
    if(offline[x].to==userName){
    io.to(user.id).emit('chat message',offline[x]);
    delete offline[x];}
}

console.log(user);
currentUsers.push(user);
console.log(currentUsers);
});

socket.on('disconnect',()=>{
    console.log('user disconnected');
    for(x in currentUsers)
    if(currentUsers[x].name==userName)
     delete currentUsers[x];
});
socket.on('chat',(msg)=>{
    msg.from=userName;
    for (x in currentUsers){
        if(currentUsers[x].name==msg.to)
    io.to(currentUsers[x].id).emit('chat message',msg);
else if(currentUsers[x].name!=msg.to && x==(currentUsers.length-1) )
         {
             var offlineUser={
                 from:userName,
                 to:msg.to,
                 txt:msg.txt
             };console.log(offlineUser);
             offline.push(offlineUser);
             console.log(offline);
         }}
});
});
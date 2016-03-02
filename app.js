var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var osc = require('node-osc');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

//-------OSC Setup-------
var oscClient = new osc.Client("192.168.1.8",8000);
var oscServer = new osc.Server(8001,"0.0.0.0");

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  setInterval(function(){
  	io.sockets.emit('receive_osc' , flag);
  },500);
});

//http.listen(process.env.PORT||3000 , function(){
http.listen(3000 , function(){
  console.log('listening on *:3000');
});
var flag=0;
//----------OSC Receive-------------
oscServer.on('message',function(msg){
	console.log(msg[0]+":"+msg[1]);
	if(msg[1]==1)flag=1;
	else flag=0;
});
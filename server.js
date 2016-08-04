var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
 res.render("index");
})
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server)
io.sockets.on('connection', function(socket){
	console.log('We are using sockets!');
	console.log(socket.id);
	socket.on("user_joined", function(data){
		console.log('Someone joined the chatroom! Their name is ' + data.name);
		io.emit('server_response', {response: 'Someone joined the chatroom! Their name is ' + data.name});
	})
	socket.on("message_sent", function(data){
		console.log('Someone sent a new message!');
		console.log(data.name+": "+data.message);
		io.emit('server_response', {response: data.name+": "+data.message});
	})
	socket.on("user_left", function(data){
		io.emit('server_response', {response: data.name + " has left the chatroom. Bye Felicia."})
	})
})
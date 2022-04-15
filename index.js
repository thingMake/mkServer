const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const router = express.Router();
const cors = require('cors');
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  credentials: true, // <= Accept credentials (cookies) sent by the client
}))
const WebSocketServer = require('websocket').server;

router.get("/test",(req,res) => {
  res.send("test")
})
router.get("/info",(req,res) => {
  res.json({
    name:"Test server",
    description:"Just don't join",
    players:players
  })
})

app.use(router)
app.use(express.static(__dirname + "/public"))

//404
app.use(function(req, res, next) {
  res.status(404);
  res.sendFile(__dirname + '/404.html');
});

let serverPort = app.listen(3000, function(){
  console.log("App server is running on port 3000");
});

var players = []

const wsServer = new WebSocketServer({
  httpServer: serverPort
})
wsServer.on("request", req => {
  const connection = req.accept(null, req.origin);
  console.log("connection!")
  players.push(connection)

  function send(data, con = connection){
    if(typeof data === "object") data = JSON.stringify(data)
    con.sendUTF(data)
  }

  connection.on('message', function(message) {
    var data
    try{
      data = JSON.parse(message.utf8Data)
    }catch{
      return
    }
    if(data.type === "connect"){
      console.log(data.username+" has joined")
      connection.username = data.username
      connection.id = data.id
      send({type:"error",data:"hi "+data.username+"."})
      connection.close()
    }
  })
  connection.on('close', function(){
    var i = players.indexOf(connection)
    players.splice(i,1)
    console.log(connection.username+" has left")
  })
})
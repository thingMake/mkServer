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
const MineKhanServer = require("./MineKhanServer.js")
var server

router.get("/test",(req,res) => {
  res.send("test")
})
router.get("/log",(req,res) => {
  res.send("<span style='font-family:monospace;'>"+server.getLog().join("<br>")+"</span>")
})
router.get("/info",(req,res) => {
  res.json(server.getInfo())
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

server = MineKhanServer(serverPort, "Test server","This server is in development. What should I call this server?")
server.createRoom("lobby", {
  code:"lobby;uo4j23;8,6,8,0,0,2;Alpha 1.0.5;2,3,2v;0,0,0,47x,48d,7el,499,7fh,7kt,7l9,7m5,4m5,4ml,7st,7z1,4tp,7zx,1u5,50d,50t,519,51p,87x",
  canEdit:false
})
server.on("join", function(con){
  con.goToRoom("lobby")
})
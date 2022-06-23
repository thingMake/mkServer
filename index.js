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
const MineKhanServer = require("minekhan-server")
var server

router.get("/test",(req,res) => {
  res.send("test")
})
router.get("/log",(req,res) => {
  res.send("<span style='font-family:monospace;'>"+server.getLog().join("<br>")+"</span>")
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

server = MineKhanServer(serverPort, "Test server","This server is in development. What should I call this server?", {
  saveActivity:false
})
router.get("/info",(req,res) => {
  res.json(server.getInfo())
})

//lobby
var room = server.createRoom("lobby", {
  code:"lobby;uo4j23;8,6,8,0,0,1u;Alpha 1.0.5;2,3,b,r,2v,6bv,74b,cnv,e8r,ftn,gln,hej,i6j;0,0,0,11p,47x,48d,dq5,499,dr1,dwd,dwt,dxp,1fx,4m5,4ml,e4d,hbi,hby,hce,eal,4tp,ebh,81a,81q,hji,1u5,50d,50t,519,51p,ejh,hwu,hxq,l9q,8n2,v30,v31,v32,90u,91a,2to,2tp,2tq,oyj,cbg,cbh,cbi,s4f,yha,ipq,iq6,30s,30t,30u,p5n,cik,cil,cim,sbj,m0u,9e6,9f2,9fi;1,0,0,24,25,26,m6z,9jw,9jx,9jy,pcv,121a,z18,z19,z1a,6ni,6um,6v2,gcu,jwe,gxq,gy6,7n2,7ni,h5a",
  canEdit:false
})
room.addPortal("some place", 14,5,12, 16,9,14)

//some random place
room = server.createRoom("some place", {
  code:"some place;uo4j23;8,6,8,0,0,1u;Alpha 1.0.5;2,o,cns,e8o,ftk,heg;0,0,0,uf,11i,11j,18m,18n,18o,dw1,dw2,dw3,1fl,7rk,4lt,4lu,4lv,axg,1mr,7yo,4sx,4sy,4sz,b4k,85s,501,502,503,bbo,hu9,hua,hub,281,282,2f5,2ma",
  canEdit:false
})
room.addPortal("lobby", 10,5,4, 6,8,0)

server.on("join", function(con){
  con.goToRoom("lobby")
  con.sendJSON({
    type:"eval",
    data:"showTitle('Welcome to the server')"
  })
})
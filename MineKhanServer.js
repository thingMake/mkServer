//db
const level = require('level')
const leveldb = level('db')

if (!leveldb.supports.permanence) {
  throw new Error('Persistent storage is required')
}

var db = {
  get:async function(key){
    var value = await leveldb.get(key).catch(() => null)
    if(value){
      return JSON.parse(value)
    }else{
      return null
    }
  },
  set:async function(key, value, options){
    if(!(options && options.raw)) value = JSON.stringify(value)
    await leveldb.put(key, value)
    return this
  },
  delete:async function(key){
    await leveldb.del(key)
    return this
  },
  list:function(prefix, values){
    return new Promise(function(resolve, reject){
      var obj = values ? {} : []
      leveldb.createReadStream()
      .on('data', function (data) {
        if(prefix && !data.key.startsWith(prefix)){
          return
        }
        if(values){
          obj[data.key] = JSON.parse(data.value)
        }else{
          obj.push(data.key)
        }
      })
      .on('error', function (err) {
        console.log('Oh my!', err)
        reject(err)
      })
      .on('close', function () {
        //console.log('Stream closed')
      })
      .on('end', function () {
        resolve(obj)
      })
    })
  }
}

//log
let log = []
async function Log(){
  var data = []
  for(var i=0; i<arguments.length; i++){
    data.push(arguments[i])
  }
  console.log(...data)
  //var log = await db.get("log")
  //log = log || []
  log.push(data)
  await db.set("log", log)
}

function clearLog(){
  db.delete("log").then(() => {
    console.clear()
    log = []
  })
}
console.clear()
db.get("log").then(r => {
  r.forEach(v => {
    console.log(...v)
  })
  log = r
}).catch(() => {})


const WebSocketServer = require('websocket').server;
function init(serverPort, name,description){
  var onJoin
  var rooms = {}

  function createRoom(name, options){
    if(rooms[name]) throw "Room called "+name+" has already been created."
    rooms[name] = {
      name:name,
      code: options.code,
      spawn: options.spawn, //array
      canEdit: options.canEdit
    }
  }
  
  var players = []
  const wsServer = new WebSocketServer({
    httpServer: serverPort
  })
  wsServer.on("request", req => {
    const connection = req.accept(null, req.origin);
    console.log("connection!")
    players.push(connection)
    
    connection.sendJSON = function(data, con = connection){
      if(typeof data === "object") data = JSON.stringify(data)
      con.sendUTF(data)
    }
    function sendPlayers(msg){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p !== connection){
          p.sendJSON(msg)
        }
      }
    }
    function sendAllPlayers(msg){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        p.sendJSON(msg)
      }
    }
    function sendPlayer(msg, to){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p.id === to){
          p.sendJSON(msg)
        }
      }
    }
    function sendThisPlayer(msg){
      connection.sendJSON(msg)
    }
    function sendPlayerName(msg, to){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p.username === to){
          p.sendJSON(msg)
        }
      }
    }
    function closePlayers(){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p !== connection){
          p.close()
        }
      }
    }
    function closePlayer(id){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p.username === id){
          p.close()
        }
      }
    }
    function closeThisPlayer(){
      connection.close()
    }
    function findPlayer(id){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p.username === id){
          return p
        }
      }
    }
  
    connection.on('message', function(message) {
      var data
      try{
        data = JSON.parse(message.utf8Data)
      }catch{
        return
      }
      if(data.type === "connect"){
        Log(data.username+" has joined")
        connection.username = data.username
        connection.id = data.id
        connection.room = null
        connection.goToRoom = function(room){
          if(!rooms[room]) throw "No such room called "+room
          this.room = room = rooms[room]
          sendThisPlayer({
            type:"loadSave",
            data:room.code,
            cheats:false,
            time:0,
            inv: room.spawn ? {x:room.spawn[0], y:room.spawn[1], z:room.spawn[2]} : null
          })
        }
        if(onJoin) onJoin(connection)
        sendPlayers(JSON.stringify({
          type:"message",
          data: data.username+" is connecting. "+players.length+" players now.",
          username: "Server",
          fromServer:true
        }))
      }else if(data.type === "joined"){
        sendPlayers(JSON.stringify({
          type:"message",
          data: data.username+" joined. ",
          username: "Server",
          fromServer:true
        }))
      }else if(data.type === "pos"){
        sendPlayers(message.utf8Data)
        sendThisPlayer(JSON.stringify({
          type:"canSendPos"
        }))
      }else if(data.type === "message" || data.type === "entityPos" || data.type === "entityDelete" || data.type === "die" || data.type === "harmEffect" || data.type === "achievment" ||  data.type === "playSound" || data.type === "mySkin"){
        sendPlayers(message.utf8Data)
      }else if(data.type === "setBlock" || data.type === "setTags"){
        if(!connection.room.canEdit) {
          if(data.type === "setBlock"){
            data.data.block = data.data.prevBlock || 0
            sendThisPlayer(data)
          }
          return
        }
        sendPlayers(message.utf8Data)
      }else if(data.type === "hit"){
        sendPlayer(message.utf8Data, data.TO)
      }else if(data.type === "diamondsToYou"){
        sendPlayer(JSON.stringify({
          type:"diamondsToYou"
        }), data.TO)
      }else if(data.type === "fetchUsers"){
        var arr = []
        players.forEach(u => {
          arr.push(u.username)
        })
        sendThisPlayer(JSON.stringify({
          type:"message",
          username:"Server",
          data:arr.length + " players online: " + arr.join(", "),
          fromServer:true
        }))
      }
    })
    connection.on('close', function(){
      var i = players.indexOf(connection)
      players.splice(i,1)
      Log(connection.username+" has left")
      sendPlayers(JSON.stringify({
        type:"message",
        data: connection.username+" left. "+players.length+" players now.",
        username: "Server",
        fromServer:true
      }))
    })
  })
  function getInfo(){
    return {
      name:name,
      description:description,
      players:players.map(p => p.username)
    }
  }

  function on(event, cb){
    if(event === "join") onJoin = cb
  }

  return {
    getInfo:getInfo,
    getLog:() => log,
    on:on,
    createRoom: createRoom
  }
}

module.exports = init
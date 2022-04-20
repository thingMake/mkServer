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
function init(serverPort, name,description, options){
  var onJoin
  var saveActivity = options.saveActivity !== undefined ? options.saveActivity : true
  var rooms = {}

  function createRoom(name, options){
    if(rooms[name]) throw "Room called "+name+" has already been created."
    return rooms[name] = {
      name:name,
      code: options.code,
      spawn: options.spawn, //array
      canEdit: options.canEdit !== undefined ? options.canEdit : !options.code,
      entities: [],
      portals: [],
      addPortal: function(where, x,y,z, x2,y2,z2){
        var temp
        if(x > x2) temp = x, x = x2, x2 = temp
        if(y > y2) temp = y, y = y2, y2 = temp
        if(z > z2) temp = z, z = z2, z2 = temp
        
        this.portals.push({
          to:where,
          x,y,z,x2,y2,z2
        })
      },
      inPortal: function(x,y,z){
        for(var p of this.portals){
          if(
            x >= p.x &&
            x <= p.x2 &&
            y >= p.y &&
            y <= p.y2 &&
            z >= p.z &&
            z <= p.z2
            ) return p.to
        }
        return false
      }
    }
  }

  function updateEntities(){
    for(var p of players){
      if(!(p.room && p.room.entities.length)) continue
      p.sendJSON('{"type":"entityPosAll","data":'+JSON.stringify(p.room.entities)+"}")
    }
  }
  
  var goToRoomQueue = []
  function updateGoToRoomQueue(){
    if(!goToRoomQueue.length) return
    for(var i = goToRoomQueue.length - 1; i >= 0; i--){
      var idx = goToRoomQueue[i].indexOf(":")
      var p = findPlayerById(goToRoomQueue[i].slice(0,idx))
      if(!p) continue
      p.goToRoom(goToRoomQueue[i].slice(idx+1))
      goToRoomQueue.splice(i,1)
    }
  }
  
  setInterval(function(){
    updateEntities()
    updateGoToRoomQueue()
  }, 1000)
  
  var players = []
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
  function sendPlayerName(msg, to){
    for(var i=0; i<players.length; i++){
      var p = players[i]
      if(p.username === to){
        p.sendJSON(msg)
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
  function findPlayer(id){
    for(var i=0; i<players.length; i++){
      var p = players[i]
      if(p.username === id){
        return p
      }
    }
  }
  function findPlayerById(id){
    for(var i=0; i<players.length; i++){
      var p = players[i]
      if(p.id === id){
        return p
      }
    }
  }
  
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
    function sendThisPlayer(msg){
      connection.sendJSON(msg)
    }
    function sendPlayersThisRoom(msg){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p !== connection && connection.room === p.room){
          p.sendJSON(msg)
        }
      }
    }
    function closeThisPlayer(){
      connection.close()
    }
    function closePlayers(){
      for(var i=0; i<players.length; i++){
        var p = players[i]
        if(p !== connection){
          p.close()
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
        if(saveActivity) Log(data.username+" has joined");else console.log(data.username+" has joined")
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
          for(var p of players){
            if(p !== connection && p.room !== room){
              if(p.hiddenPos) sendThisPlayer(p.hiddenPos)
              if(connection.hiddenPos) p.sendJSON(connection.hiddenPos)
            }
          }
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
        for(var i=0; i<players.length; i++){
          var p = players[i]
          if(p !== connection){
            if(p.room === connection.room) p.sendJSON(message.utf8Data)
          }
        }
        sendThisPlayer(JSON.stringify({
          type:"canSendPos"
        }))

        var temp = data.data.hidden
        data.data.hidden = true
        connection.hiddenPos = JSON.stringify(data)
        data.data.hidden = temp
        
        var i = connection.room.inPortal(data.data.x, data.data.y, data.data.z)
        if(i){
          var str = connection.id+":"+i
          if(!goToRoomQueue.includes(str)){
            sendThisPlayer({
              type:"message",
              data: "Going to "+i,
              username: "Server",
              fromServer:true
            })
            goToRoomQueue.push(str)
          }
        }
      }else if(data.type === "message" || data.type === "die" || data.type === "harmEffect" || data.type === "achievment" ||  data.type === "playSound" || data.type === "mySkin"){
        sendPlayers(message.utf8Data)
      }else if(data.type === "setBlock" || data.type === "setTags"){
        if(!connection.room.canEdit) {
          if(data.type === "setBlock"){
            data.data.block = data.data.prevBlock || 0
            sendThisPlayer(data)
          }
          return
        }
        sendPlayersThisRoom(message.utf8Data)
      }else if(data.type === "entityPos"){
        delete data.type
        var e = connection.room.entities
        var found = false
        for(var i = 0; i<e.length; i++){
          var ent = e[i]
          if(ent.id === data.id){
            e[i] = data
            found = true
            continue
          }
        }
        if(!found){
          e.push(data)
        }

        sendPlayersThisRoom(message.utf8Data)
      }else if(data.type === "entityDelete"){
        var e = connection.room.entities
        for(var i = 0; i<e.length; i++){
          var ent = e[i]
          if(ent.id === data.id){
            e.splice(i,1)
            continue
          }
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
      if(saveActivity) Log(connection.username+" has left");else console.log(connection.username+" has left")
      sendPlayers(JSON.stringify({
        type:"dc",
        data: connection.id
      }))
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
    createRoom: createRoom,
    getRoom: room => rooms[room] || null
  }
}

module.exports = init
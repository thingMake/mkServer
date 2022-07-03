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
router.get("/thumbnail",(req,res) => {
  res.sendFile(__dirname+"/thumbnail.png")
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

server = MineKhanServer(serverPort, "Test server","This server is in development. What should I call this server?<br>Join to play bedwars or do stuff in creative mode.", {
  thumbnail: "https://mkServer.minekhan.repl.co/thumbnail",
  saveActivity:false
})
router.get("/info",(req,res) => {
  res.json(server.getInfo())
})

//lobby
var room = server.createRoom("lobby", {
  code:"lobby;uo4j23;0,6,0,0,0,1u;Alpha 1.0.5;1,b,o,r,21,22,2v,4a,8b,af,eo,hl,ib,4vp,6bv,74b,cns,cnv,e8o,e8r,ft7,ftk,ftn,gln,he3,heg,hej,i6j||;0,0,0,shs,sht,shu,shv,shw,shx,shy,shz,si0,si1,si2,si3,si4,si5,si6,si7,sow,sox,soy,soz,sp0,sp1,sp2,sp3,sp4,sp5,sp6,sp7,sp8,sp9,spa,spb,sw0,sw1,sw2,sw3,sw4,sw5,sw6,sw7,sw8,sw9,swa,swb,swc,swd,swe,swf,18st,1bz1,1bzh,t34,t35,t36,t37,t38,t39,t3a,t3b,t3c,t3d,t3e,t3f,t3g,t3h,t3i,t3j,3wt,3x9,3xp,ta8,ta9,taa,tab,tac,tad,tae,taf,tag,tah,tai,taj,tak,tal,tam,tan,thc,thd,the,thf,thg,thh,thi,thj,thk,thl,thm,thn,tho,thp,thq,thr,k1p,k2l,21u5,4bh,4bx,tog,toh,toi,toj,tok,tol,tom,ton,too,top,toq,tor,tos,tot,tou,tov,k7x,k8d,k99,4i5,tvk,tvl,tvm,tvn,tvo,tvp,tvq,tvr,tvs,tvt,tvu,tvv,tvw,tvx,tvy,tvz,kfx,2evh,4pp,4q5,u2o,u2p,u2q,u2r,u2s,u2t,u2u,u2v,u2w,u2x,u2y,u2z,u30,u31,u32,u33,km5,kn1,u9s,u9t,u9u,u9v,u9w,u9x,u9y,u9z,ua0,ua1,ua2,ua3,ua4,ua5,ua6,ua7,kv1,1a6l,1dd9,ugw,ugx,ugy,ugz,uh0,uh1,uh2,uh3,uh4,uh5,uh6,uh7,uh8,uh9,uha,uhb,5al,5b1,5bh,uo0,uo1,uo2,uo3,uo4,uo5,uo6,uo7,uo8,uo9,uoa,uob,uoc,uod,uoe,uof,1akt,1drh,uv4,uv5,uv6,uv7,uv8,uv9,uva,uvb,uvc,uvd,uve,uvf,uvg,uvh,uvi,uvj,v28,v29,v2a,v2b,v2c,v2d,v2e,v2f,v2g,v2h,v2i,v2j,v2k,v2l,v2m,v2n,2064,2065,2066,1e5p,v9c,v9d,v9e,v9f,v9g,v9h,v9i,v9j,v9k,v9l,v9m,v9n,v9o,v9p,v9q,v9r,1kkb,cbg,cbh,cbi,1qvz,23l9,1ebx,63h,63x,vgg,vgh,vgi,vgj,vgk,vgl,vgm,vgn,vgo,vgp,vgq,vgr,vgs,vgt,vgu,vgv,1krf,cik,cil,cim,1r33,1ehp,699,33x,1ejx;0,0,1,shs,sht,pci,sow,sox,pjm,sw0,sw1,pqq,t34,t35,pxu,ta8,ta9,q4y,thc,thd,qc2,tog,toh,qj6,tvk,tvl,qqa,u2o,u2p,qxe,u9s,u9t,r4i,ugw,ugx,rbm,uo0,uo1,riq,uv4,uv5,rpu,v28,v29,rwy,v9c,v9d,s42,vgg,vgh,sb6;0,1,1,za2,zai,zh6,zhm,zm2,zmi,zmy,zne,znu,zoa,zoq,zt6,ztm,zu2,zui,zuy,zve,zvu,102i,102y,109m,10a2;0,0,-1,si2,si3,si4,si5,si6,si7,pcp,sp6,sp7,sp8,sp9,spa,spb,pjt,swa,swb,swc,swd,swe,swf,pqx,t3e,t3f,t3g,t3h,t3i,t3j,py1,tai,taj,tak,tal,tam,tan,q55,thm,thn,tho,thp,thq,thr,qc9,toq,tor,tos,tot,tou,tov,qjd,tvu,tvv,tvw,tvx,tvy,tvz,qqh,u2y,u2z,u30,u31,u32,u33,qxl,ua2,ua3,ua4,ua5,ua6,ua7,r4p,uh6,uh7,uh8,uh9,uha,uhb,rbt,uoa,uob,uoc,uod,uoe,uof,rix,uve,uvf,uvg,uvh,uvi,uvj,rq1,v2i,v2j,v2k,v2l,v2m,v2n,rx5,v9m,v9n,v9o,v9p,v9q,v9r,s49,vgq,vgr,vgs,vgt,vgu,vgv,sbd;1,0,0,shs,sht,shu,shv,shw,shx,shy,shz,si0,si1,si2,si3,si4,si5,si6,si7,1hsr,9jw,9jx,9jy,1o4f,2dgt,sow,sox,soy,soz,sp0,sp1,sp2,sp3,sp4,sp5,sp6,sp7,sp8,sp9,spa,spb,2afw,2afx,2afy,2dp9,2dpp,sw0,sw1,sw2,sw3,sw4,sw5,sw6,sw7,sw8,sw9,swa,swb,swc,swd,swe,swf,2199,219p,t34,t35,t36,t37,t38,t39,t3a,t3b,t3c,t3d,t3e,t3f,t3g,t3h,t3i,t3j,ta8,ta9,taa,tab,tac,tad,tae,taf,tag,tah,tai,taj,tak,tal,tam,tan,1cct,21nh,21nx,thc,thd,the,thf,thg,thh,thi,thj,thk,thl,thm,thn,tho,thp,thq,thr,tog,toh,toi,toj,tok,tol,tom,ton,too,top,toq,tor,tos,tot,tou,tov,2eod,221p,2ep9,tvk,tvl,tvm,tvn,tvo,tvp,tvq,tvr,tvs,tvt,tvu,tvv,tvw,tvx,tvy,tvz,4p9,4pp,4q5,u2o,u2p,u2q,u2r,u2s,u2t,u2u,u2v,u2w,u2x,u2y,u2z,u30,u31,u32,u33,u9s,u9t,u9u,u9v,u9w,u9x,u9y,u9z,ua0,ua1,ua2,ua3,ua4,ua5,ua6,ua7,1a6l,1dd9,ugw,ugx,ugy,ugz,uh0,uh1,uh2,uh3,uh4,uh5,uh6,uh7,uh8,uh9,uha,uhb,2fgt,5b1,260d,rio,rip,riq,rir,ris,rit,riu,riv,riw,rix,riy,riz,rj0,rj1,rj2,rj3;1,0,1,shs,sht,pci,sow,sox,pjm,sw0,sw1,pqq,t34,t35,pxu,ta8,ta9,q4y,thc,thd,qc2,tog,toh,qj6,tvk,tvl,qqa,u2o,u2p,qxe,u9s,r4h,rbk;1,0,-1,si2,si3,si4,si5,si6,si7,pcp,sp6,sp7,sp8,sp9,spa,spb,pjt,swa,swb,swc,swd,swe,swf,pqx,t3e,t3f,t3g,t3h,t3i,t3j,py1,tai,taj,tak,tal,tam,tan,q55,thm,thn,tho,thp,thq,thr,qc9,toq,tor,tos,tot,tou,tov,qjd,tvu,tvv,tvw,tvx,tvy,tvz,qqh,u2y,u2z,u30,u31,u32,u33,qxl,ua3,ua4,ua5,ua6,ua7,r4q,uh8,uh9,uha,uhb,rbv,rj0,rj1,rj2,rj3;-2,0,0,1bkd,18f1,1bl9,pjk,pjl,pjm,pjn,pjo,pjp,pjq,pjr,pjs,pjt,pju,pjv,pjw,pjx,pjy,pjz,18lp,1brx,1bsd,sw0,sw1,sw2,sw3,sw4,sw5,sw6,sw7,sw8,sw9,swa,swb,swc,swd,swe,swf,18st,18tp,t34,t35,t36,t37,t38,t39,t3a,t3b,t3c,t3d,t3e,t3f,t3g,t3h,t3i,t3j,ta8,ta9,taa,tab,tac,tad,tae,taf,tag,tah,tai,taj,tak,tal,tam,tan,43x,197x,thc,thd,the,thf,thg,thh,thi,thj,thk,thl,thm,thn,tho,thp,thq,thr,4bh,1ckt,tog,toh,toi,toj,tok,tol,tom,ton,too,top,toq,tor,tos,tot,tou,tov,4i5,4il,4j1,tvk,tvl,tvm,tvn,tvo,tvp,tvq,tvr,tvs,tvt,tvu,tvv,tvw,tvx,tvy,tvz,u2o,u2p,u2q,u2r,u2s,u2t,u2u,u2v,u2w,u2x,u2y,u2z,u30,u31,u32,u33,4wd,4wt,1sz1,u9s,u9t,u9u,u9v,u9w,u9x,u9y,u9z,ua0,ua1,ua2,ua3,ua4,ua5,ua6,ua7,1a71,54d,ugw,ugx,ugy,ugz,uh0,uh1,uh2,uh3,uh4,uh5,uh6,uh7,uh8,uh9,uha,uhb,5al,5b1,260d,uo0,uo1,uo2,uo3,uo4,uo5,uo6,uo7,uo8,uo9,uoa,uob,uoc,uod,uoe,uof,uv4,uv5,uv6,uv7,uv8,uv9,uva,uvb,uvc,uvd,uve,uvf,uvg,uvh,uvi,uvj,237x,5p9,5pp,v28,v29,v2a,v2b,v2c,v2d,v2e,v2f,v2g,v2h,v2i,v2j,v2k,v2l,v2m,v2n,5vx,v9c,v9d,v9e,v9f,v9g,v9h,v9i,v9j,v9k,v9l,v9m,v9n,v9o,v9p,v9q,v9r,1ebx,63h,63x,vgg,vgh,vgi,vgj,vgk,vgl,vgm,vgn,vgo,vgp,vgq,vgr,vgs,vgt,vgu,vgv,6a5;-2,0,1,pqo,t34,pxt,ta8,ta9,q4y,thc,thd,qc2,tog,toh,qj6,tvk,tvl,qqa,u2o,u2p,qxe,u9s,u9t,r4i,ugw,ugx,rbm,uo0,uo1,riq,uv4,uv5,rpu,v28,v29,rwy,v9c,v9d,s42,vgg,vgh,sb6;-2,1,1,f4q,f56,y4a,fbu,fca,ybe,fgq,fh6,fhm,fi2,fii,fiy,fje,yii,fnu,foa,foq,fp6,fpm,fq2,fqi,ypm;-2,0,-1,pjw,pjx,pjy,pjz,swc,swd,swe,swf,pqz,t3f,t3g,t3h,t3i,t3j,py2,tai,taj,tak,tal,tam,tan,q55,thm,thn,tho,thp,thq,thr,qc9,toq,tor,tos,tot,tou,tov,qjd,tvu,tvv,tvw,tvx,tvy,tvz,qqh,u2y,u2z,u30,u31,u32,u33,qxl,ua2,ua3,ua4,ua5,ua6,ua7,r4p,uh6,uh7,uh8,uh9,uha,uhb,rbt,uoa,uob,uoc,uod,uoe,uof,rix,uve,uvf,uvg,uvh,uvi,uvj,rq1,v2i,v2j,v2k,v2l,v2m,v2n,rx5,v9m,v9n,v9o,v9p,v9q,v9r,s49,vgq,vgr,vgs,vgt,vgu,vgv,sbd;-1,0,0,shs,sht,shu,shv,shw,shx,shy,shz,si0,si1,si2,si3,si4,si5,si6,si7,1ufw,1ufx,1ufy,2dhp,3bx,3cd,sow,sox,soy,soz,sp0,sp1,sp2,sp3,sp4,sp5,sp6,sp7,sp8,sp9,spa,spb,1eu3,6l8,6l9,6la,1l5r,210d,sw0,sw1,sw2,sw3,sw4,sw5,sw6,sw7,sw8,sw9,swa,swb,swc,swd,swe,swf,1f17,6sc,6sd,6se,1lcv,1bwt,3od,15m5,1byl,3q5,18tp,t34,t35,t36,t37,t38,t39,t3a,t3b,t3c,t3d,t3e,t3f,t3g,t3h,t3i,t3j,1f8b,6zg,6zh,6zi,1ljz,2e1p,3wt,3xp,ta8,ta9,taa,tab,tac,tad,tae,taf,tag,tah,tai,taj,tak,tal,tam,tan,27vg,27vh,27vi,43x,44d,44t,thc,thd,the,thf,thg,thh,thi,thj,thk,thl,thm,thn,tho,thp,thq,thr,tog,toh,toi,toj,tok,tol,tom,ton,too,top,toq,tor,tos,tot,tou,tov,19l9,19lp,1crx,tvk,tvl,tvm,tvn,tvo,tvp,tvq,tvr,tvs,tvt,tvu,tvv,tvw,tvx,tvy,tvz,4p9,4pp,4q5,u2o,u2p,u2q,u2r,u2s,u2t,u2u,u2v,u2w,u2x,u2y,u2z,u30,u31,u32,u33,u9s,u9t,u9u,u9v,u9w,u9x,u9y,u9z,ua0,ua1,ua2,ua3,ua4,ua5,ua6,ua7,25sd,22n1,2fal,ugw,ugx,ugy,ugz,uh0,uh1,uh2,uh3,uh4,uh5,uh6,uh7,uh8,uh9,uha,uhb,5al,5b1,5bh,uo0,uo1,uo2,uo3,uo4,uo5,uo6,uo7,uo8,uo9,uoa,uob,uoc,uod,uoe,uof,uv4,uv5,uv6,uv7,uv8,uv9,uva,uvb,uvc,uvd,uve,uvf,uvg,uvh,uvi,uvj,v28,v29,v2a,v2b,v2c,v2d,v2e,v2f,v2g,v2h,v2i,v2j,v2k,v2l,v2m,v2n,v9c,v9d,v9e,v9f,v9g,v9h,v9i,v9j,v9k,v9l,v9m,v9n,v9o,v9p,v9q,v9r,vgg,vgh,vgi,vgj,vgk,vgl,vgm,vgn,vgo,vgp,vgq,vgr,vgs,vgt,vgu,vgv;-1,0,1,shs,sht,pci,sow,sox,pjm,sw0,sw1,pqq,t34,t35,pxu,ta8,ta9,q4y,thc,thd,qc2,tog,toh,qj6,tvk,tvl,qqa,u2o,u2p,qxe,u9s,u9t,r4i,ugw,ugx,rbm,uo0,uo1,riq,uv4,uv5,rpu,v28,v29,rwy,v9c,v9d,s42,vgg,vgh,sb6;-1,1,1,cre,cru,vqy,cyi,cyy,vy2,mze,mzu,n16,n62,n6y,n7e,n8a,n8q,nd6,nei,nfe,nfu,nka,nlm,nm2,nmi,nmy,nru,nt6,ntm,i16,1462,i3u,148q,i8a,14d6,i9m,14ei,iay,14fu,ife,14ka,igq,14lm,ii2,14my,imi,imy,ine,inu,ioa,ioq,ip6,14u2,itm,iu2,iui,iuy,ive,ivu,iwa,1516;-1,0,-1,si2,si3,si4,si5,si6,si7,pcp,sp6,sp7,sp8,sp9,spa,spb,pjt,swa,swb,swc,swd,swe,swf,pqx,t3e,t3f,t3g,t3h,t3i,t3j,py1,tai,taj,tak,tal,tam,tan,q55,thm,thn,tho,thp,thq,thr,qc9,toq,tor,tos,tot,tou,tov,qjd,tvu,tvv,tvw,tvx,tvy,tvz,qqh,u2y,u2z,u30,u31,u32,u33,qxl,ua2,ua3,ua4,ua5,ua6,ua7,r4p,uh6,uh7,uh8,uh9,uha,uhb,rbt,uoa,uob,uoc,uod,uoe,uof,rix,uve,uvf,uvg,uvh,uvi,uvj,rq1,v2i,v2j,v2k,v2l,v2m,v2n,rx5,v9m,v9n,v9o,v9p,v9q,v9r,s49,vgq,vgr,vgs,vgt,vgu,vgv,sbd;|;|",
  canEdit:false,
  spawn:[0,6,0],
  survival:true
})
var lobbyText = room.addText(0,6,2,"hello",[0,0,0],[1,1,1,1])
setInterval(function(){
  lobbyText.setText("Hello {username},\nThere are "+server.players.length+" players on this server.")
},1000)
room.addPortal("creative", 14,5,12, 16,9,14)
room.addPortal("choose bedwars", -12,6,11, -16,9,15)

room = server.createRoom("creative", {
  code:"World;0;8,6,8,0,0,2;Alpha 1.0.5;;;",
  canEdit:true,
  settings:{
    dayNightCycle:true,
    tntExplode:false
  }
})

room = server.createRoom("choose bedwars", {
  code:"World;0;8,6,8,0,0,1u;Alpha 1.0.5;2,b,1l,6bv,74b,cnf,cop,e8b,e9l,ft7,fuh,gln,he3,hfd,i6j||;0,0,0,nkg,4so,nrk,nyo,148u,1aku,uym,11am,y8t,y8u,y8v,2tp,2tq,2tr,lss,95p,95q,95r,11ni,62m,632,63i,63y,30t,30u,30v,lzw,9ct,9cu,9cv,fpq,68u;0,0,1,s40,sb4;0,0,-1,43i,43y,44e,tku,19e6,zxa,tp9,tpa,tpb,1fx,1fy,1fz,h98,4m5,4m6,4m7,109q,19ry,19se,1n1,1n2,1n3,hgc,4t9,4ta,4tb,eby,4v2,10hq,10i6,1u5,1u6,1u7,hng,50d,50e,50f,1a5a,13z1,13z2,13z3,141q,1adq,5oe,5ou,5pa,fcu,c7i,ce6,fke;1,0,0,25,26,27,j18,6e5,6e6,6e7,18da,122m,18em,15ct,15cu,15cv,sse,z4e,zhq,3we,t72,3xq,432,12v2,43y,zq6,44u,4a6,19e6,4bi,133i;1,0,1,pcg;|;|",
  canEdit:false,
  spawn:[8,6,8]
})
room.addPortal("lobby", 10,6,0, 6,9,-4)
room.addPortal(function(con){
  var room
  var i = 0
  var name
  var initRoom = false
  while(!room){
    i++
    name = "bedwars solo "+i
    room = server.getRoom(name)
    if(room){
      if(room.waiting && room.players.length < 4){
        var availableBeds = [true,true,true,true]
        for(var p of room.players){
          availableBeds[p.bed] = false
        }
        switch(availableBeds.indexOf(true)){
          case 0:
            room.spawn = [28,20,9]
            con.bed = 0
            break
          case 1:
            room.spawn = [10,20,7]
            con.bed = 1
            break
          case 2:
            room.spawn = [25,20,20]
            con.bed = 2
            break
          case 3:
            room.spawn = [11,20,21]
            con.bed = 3
            break
        }
      }else room = null
    }else{
      initRoom = true
      room = server.createRoom(name, {
        code:"solo;npunvq;h,g,f,-3d,62,1u;Alpha 1.0.5;1,2,t,51,e9,1px,4vp||;0,0,0,4fr,4fs,4ft,1af,1ag,1ah,dyv,dyw,dyx,dyy,dyz,dzb,dzc,dzd,dze,dzf,4mg,4mu,4mv,4mw,4mx,4my,1hi,1hj,1hk,1hl,1hm,e5z,e60,e61,e62,e63,e6f,e6g,e6h,e6i,e6j,e6x,e7d,4tj,4tk,4tl,4ty,4tz,4u0,4u1,4u2,4u3,1ol,1om,1on,1oo,4uh,1oq,1or,80p,815,ed3,ed4,81l,ed6,ed7,edj,edk,821,edm,edn,ee0,82h,ee2,eeg,eeh,eei,50m,50n,50o,50p,50q,511,512,513,514,515,516,517,1vp,1vq,1vr,1vs,1vt,1vu,1vv,ek7,ek8,ek9,eka,ekb,ekn,eko,ekp,ekq,ekr,el5,ell,57r,57s,57t,586,587,588,589,58a,58b,22t,22u,22v,22w,22x,22y,22z,bkn,erc,erd,ere,erf,ers,ert,eru,5ew,5fa,5fb,5fc,5fd,5fe,29y,29z,2a0,2a1,2a2,5mf,5mg,5mh,2h3,2h4,2h5,fr1,fr2,fr3,frh,fri,frj;0,0,1,e6b,e6c,e6d,e6q,e6r,e6s,e6t,e6u,1ok,1ol,1om,ede,edf,edg,edh,edi,edu,edv,edw,edx,edy,eec,ees,50l,510,511,512,1vn,51g,1vp,1vq,1vr,87o,884,88k,eki,ekj,890,ekl,ekm,eky,ekz,89g,el1,el2,elf,89w,elh,elv,elw,elx,57o,57p,57q,584,585,586,22r,22s,22t,22u,22v,hw5,erm,ern,ero,erp,erq,es2,es3,es4,es5,es6,esj,esk,esl,et0,5et,5f8,5f9,5fa,29v,29w,29x,29y,29z,eyr,eys,eyt,ez7,ez8,ez9,2h0,2h1,2h2,fqo,fr4,fr5;1,0,0,3z,csd,cse,csf,cst,csu,csv,cta,ctb,ctr,an,b2,3gv,6n3,6nj,czh,czi,6nz,czx,czy,6of,d0e,6ov,d0u,d0v,i7,d6l,d6m,d6n,d71,d72,d73,d7j,d7z,ddq,ddr,de5,de6,de7,1vr,1vs,ek5,ek6,ek7,ek8,ekl,ekm,ekn,587,588,22u,22v,22w,22x,er8,er9,era,erb,erc,ero,erp,erq,err,ers,es6,es7,esm,5ev,5ew,5fa,5fb,5fc,5fd,29x,5fq,29z,2a0,2a1,2a2,8ly,8me,eyc,eyd,8mu,eyf,eyg,eys,eyt,8na,eyv,eyw,ez9,8nq,ezb,ezp,ezq,ezr,5lz,5m0,5me,5mf,5mg,5mh,2h1,2h2,2h3,2h4,2h5,2h6,lg9,f5g,f5h,f5i,f5j,f5k,f5w,f5x,f5y,f5z,f60,f6d,f6e,f6f,f6u,5tj,5tk,2o6,2o7,2o8,2o9,fck,fcl,fcm,fcn,fd0,fd1,fd2,fd3,fd4,2vb,2vc;1,0,1,cs0,cs1,csg,csh,ao,cz4,cz5,czk,czl,d00,d0g,d68,d69,d6o,d6p,ddc,dds,ddt,dk4,dk5,dk6,dkj,dkk,dkl,dkm,12s,12t,dr7,dr8,dr9,dra,drb,drn,dro,drp,drq,drr,ds5,ds6,dsl,19v,4fo,4fp,1ac,4g5,1ae,7md,dyb,dyc,7mt,dye,dyf,dyr,dys,7n9,dyu,dyv,dz8,7np,dza,dzo,dzp,dzq,4mc,4md,4mr,4ms,4mt,4mu,1hf,1hg,1hh,1hi,1hj,e5f,e5g,e5h,e5i,e5j,e5v,e5w,e5x,e5y,e5z,e6c,e6d,e6e,e6t,4tg,4th,4tw,4tx,4ty,1oj,1ok,1ol,1om,1on,eck,ecl,ecm,ecz,ed0,ed1,ed2,ed3,510,511,1vn,1vo,1vp,1vq,kus,22s,22t;|;|",
        canEdit:true,
        autosave:false,
        spawn:[28,20,9]
      })
      con.bed = 0
    }
  }
  con.goToRoom(name)
  con.sendJSON({
    type:"eval",
    data:"setHotbar([0,0,0,0,0,0,0,0,0]);clearInv();respawn()"
  })
  con.sendJSON({
    type:"message",
    data:"Wait for other players",
    fromServer:true
  })
  //barrier
  function setBarrier(pos,block){
    room.setBlock(pos[0],pos[1]+9,pos[2],block)
    room.setBlock(pos[0],pos[1]+12,pos[2],block)
    room.setBlock(pos[0]+1,pos[1]+10,pos[2],block)
    room.setBlock(pos[0],pos[1]+10,pos[2]+1,block)
    room.setBlock(pos[0]-1,pos[1]+10,pos[2],block)
    room.setBlock(pos[0],pos[1]+10,pos[2]-1,block)
  }
  
  if(initRoom){
    room.waiting = true
    room.beds = [[28,9,9,true],[10,9,7,true],[25,9,20,true],[10,9,21,true]]
    var interval = setInterval(function(){
      if(!room.players.length){
        server.deleteRoom(name)
        clearInterval(interval)
        return
      }
      if(room.waiting){
        if(room.players.length >= 4){
          room.waiting = false
          for(var p of room.players){
            setBarrier(room.beds[p.bed], 0)
          }
        }else return
      }
      var bedCount = 0
      for(var i = 0; i<room.beds.length; i++){
        var bed = room.beds[i]
        if(bed[3]) bedCount++; else continue
        if(!room.world.getBlock(bed[0],bed[1],bed[2])){
          bed[3] = false
          var player
          for(var p of room.players){
            if(p.bed === i) player = p
          }
          for(var p of room.players){
            p.sendJSON({
              type:"message",
              data:player.username+"'s bed got destroyed",
              fromServer:true
            })
          }
          player.sendJSON({
            type:"eval",
            data:"showTitle('You lost :(','','red')"
          })
        }
      }
      if(bedCount <= 1){
        var bed
        for(var i = 0; i<room.beds.length; i++){
          if(room.beds[i][3]) bed = i
        }
        var winner
        for(var i of room.players){
          if(i.bed === bed){
            i.sendJSON({
              type:"eval",
              data:"showTitle('You won!','','green')"
            })
            winner = i
          }
        }
        if(winner){
          for(var i of room.players){
            i.sendJSON({
              type:"message",
              data:winner.username+" won!",
              fromServer:true
            })
          }
        }
        clearInterval(interval)
        setTimeout(function(){
          server.deleteRoom(name)
          for(var p of room.players){
            p.goToRoom("choose bedwars")
          }
        },5000)
      }
    }, 1000)
  }
  setBarrier(room.beds[con.bed],183)
}, 13,6,12, 17,9,16)

server.on("join", function(con){
  console.log(con.username)
  con.goToRoom("lobby")
  con.sendJSON({
    type:"eval",
    data:"showTitle('Welcome to the server')"
  })
})
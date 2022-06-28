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

server = MineKhanServer(serverPort, "Test server","This server is in development. What should I call this server?", {
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
  spawn:[0,6,0]
})
room.addPortal("creative", 14,5,12, 16,9,14)

//some random place
room = server.createRoom("creative", {
  code:"World;0;8,6,8,0,0,2;Alpha 1.0.5;;;",
  canEdit:true,
  survival:false
})

server.on("join", function(con){
  con.goToRoom("lobby")
  con.sendJSON({
    type:"eval",
    data:"showTitle('Welcome to the server')"
  })
})

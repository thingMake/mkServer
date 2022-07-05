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
  code:"lobby;uo4j23;0,7,0,0,0,1u;Alpha 1.0.5;1,b,o,r,21,22,2v,4a,70,8b,af,eo,hl,ib,4vp,6bv,74b,cnf,cns,cnv,e8b,e8o,e8r,ft7,ftk,ftn,gln,he3,heg,hej,i6j||;0,0,0,vnk,vnl,vnm,vnn,vno,vnp,vnq,vnr,vns,vnt,vnu,vnv,vnw,vnx,vny,vnz,pcg,381,1r9u,vuo,vup,vuq,vur,vus,vut,vuu,vuv,vuw,vux,vuy,vuz,vv0,vv1,vv2,vv3,3f4,3f5,1rgy,w1s,w1t,w1u,w1v,w1w,w1x,w1y,w1z,w20,w21,w22,w23,w24,w25,w26,w27,2dsg,2dsh,1byl,1f4t,1f59,w8w,w8x,w8y,w8z,w90,w91,w92,w93,w94,w95,w96,w97,w98,w99,w9a,w9b,3wt,3x9,3xp,wg0,wg1,wg2,wg3,wg4,wg5,wg6,wg7,wg8,wg9,wga,wgb,wgc,wgd,wge,wgf,wn4,wn5,wn6,wn7,wn8,wn9,wna,wnb,wnc,wnd,wne,wnf,wng,wnh,wni,wnj,k1p,k2l,2bbh,4bh,4bx,wu8,wu9,wua,wub,wuc,wud,wue,wuf,wug,wuh,wui,wuj,wuk,wul,wum,wun,k7x,k8d,k99,4i5,x1c,x1d,x1e,x1f,x1g,x1h,x1i,x1j,x1k,x1l,x1m,x1n,x1o,x1p,x1q,x1r,kfx,2oct,4pp,4q5,x8g,x8h,x8i,x8j,x8k,x8l,x8m,x8n,x8o,x8p,x8q,x8r,x8s,x8t,x8u,x8v,km5,kn1,xfk,xfl,xfm,xfn,xfo,xfp,xfq,xfr,xfs,xft,xfu,xfv,xfw,xfx,xfy,xfz,kv1,1dcd,1gj1,xmo,xmp,xmq,xmr,xms,xmt,xmu,xmv,xmw,xmx,xmy,xmz,xn0,xn1,xn2,xn3,5al,5b1,5bh,xts,xtt,xtu,xtv,xtw,xtx,xty,xtz,xu0,xu1,xu2,xu3,xu4,xu5,xu6,xu7,1dql,1gx9,y0w,y0x,y0y,y0z,y10,y11,y12,y13,y14,y15,y16,y17,y18,y19,y1a,y1b,y80,y81,y82,y83,y84,y85,y86,y87,y88,y89,y8a,y8b,y8c,y8d,y8e,y8f,29ng,29nh,29ni,1hbh,yf4,yf5,yf6,yf7,yf8,yf9,yfa,yfb,yfc,yfd,yfe,yff,yfg,yfh,yfi,yfj,1qvv,cbg,cbh,cbi,20db,2d2l,1hhp,63h,63x,ym8,ym9,yma,ymb,ymc,ymd,yme,ymf,ymg,ymh,ymi,ymj,ymk,yml,ymm,ymn,1r2z,cik,cil,cim,20kf,1hnh,699,33x,1hpp;0,0,1,vnk,vnl,sia,vuo,vup,spe,w1s,w1t,swi,w8w,w8x,t3m,wg0,wg1,taq,wn4,wn5,thu,wu8,wu9,toy,x1c,x1d,tw2,x8g,x8h,u36,xfk,xfl,uaa,xmo,xmp,uhe,xts,xtt,uoi,y0w,y0x,uvm,y80,y81,v2q,yf4,yf5,v9u,ym8,ym9,vgy;0,1,1,12fu,12ga,12my,12ne,12ru,12sa,12sq,12t6,12tm,12u2,12ui,12yy,12ze,12zu,130a,130q,1316,131m,138a,138q,13fe,13fu;0,0,-1,vnu,vnv,vnw,vnx,vny,vnz,sih,1hsu,38f,vuy,vuz,vv0,vv1,vv2,vv3,spl,1hzy,3fj,w22,w23,w24,w25,w26,w27,swp,2dsv,w96,w97,w98,w99,w9a,w9b,t3t,wga,wgb,wgc,wgd,wge,wgf,tax,wne,wnf,wng,wnh,wni,wnj,ti1,wui,wuj,wuk,wul,wum,wun,tp5,x1m,x1n,x1o,x1p,x1q,x1r,tw9,x8q,x8r,x8s,x8t,x8u,x8v,u3d,xfu,xfv,xfw,xfx,xfy,xfz,uah,xmy,xmz,xn0,xn1,xn2,xn3,uhl,xu2,xu3,xu4,xu5,xu6,xu7,uop,y16,y17,y18,y19,y1a,y1b,uvt,y8a,y8b,y8c,y8d,y8e,y8f,v2x,yfe,yff,yfg,yfh,yfi,yfj,va1,ymi,ymj,ymk,yml,ymm,ymn,vh5;1,0,0,vnk,vnl,vnm,vnn,vno,vnp,vnq,vnr,vns,vnt,vnu,vnv,vnw,vnx,vny,vnz,1o4b,9jw,9jx,9jy,1xlr,2my5,vuo,vup,vuq,vur,vus,vut,vuu,vuv,vuw,vux,vuy,vuz,vv0,vv1,vv2,vv3,2jx8,2jx9,2jxa,2n6l,2n71,w1s,w1t,w1u,w1v,w1w,w1x,w1y,w1z,w20,w21,w22,w23,w24,w25,w26,w27,2aql,2ar1,w8w,w8x,w8y,w8z,w90,w91,w92,w93,w94,w95,w96,w97,w98,w99,w9a,w9b,wg0,wg1,wg2,wg3,wg4,wg5,wg6,wg7,wg8,wg9,wga,wgb,wgc,wgd,wge,wgf,1fil,2b4t,2b59,wn4,wn5,wn6,wn7,wn8,wn9,wna,wnb,wnc,wnd,wne,wnf,wng,wnh,wni,wnj,wu8,wu9,wua,wub,wuc,wud,wue,wuf,wug,wuh,wui,wuj,wuk,wul,wum,wun,2o5p,2bj1,2o6l,x1c,x1d,x1e,x1f,x1g,x1h,x1i,x1j,x1k,x1l,x1m,x1n,x1o,x1p,x1q,x1r,4p9,4pp,4q5,x8g,x8h,x8i,x8j,x8k,x8l,x8m,x8n,x8o,x8p,x8q,x8r,x8s,x8t,x8u,x8v,xfk,xfl,xfm,xfn,xfo,xfp,xfq,xfr,xfs,xft,xfu,xfv,xfw,xfx,xfy,xfz,1dcd,1gj1,xmo,xmp,xmq,xmr,xms,xmt,xmu,xmv,xmw,xmx,xmy,xmz,xn0,xn1,xn2,xn3,2oy5,5b1,2fhp,uog,uoh,uoi,uoj,uok,uol,uom,uon,uoo,uop,uoq,uor,uos,uot,uou,uov;1,0,1,vnk,vnl,sia,vuo,vup,spe,w1s,w1t,swi,w8w,w8x,t3m,wg0,wg1,taq,wn4,wn5,thu,wu8,wu9,toy,x1c,x1d,tw2,x8g,x8h,u36,xfk,ua9,uhc;1,0,-1,vnu,vnv,vnw,vnx,vny,vnz,sih,vuy,vuz,vv0,vv1,vv2,vv3,spl,w22,w23,w24,w25,w26,w27,swp,w96,w97,w98,w99,w9a,w9b,t3t,wga,wgb,wgc,wgd,wge,wgf,tax,wne,wnf,wng,wnh,wni,wnj,ti1,wui,wuj,wuk,wul,wum,wun,tp5,x1m,x1n,x1o,x1p,x1q,x1r,tw9,x8q,x8r,x8s,x8t,x8u,x8v,u3d,xfv,xfw,xfx,xfy,xfz,uai,xn0,xn1,xn2,xn3,uhn,uos,uot,uou,uov;-2,0,0,1eq5,1bkt,1er1,spc,spd,spe,spf,spg,sph,spi,spj,spk,spl,spm,spn,spo,spp,spq,spr,1brh,1exp,1ey5,w1s,w1t,w1u,w1v,w1w,w1x,w1y,w1z,w20,w21,w22,w23,w24,w25,w26,w27,1byl,1bzh,w8w,w8x,w8y,w8z,w90,w91,w92,w93,w94,w95,w96,w97,w98,w99,w9a,w9b,wg0,wg1,wg2,wg3,wg4,wg5,wg6,wg7,wg8,wg9,wga,wgb,wgc,wgd,wge,wgf,43x,1cdp,wn4,wn5,wn6,wn7,wn8,wn9,wna,wnb,wnc,wnd,wne,wnf,wng,wnh,wni,wnj,4bh,1fql,wu8,wu9,wua,wub,wuc,wud,wue,wuf,wug,wuh,wui,wuj,wuk,wul,wum,wun,4i5,4il,4j1,x1c,x1d,x1e,x1f,x1g,x1h,x1i,x1j,x1k,x1l,x1m,x1n,x1o,x1p,x1q,x1r,x8g,x8h,x8i,x8j,x8k,x8l,x8m,x8n,x8o,x8p,x8q,x8r,x8s,x8t,x8u,x8v,4wd,4wt,22gd,xfk,xfl,xfm,xfn,xfo,xfp,xfq,xfr,xfs,xft,xfu,xfv,xfw,xfx,xfy,xfz,1dct,54d,xmo,xmp,xmq,xmr,xms,xmt,xmu,xmv,xmw,xmx,xmy,xmz,xn0,xn1,xn2,xn3,5al,5b1,2fhp,xts,xtt,xtu,xtv,xtw,xtx,xty,xtz,xu0,xu1,xu2,xu3,xu4,xu5,xu6,xu7,y0w,y0x,y0y,y0z,y10,y11,y12,y13,y14,y15,y16,y17,y18,y19,y1a,y1b,2cp9,5p9,5pp,y80,y81,y82,y83,y84,y85,y86,y87,y88,y89,y8a,y8b,y8c,y8d,y8e,y8f,5vx,yf4,yf5,yf6,yf7,yf8,yf9,yfa,yfb,yfc,yfd,yfe,yff,yfg,yfh,yfi,yfj,1hhp,63h,63x,ym8,ym9,yma,ymb,ymc,ymd,yme,ymf,ymg,ymh,ymi,ymj,ymk,yml,ymm,ymn,6a5;-2,0,1,swg,w8w,t3l,wg0,wg1,taq,wn4,wn5,thu,wu8,wu9,toy,x1c,x1d,tw2,x8g,x8h,u36,xfk,xfl,uaa,xmo,xmp,uhe,xts,xtt,uoi,y0w,y0x,uvm,y80,y81,v2q,yf4,yf5,v9u,ym8,ym9,vgy;-2,1,1,f4q,f56,11a2,fbu,fca,11h6,fgq,fh6,fhm,fi2,fii,fiy,fje,11oa,fnu,foa,foq,fp6,fpm,fq2,fqi,11ve;-2,0,-1,spo,spp,spq,spr,w24,w25,w26,w27,swr,w97,w98,w99,w9a,w9b,t3u,wga,wgb,wgc,wgd,wge,wgf,tax,wne,wnf,wng,wnh,wni,wnj,ti1,wui,wuj,wuk,wul,wum,wun,tp5,x1m,x1n,x1o,x1p,x1q,x1r,tw9,x8q,x8r,x8s,x8t,x8u,x8v,u3d,xfu,xfv,xfw,xfx,xfy,xfz,uah,xmy,xmz,xn0,xn1,xn2,xn3,uhl,xu2,xu3,xu4,xu5,xu6,xu7,uop,y16,y17,y18,y19,y1a,y1b,uvt,y8a,y8b,y8c,y8d,y8e,y8f,v2x,yfe,yff,yfg,yfh,yfi,yfj,va1,ymi,ymj,ymk,yml,ymm,ymn,vh5;-1,0,0,vnk,vnl,vnm,vnn,vno,vnp,vnq,vnr,vns,vnt,vnu,vnv,vnw,vnx,vny,vnz,23x8,23x9,23xa,2mz1,3bx,3cd,vuo,vup,vuq,vur,vus,vut,vuu,vuv,vuw,vux,vuy,vuz,vv0,vv1,vv2,vv3,1l5n,6l8,6l9,6la,1un3,2ahp,w1s,w1t,w1u,w1v,w1w,w1x,w1y,w1z,w20,w21,w22,w23,w24,w25,w26,w27,1lcr,6sc,6sd,6se,1uu7,1f2l,3od,18rx,1f4d,3q5,1bzh,w8w,w8x,w8y,w8z,w90,w91,w92,w93,w94,w95,w96,w97,w98,w99,w9a,w9b,1ljv,6zg,6zh,6zi,1v1b,2nj1,3wt,3xp,wg0,wg1,wg2,wg3,wg4,wg5,wg6,wg7,wg8,wg9,wga,wgb,wgc,wgd,wge,wgf,2hcs,2hct,2hcu,43x,44d,44t,wn4,wn5,wn6,wn7,wn8,wn9,wna,wnb,wnc,wnd,wne,wnf,wng,wnh,wni,wnj,wu8,wu9,wua,wub,wuc,wud,wue,wuf,wug,wuh,wui,wuj,wuk,wul,wum,wun,1cr1,1crh,1fxp,x1c,x1d,x1e,x1f,x1g,x1h,x1i,x1j,x1k,x1l,x1m,x1n,x1o,x1p,x1q,x1r,4p9,4pp,4q5,x8g,x8h,x8i,x8j,x8k,x8l,x8m,x8n,x8o,x8p,x8q,x8r,x8s,x8t,x8u,x8v,xfk,xfl,xfm,xfn,xfo,xfp,xfq,xfr,xfs,xft,xfu,xfv,xfw,xfx,xfy,xfz,2f9p,2c4d,2orx,xmo,xmp,xmq,xmr,xms,xmt,xmu,xmv,xmw,xmx,xmy,xmz,xn0,xn1,xn2,xn3,5al,5b1,5bh,xts,xtt,xtu,xtv,xtw,xtx,xty,xtz,xu0,xu1,xu2,xu3,xu4,xu5,xu6,xu7,y0w,y0x,y0y,y0z,y10,y11,y12,y13,y14,y15,y16,y17,y18,y19,y1a,y1b,y80,y81,y82,y83,y84,y85,y86,y87,y88,y89,y8a,y8b,y8c,y8d,y8e,y8f,yf4,yf5,yf6,yf7,yf8,yf9,yfa,yfb,yfc,yfd,yfe,yff,yfg,yfh,yfi,yfj,23io,23ip,ym8,ym9,yma,ymb,ymc,ymd,yme,ymf,ymg,ymh,ymi,ymj,ymk,yml,ymm,ymn,66o,66p,1u8i;-1,0,1,vnk,vnl,sia,vuo,vup,spe,w1s,w1t,swi,w8w,w8x,t3m,wg0,wg1,taq,wn4,wn5,thu,wu8,wu9,toy,x1c,x1d,tw2,x8g,x8h,u36,xfk,xfl,uaa,xmo,xmp,uhe,xts,xtt,uoi,y0w,y0x,uvm,y80,y81,v2q,yf4,yf5,v9u,ym8,ym9,vgy;-1,1,1,cre,cru,ywq,cyi,cyy,z3u,mze,mzu,n16,n62,n6y,n7e,n8a,n8q,nd6,nei,nfe,nfu,nka,nlm,nm2,nmi,nmy,nru,nt6,ntm,i16,17bu,i3u,17ei,i8a,17iy,i9m,17ka,iay,17lm,ife,17q2,igq,17re,ii2,17sq,imi,imy,ine,inu,ioa,ioq,ip6,17zu,itm,iu2,iui,iuy,ive,ivu,iwa,186y;-1,0,-1,vnu,vnv,vnw,vnx,vny,vnz,sih,vuy,vuz,vv0,vv1,vv2,vv3,spl,w22,w23,w24,w25,w26,w27,swp,w96,w97,w98,w99,w9a,w9b,t3t,wga,wgb,wgc,wgd,wge,wgf,tax,wne,wnf,wng,wnh,wni,wnj,ti1,wui,wuj,wuk,wul,wum,wun,tp5,x1m,x1n,x1o,x1p,x1q,x1r,tw9,x8q,x8r,x8s,x8t,x8u,x8v,u3d,xfu,xfv,xfw,xfx,xfy,xfz,uah,xmy,xmz,xn0,xn1,xn2,xn3,uhl,xu2,xu3,xu4,xu5,xu6,xu7,uop,y16,y17,y18,y19,y1a,y1b,uvt,y8a,y8b,y8c,y8d,y8e,y8f,v2x,yfe,yff,yfg,yfh,yfi,yfj,va1,23j3,ymi,ymj,ymk,yml,ymm,ymn,vh5,1kri,673;|;|",
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
  code:"World;0;8,6,8,0,0,1u;Alpha 1.0.5;2,b,u,1l,70,a6,6bv,74b,cnf,cop,e8b,e9l,ft7,fuh,gln,he3,hfd,i6j||;0,0,0,fuo,fup,fuq,fur,fus,fut,fuu,fuv,fuw,fux,fuy,fuz,fv0,fv1,fv2,fv3,g1s,g1t,g1u,g1v,g1w,g1x,g1y,g1z,g20,g21,g22,g23,g24,g25,g26,g27,g8w,g8x,g8y,g8z,g90,g91,g92,g93,g94,g95,g96,g97,g98,g99,g9a,g9b,gg0,gg1,gg2,gg3,gg4,gg5,gg6,gg7,gg8,gg9,gga,ggb,ggc,ggd,gge,ggf,gn4,gn5,gn6,gn7,gn8,gn9,gna,gnb,gnc,gnd,gne,gnf,gng,gnh,gni,gnj,gu8,gu9,gua,gub,guc,gud,gue,guf,gug,guh,gui,guj,guk,gul,gum,gun,h1c,h1d,h1e,h1f,h1g,h1h,h1i,h1j,h1k,h1l,h1m,h1n,h1o,h1p,h1q,h1r,h8g,h8h,h8i,h8j,h8k,h8l,h8m,h8n,e2w,h8p,h8q,h8r,h8s,h8t,h8u,h8v,x1s,hfk,hfl,hfm,hfn,hfo,hfp,hfq,e9z,ea0,ea1,hfu,hfv,hfw,hfx,hfy,hfz,x8w,hmo,hmp,hmq,hmr,hms,hmt,hmu,hmv,eh4,hmx,hmy,hmz,hn0,hn1,hn2,hn3,xg0,hts,htt,htu,htv,htw,htx,hty,htz,hu0,hu1,hu2,hu3,hu4,hu5,hu6,hu7,i0w,i0x,i0y,i0z,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i1a,i1b,1dq6,1k26,i80,i81,i82,i83,i84,i85,i86,i87,i88,i89,i8a,i8b,i8c,i8d,i8e,i8f,14fy,1ary,if4,if5,if6,if7,if8,if9,ifa,ifb,ifc,ifd,ife,iff,ifg,ifh,ifi,ifj,17q5,17q6,17q7,im8,im9,ima,imb,imc,imd,ime,imf,img,imh,imi,imj,imk,iml,imm,imn,va4,cbh,cbi,cbj,1b4u,62m,632,63i,63y,itc,itd,ite,itf,itg,ith,iti,itj,itk,itl,itm,itn,ito,itp,itq,itr,vh8,cil,cim,cin,p72,68u;0,0,1,fuo,fup,fuq,fur,6dw,g1s,g1t,g1u,g1v,90,6l0,g8w,g8x,g8y,g8z,g4,6s4,gg0,gg1,gg2,gg3,n8,6z8,gn4,gn5,gn6,gn7,76c,gu8,gu9,gua,gub,7dg,h1c,h1d,h1e,h1f,18k,7kk,h8g,h8h,h8i,h8j,1fo,7ro,hfk,hfl,hfm,hfn,1ms,7ys,hmo,hmp,hmq,hmr,85w,hts,htt,htu,htv,210,8d0,i0w,i0x,i0y,i0z,8k4,i80,i81,i82,i83,2f8,8r8,if4,if5,if6,if7,8yc,im8,im9,ima,imb,11lc,95g,itc,itd,ite,itf,30k,11sg,9ck;0,0,-1,20,fux,fuy,fuz,fv0,fv1,fv2,fv3,6e0,g21,g22,g23,g24,g25,g26,g27,6l4,g8,g95,g96,g97,g98,g99,g9a,g9b,6s8,nc,gg9,gga,ggb,ggc,ggd,gge,ggf,6zc,gnd,gne,gnf,gng,gnh,gni,gnj,76g,43i,43y,44e,guh,gui,guj,guk,gul,gum,gun,7dk,1326,1ivi,19em,18o,h1l,h1m,h1n,h1o,h1p,h1q,h1r,7ko,136l,136m,136n,h8p,h8q,h8r,h8s,h8t,h8u,h8v,7rs,qqk,4m5,4m6,4m7,19r2,1j9a,1j9q,1mw,hft,hfu,hfv,hfw,hfx,hfy,hfz,7yw,qxo,4t9,4ta,4tb,nta,4v2,19z2,19zi,1u0,hmx,hmy,hmz,hn0,hn1,hn2,hn3,860,r4s,50d,50e,50f,1jmm,214,hu1,hu2,hu3,hu4,hu5,hu6,hu7,8d4,1dgd,1dge,1dgf,1dj2,1jv2,288,i15,i16,i17,i18,i19,i1a,i1b,8k8,2fc,i89,i8a,i8b,i8c,i8d,i8e,i8f,8rc,5oe,5ou,5pa,2mg,ifd,ife,iff,ifg,ifh,ifi,ifj,8yg,ou6,lou,imh,imi,imj,imk,iml,imm,imn,95k,lvi,p1q,itl,itm,itn,ito,itp,itq,itr,9co;1,0,0,fuo,fup,fuq,fur,fus,fut,fuu,fuv,fuw,fux,fuy,fuz,fv0,fv1,fv2,fv3,sik,9jx,9jy,9jz,1hum,1bjy,1hvy,g1s,g1t,g1u,g1v,g1w,g1x,g1y,g1z,g20,g21,g22,g23,g24,g25,g26,g27,1eu5,1eu6,1eu7,129q,18lq,g8w,g8x,g8y,g8z,g90,g91,g92,g93,g94,g95,g96,g97,g98,g99,g9a,g9b,gg0,gg1,gg2,gg3,gg4,gg5,gg6,gg7,gg8,gg9,gga,ggb,ggc,ggd,gge,ggf,18z2,3we,12oe,3xq,gn4,gn5,gn6,gn7,gn8,gn9,gna,gnb,gnc,gnd,gne,gnf,gng,gnh,gni,gnj,432,1cce,43y,197i,44u,gu8,gu9,gua,gub,guc,gud,gue,guf,gug,guh,gui,guj,guk,gul,gum,gun,4a6,1ivi,4bi,1cku,h1c,h1d,h1e,h1f,h1g,h1h,h1i,h1j,h1k,h1l,h1m,h1n,h1o,h1p,h1q,h1r,h8g,h8h,h8i,h8j,h8k,h8l,h8m,h8n,h8o,h8p,h8q,h8r,h8s,h8t,h8u,h8v,hfk,hfl,hfm,hfn,hfo,hfp,hfq,hfr,hfs,hft,hfu,hfv,hfw,hfx,hfy,hfz,hmo,hmp,hmq,hmr,hms,hmt,hmu,hmv,hmw,hmx,hmy,hmz,hn0,hn1,hn2,hn3,20y,215,216,217,218,21b,8cw,8cx,8cy,8cz,8d0,8d1,8d2,8d3,8d4,8d5,8d6,8d7,8d8,8d9,8da,8db;1,0,1,fuo,fup,fuq,fur,1w,yts,6dw,g1s,g1t,g1u,g1v,90,6l0,g8w,g8x,g8y,g8z,g4,6s4,gg0,gg1,gg2,gg3,n8,6z8,gn4,gn5,gn6,gn7,uc,76c,gu8,gu9,gua,gub,7dg,h1c,h1d,h1e,h1f,18k,7kk,h8g,h8h,h8i,h8j,1fo,7ro,hfk,hfl,hfm,1mr,7yr,hmo,hmp,1tu,85u,20x,8cw,8cx;1,0,-1,20,fux,fuy,fuz,fv0,fv1,fv2,fv3,6e0,94,g21,g22,g23,g24,g25,g26,g27,6l4,g8,g95,g96,g97,g98,g99,g9a,g9b,6s8,nc,gg9,gga,ggb,ggc,ggd,gge,ggf,6zc,ug,gnd,gne,gnf,gng,gnh,gni,gnj,76g,11k,guh,gui,guj,guk,gul,gum,gun,7dk,18o,h1l,h1m,h1n,h1o,h1p,h1q,h1r,7ko,h8p,h8q,h8r,h8s,h8t,h8u,h8v,7rs,hfu,hfv,hfw,hfx,hfy,hfz,7yx,1u2,hmz,hn0,hn1,hn2,hn3,862,218,219,21b,8d7,8d8,8d9,8da,8db;-1,0,0,1ts,1tu,1tw,1tx,1tz,1u0,1u1,1u2,1u3,1u5,1u6,1u7,85s,85t,85u,85v,85w,85x,85y,85z,860,861,862,863,864,865,866,867,hts,htt,htu,htv,htw,htx,hty,htz,hu0,hu1,hu2,hu3,hu4,hu5,hu6,hu7,i0w,i0x,i0y,i0z,i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,i1a,i1b,i80,i81,i82,i83,i84,i85,i86,i87,i88,i89,i8a,i8b,i8c,i8d,i8e,i8f,if4,if5,if6,if7,if8,if9,ifa,ifb,ifc,ifd,ife,iff,ifg,ifh,ifi,ifj,im8,im9,ima,imb,imc,imd,ime,imf,img,imh,imi,imj,imk,iml,imm,imn,itc,itd,ite,itf,itg,ith,iti,itj,itk,itl,itm,itn,ito,itp,itq,itr;-1,0,1,1tt,85s,85t,hts,htt,20y,8cy,i0w,i0x,i0y,8k3,i80,i81,i82,i83,8r8,if4,if5,if6,if7,8yc,im8,im9,ima,imb,2tg,95g,itc,itd,ite,itf,9ck;-1,0,-1,1u4,1u5,1u6,1u7,863,864,865,866,867,216,hu3,hu4,hu5,hu6,hu7,8d6,289,i16,i17,i18,i19,i1a,i1b,8k9,2fc,i89,i8a,i8b,i8c,i8d,i8e,i8f,8rc,ifd,ife,iff,ifg,ifh,ifi,ifj,8yg,imh,imi,imj,imk,iml,imm,imn,95k,itl,itm,itn,ito,itp,itq,itr,9co;|;|",
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
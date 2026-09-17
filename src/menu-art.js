'use strict';
// Cache previews of real scenery, never the characters from mockup images.
const RubraMenuArt={cache:{},preview(id){
 if(this.cache[id])return this.cache[id];
 const backup=map,pixels=document.createElement('canvas');pixels.width=W;pixels.height=H;pixels.getContext('2d').drawImage(canvas,0,0);
 const out=document.createElement('canvas');out.width=480;out.height=270;
 try{map=C.maps[id];buildGround();ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);ctx.imageSmoothingEnabled=false;
  if(id==='ice')ctx.drawImage(ground,0,0,ground.width,ground.height,0,0,W,H);
  else{ctx.drawImage(ground,0,0,W,H,0,0,W,H);for(const e of [...scenery].sort((a,b)=>a.y-b.y)){if(e.x>W+100||e.y>H+130)continue;if(e.type==='tree'){if(id==='necropolis')RubraWorld.tree(e);else tree(e.x,e.y,e.s);}else pillar(e.x,e.y);}}
  const q=out.getContext('2d');q.imageSmoothingEnabled=false;q.drawImage(canvas,0,0,480,270);this.cache[id]=out;
 }finally{ctx.restore();map=backup;buildGround();ctx.drawImage(pixels,0,0);}
 return out;
}};

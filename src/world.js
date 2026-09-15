'use strict';
const RubraWorld={
 camera(map,player,width=960,height=540){const w=map.world;return w?{x:Math.round(Math.max(0,Math.min(w.width-width,player.x-width/2))),y:Math.round(Math.max(0,Math.min(w.height-height,player.y-height/2)))}:{x:0,y:0};},
 expandGround(){
  const w=map.world;if(!w)return;
  const tile=document.createElement('canvas');tile.width=W;tile.height=H;tile.getContext('2d').drawImage(ground,0,0,W,H,0,0,W,H);
  ground.width=w.width;ground.height=w.height;g.imageSmoothingEnabled=false;
  for(let y=0;y<w.height;y+=H)for(let x=0;x<w.width;x+=W)g.drawImage(tile,x,y);
  scenery.length=0;
  for(let x=12;x<w.width;x+=83){scenery.push({type:'tree',x,y:60,s:.36});scenery.push({type:'tree',x,y:w.height+25,s:.45});}
  for(let y=160;y<w.height;y+=130){scenery.push({type:'tree',x:10,y,s:.4});scenery.push({type:'tree',x:w.width-5,y,s:.4});}
  for(const o of map.obstacles)scenery.push({...o,type:o.kind,s:o.kind==='tree'?.4:.45});
 },
 renderBase(camera){
  ctx.drawImage(ground,camera.x,camera.y,W,H,camera.x,camera.y,W,H);
  const entities=[...scenery.map(e=>({...e,scenery:true})),...enemies.filter(e=>!e.dead),{type:'hero',...player,isPlayer:true}];
  entities.sort((a,b)=>a.y-b.y);
  for(const e of entities){if(e.x<camera.x-130||e.x>camera.x+W+130||e.y<camera.y-50||e.y>camera.y+H+160)continue;
   if(e.scenery){if(e.type==='tree')tree(e.x,e.y,e.s);else pillar(e.x,e.y);continue;}
   shadow(e.x,e.y,e.type==='boss'?29:13);ctx.save();if(e.isPlayer&&player.invuln>0&&Math.floor(time*14)%2===0)ctx.globalAlpha=.4;else if(e.flash>0)ctx.globalAlpha=.5;
   drawSprite(e.type,e.x,e.y,2,0,e.x>player.x,e.flash);ctx.restore();
  }
  for(const p of particles){ctx.globalAlpha=Math.min(1,p.life/.3);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);}ctx.globalAlpha=1;ctx.textAlign='center';ctx.font='bold 12px monospace';
  for(const t of texts){ctx.globalAlpha=Math.min(1,t.life*3);ctx.fillStyle=t.color;ctx.fillText(t.text,t.x,t.y);}ctx.globalAlpha=1;
 }
};
if(typeof module!=='undefined')module.exports=RubraWorld;

'use strict';
// Original Canvas pixel silhouettes, shared between HUD and combat rendering.
const RubraWeaponArt=(()=>{
 const icons={};
 function paint(q,id){
  const rect=(x,y,w,h,color)=>{q.fillStyle=color;q.fillRect(x,y,w,h);};
  const poly=(points,color)=>{q.fillStyle=color;q.beginPath();points.forEach(([x,y],i)=>i?q.lineTo(x,y):q.moveTo(x,y));q.closePath();q.fill();};
  if(id==='blade'||id==='dagger'||id==='lance'){
   const long=id==='lance',red=id==='dagger',tint=long?'#a3f3db':red?'#ffacc0':'#f5e9d0';
   poly([[0,-15],[long?5:4,-8],[3,6],[-3,6],[-4,-8]],'#211a32');
   poly([[0,-13],[3,-7],[2,5],[-2,5],[-2,-6]],tint);rect(0,-8,1,12,'#ffffff');
   rect(-5,5,10,2,long?'#41a58f':'#b48750');rect(-2,7,4,7,'#462738');rect(-1,7,2,5,red?'#ca425f':'#957647');rect(-2,13,4,2,'#e9bb73');rect(-1,4,2,3,red?'#e54064':'#754caa');
  }else if(id==='acorn'){
   poly([[0,-13],[7,-5],[5,6],[0,11],[-5,6],[-7,-5]],'#21392e');poly([[0,-11],[5,-4],[3,5],[0,8],[-3,4],[-5,-4]],'#9ad58b');poly([[0,-9],[2,-3],[0,5],[-2,-2]],'#edf5b1');rect(-6,5,12,3,'#79532c');rect(-2,8,4,4,'#ae8245');
  }else if(id==='thorns'){
   for(let i=0;i<6;i++){q.save();q.rotate(i*Math.PI/3);poly([[-3,-5],[0,-14],[3,-6],[2,-2]],i%2?'#e2c3fa':'#9d65b9');q.restore();}
   rect(-4,-4,8,8,'#312144');rect(-2,-2,4,4,'#f1bce0');
  }else if(id==='ember'){
   q.strokeStyle='#d6964f';q.lineWidth=2;q.strokeRect(-11,-11,22,22);poly([[0,-14],[10,5],[5,11],[-6,11],[-10,5]],'#8b3542');poly([[1,-9],[5,2],[3,8],[-4,8],[-5,3]],'#f5a354');rect(-1,2,3,6,'#fff1a0');
  }
 }
 function item(q,id,x,y,angle=0,scale=1){q.save();q.imageSmoothingEnabled=false;q.translate(Math.round(x),Math.round(y));q.rotate(angle);q.scale(scale,scale);paint(q,id);q.restore();}
 function iconHtml(id){if(!icons[id]){const c=document.createElement('canvas');c.width=c.height=32;item(c.getContext('2d'),id,16,16);icons[id]=c.toDataURL();}return `<img class="weapon-icon" alt="" src="${icons[id]}">`;}
 function shot(q,s){const a=Math.atan2(s.vy,s.vx),n=Math.hypot(s.vx,s.vy)||1;
  q.save();q.strokeStyle=s.color;q.lineWidth=s.hostile?3:2;q.globalAlpha=.35;q.beginPath();q.moveTo(s.x,s.y);q.lineTo(s.x-s.vx/n*(s.hostile?10:22),s.y-s.vy/n*(s.hostile?10:22));q.stroke();q.globalAlpha=1;
  if(s.hostile){q.fillStyle='#261327';q.fillRect(s.x-4,s.y-4,8,8);q.fillStyle=s.color;q.fillRect(s.x-3,s.y-3,6,6);q.fillStyle='#ffe2e5';q.fillRect(s.x-1,s.y-1,2,2);}else item(q,s.weapon||'dagger',s.x,s.y,a+Math.PI/2,s.kind==='piercing'?.8:.55);q.restore();
 }
 function orbit(q,slot,player,time,stats){for(let i=0;i<stats.count;i++){const a=time*RubraConfig.visuals.orbitSpeed+i*Math.PI*2/stats.count,x=player.x+Math.cos(a)*stats.range,y=player.y+Math.sin(a)*stats.range;
  q.save();q.strokeStyle=stats.color;q.globalAlpha=.18;q.lineWidth=2;q.beginPath();q.arc(player.x,player.y,stats.range,a-.3,a);q.stroke();q.restore();item(q,slot.id,x,y,a+Math.PI/2,slot.id==='blade'?.75:.6);}}
 function effect(q,e,time){q.save();const fade=Math.max(0,e.life/e.max);q.strokeStyle=e.color;q.lineWidth=2;q.globalAlpha=Math.min(.8,fade+.15);q.beginPath();q.arc(e.x,e.y,e.r,0,Math.PI*2);q.stroke();
  if(e.kind==='area'){
   q.beginPath();q.arc(e.x,e.y,e.r*(e.hit?1.1:.8),0,Math.PI*2);q.stroke();
   for(let i=0;i<6;i++){const a=i*Math.PI/3+time*.3;item(q,'ember',e.x+Math.cos(a)*e.r*.8,e.y+Math.sin(a)*e.r*.8,a,.28);}
   if(e.hit){q.fillStyle=e.color;q.globalAlpha=fade*.22;q.beginPath();q.arc(e.x,e.y,e.r,0,Math.PI*2);q.fill();q.globalAlpha=fade;for(let i=0;i<8;i++){const a=i*Math.PI/4;q.fillRect(e.x+Math.cos(a)*e.r*(1-fade)-2,e.y+Math.sin(a)*e.r*(1-fade)-2,4,4);}}else item(q,'ember',e.x,e.y,0,.65);
  }else{q.globalAlpha=fade*.45;q.lineWidth=3;q.beginPath();q.arc(e.x,e.y,e.r,time*5,time*5+Math.PI*1.3);q.stroke();}q.restore();
 }
 return {item,iconHtml,shot,orbit,effect};
})();

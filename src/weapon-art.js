'use strict';
// Original Canvas pixel silhouettes, shared between HUD and combat rendering.
const RubraWeaponArt=(()=>{
 const icons={};
 function paint(q,id){if(typeof RubraProfane!=='undefined'&&RubraProfane.paint(q,id))return;
  const rect=(x,y,w,h,color)=>{q.fillStyle=color;q.fillRect(x,y,w,h);};
  const poly=(points,color)=>{q.fillStyle=color;q.beginPath();points.forEach(([x,y],i)=>i?q.lineTo(x,y):q.moveTo(x,y));q.closePath();q.fill();};
  if(id==='absolute'){
   poly([[0,-16],[6,-9],[4,5],[0,9],[-4,5],[-6,-9]],'#18223e');
   poly([[0,-14],[4,-8],[2,5],[0,7],[-3,-7]],'#65d8ef');
   poly([[0,-14],[1,-7],[0,5],[-2,-7]],'#f0ffff');
   for(let y=-7;y<4;y+=4){rect(-1,y,3,1,'#4567af');rect(1,y+1,1,2,'#d6ffff');}
   poly([[-12,1],[-8,7],[-2,6],[0,9],[2,6],[8,7],[12,1],[8,3],[0,4],[-8,3]],'#a689d4');
   rect(-2,7,4,7,'#253054');rect(-1,8,2,5,'#d2bc87');rect(-3,13,6,2,'#789ccb');rect(-1,4,3,3,'#ffffff');
  }else if(['frostbolt','comet','halo','prism','glaive','blizzard'].includes(id)){
   if(id==='frostbolt'||id==='prism'){poly([[0,-15],[7,-3],[3,12],[-3,12],[-7,-3]],'#20364e');poly([[0,-13],[5,-3],[1,10],[-4,-3]],'#70cfff');poly([[0,-12],[1,-1],[-2,5],[-2,-3]],'#e9ffff');if(id==='prism'){q.strokeStyle='#ba9cf4';q.lineWidth=1;q.strokeRect(-10,-8,20,16);rect(-2,-2,4,4,'#ffffff');}}
   if(id==='comet'){poly([[0,-13],[9,-7],[11,4],[3,12],[-7,9],[-11,-1],[-7,-9]],'#3d62a0');poly([[0,-11],[7,-5],[7,4],[1,8],[-6,3],[-5,-5]],'#9ce4ff');poly([[0,-8],[4,0],[0,5],[-3,0]],'#f2ffff');rect(-9,7,3,4,'#74abff');}
   if(id==='halo'){for(let i=0;i<5;i++){q.save();q.rotate(i*Math.PI*2/5);poly([[-2,-5],[0,-15],[4,-8],[2,-3]],'#b4f4ff');rect(0,-10,1,7,'#5c9fce');q.restore();}rect(-3,-3,6,6,'#5185b3');rect(-1,-1,2,2,'#eaffff');}
   if(id==='glaive'){rect(-1,1,3,13,'#405981');rect(0,3,1,10,'#b9dcea');poly([[0,-16],[7,-9],[4,2],[0,7],[-4,2],[-6,-8]],'#325580');poly([[0,-14],[4,-8],[2,1],[0,4],[-3,-6]],'#a1e8ff');rect(0,-9,1,10,'#ffffff');rect(-6,2,13,2,'#b8d4e5');}
   if(id==='blizzard'){rect(-1,-5,3,20,'#4c647c');rect(0,-3,1,17,'#c8e4e9');for(let i=0;i<6;i++){q.save();q.translate(0,-7);q.rotate(i*Math.PI/3);rect(-1,-8,2,9,'#8ce4ff');rect(-3,-6,6,1,'#d6ffff');q.restore();}rect(-2,-9,4,4,'#ffffff');}
  }else if(id==='cinder'){
   rect(-2,-6,4,20,'#291825');rect(-1,-3,2,17,'#a86a3e');rect(-5,0,10,2,'#e9b55e');poly([[0,-15],[7,-5],[4,2],[-4,2],[-7,-5]],'#7e2932');poly([[1,-13],[4,-6],[2,0],[-3,0],[-4,-5]],'#ff9348');rect(-1,-6,2,5,'#fff4bf');
  }else if(id==='chain'){
   q.strokeStyle='#d5b579';q.lineWidth=2;q.beginPath();q.arc(0,0,10,0,Math.PI*2);q.stroke();for(let i=0;i<6;i++){const a=i*Math.PI/3;rect(Math.round(Math.cos(a)*10)-2,Math.round(Math.sin(a)*10)-2,4,4,'#88bfea');}poly([[2,-13],[-6,2],[0,2],[-2,14],[7,-3],[1,-3]],'#e3f7ff');
  }else if(id==='reaper'){
   rect(-1,-9,3,24,'#45344e');rect(0,-4,1,17,'#a583b7');poly([[-10,-10],[0,-15],[10,-12],[15,-5],[14,6],[10,-2],[5,-6],[-1,-7]],'#382940');poly([[-9,-10],[0,-13],[9,-10],[12,-4],[12,1],[8,-5],[3,-8]],'#e0c4ff');rect(-2,-9,5,4,'#ad7ddd');rect(-1,-8,2,2,'#fff2b5');
  }else if(id==='blade'||id==='dagger'||id==='lance'){
   const long=id==='lance',red=id==='dagger',tint=long?'#a3f3db':red?'#ffacc0':'#f5e9d0';
   poly([[0,-15],[long?5:4,-8],[3,6],[-3,6],[-4,-8]],'#211a32');
   poly([[0,-13],[3,-7],[2,5],[-2,5],[-2,-6]],tint);rect(0,-8,1,12,'#ffffff');
   rect(-5,5,10,2,long?'#41a58f':'#b48750');rect(-2,7,4,7,'#462738');rect(-1,7,2,5,red?'#ca425f':'#957647');rect(-2,13,4,2,'#e9bb73');rect(-1,4,2,3,red?'#e54064':'#754caa');for(let y=-5;y<4;y+=3)rect(-1,y,2,1,long?'#43b3ac':red?'#b94568':'#a2b1c8');rect(-4,5,2,2,'#ffdf9a');rect(3,5,2,2,'#ffdf9a');
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
 function iconHtml(id){if(!icons[id]){const c=document.createElement('canvas');const size=RubraConfig.profane.weapons.concat('verdict','absolute').includes(id)?96:32;c.width=c.height=size;item(c.getContext('2d'),id,size/2,size/2,0,size/32);icons[id]=c.toDataURL();}return `<img class="weapon-icon" alt="" src="${icons[id]}">`;}
 function shot(q,s){const a=Math.atan2(s.vy,s.vx),n=Math.hypot(s.vx,s.vy)||1;
  q.save();for(let i=1;i<=4;i++){q.globalAlpha=.28*(1-i/5);q.fillStyle=s.color;const d=i*7,size=5-i*.6;q.fillRect(Math.round(s.x-s.vx/n*d-size/2),Math.round(s.y-s.vy/n*d-size/2),size,size);}q.globalAlpha=1;q.strokeStyle=s.color;q.lineWidth=s.hostile?3:2;q.globalAlpha=.35;q.beginPath();q.moveTo(s.x,s.y);q.lineTo(s.x-s.vx/n*(s.hostile?10:22),s.y-s.vy/n*(s.hostile?10:22));q.stroke();q.globalAlpha=1;
  if(s.hostile){q.fillStyle='#261327';q.fillRect(s.x-4,s.y-4,8,8);q.fillStyle=s.color;q.fillRect(s.x-3,s.y-3,6,6);q.fillStyle='#ffe2e5';q.fillRect(s.x-1,s.y-1,2,2);}else if(s.kind==='explosive'){q.fillStyle=s.weapon==='comet'?'#354d94':'#7f2c39';q.fillRect(s.x-6,s.y-6,12,12);q.fillStyle=s.weapon==='comet'?'#80dcff':'#ff8c37';q.fillRect(s.x-4,s.y-4,8,8);q.fillStyle=s.weapon==='comet'?'#edffff':'#fff3b2';q.fillRect(s.x-2,s.y-2,4,4);}else item(q,s.weapon||'dagger',s.x,s.y,s.kind==='returning'?s.life*12:a+Math.PI/2,s.kind==='piercing'||s.kind==='returning'?.8:.55);q.restore();
 }
 function orbit(q,slot,player,time,stats){if(slot.id==='rosary'){RubraProfane.rosaryOrbit(q,player,time,stats);return;}for(let i=0;i<stats.count;i++){const a=time*RubraConfig.visuals.orbitSpeed+i*Math.PI*2/stats.count,x=player.x+Math.cos(a)*stats.range,y=player.y+Math.sin(a)*stats.range;
  q.save();q.strokeStyle=stats.color;for(let j=1;j<=3;j++){q.globalAlpha=.15/j;q.lineWidth=5-j;q.beginPath();q.arc(player.x,player.y,stats.range+j-2,a-.6,a);q.stroke();}q.globalAlpha=.18;q.lineWidth=2;q.beginPath();q.arc(player.x,player.y,stats.range,a-.3,a);q.stroke();q.restore();item(q,slot.id,x,y,a+Math.PI/2,slot.id==='blade'?.75:.6);}}
 function effect(q,e,time){if(RubraSanctuary.absoluteEffect(q,e,time)||RubraProfane.effectArt(q,e,time))return;q.save();
  if(e.kind==='beam'){q.globalAlpha=e.life/e.max;q.strokeStyle=e.color;q.lineWidth=e.r*2;q.beginPath();q.moveTo(e.x,e.y);q.lineTo(e.tx,e.ty);q.stroke();q.strokeStyle='#f2ffff';q.lineWidth=3;q.stroke();for(let i=1;i<9;i++){const t=i/9;item(q,'prism',e.x+(e.tx-e.x)*t,e.y+(e.ty-e.y)*t,time,.25);}q.restore();return;}
  if(e.kind==='storm'&&e.weapon==='absolute'){
   const age=e.max-e.life,charge=Math.min(1,age/.3),fade=Math.min(1,e.life/.4),pulse=.5+.5*Math.cos(Math.max(0,age-.3)*Math.PI*2/(e.tick||.5));
   q.globalAlpha=.1*fade;q.fillStyle='#6bc8ee';q.beginPath();q.arc(e.x,e.y,e.r,0,Math.PI*2);q.fill();
   for(let ring=0;ring<2;ring++){q.globalAlpha=(.45+ring*.2)*fade;q.strokeStyle=ring?'#d5ffff':'#907ac8';q.lineWidth=ring?1:3;q.beginPath();for(let j=0;j<=12;j++){const a=j*Math.PI/6+age*(ring?-.25:.15),r=e.r*(ring?.82:1);const x=Math.round(e.x+Math.cos(a)*r),y=Math.round(e.y+Math.sin(a)*r);if(j)q.lineTo(x,y);else q.moveTo(x,y);}q.stroke();}
   q.globalAlpha=.7*fade;for(let j=0;j<12;j++){const a=j*Math.PI/6+age*.25,r=e.r*(.5+.3*pulse);item(q,'frostbolt',e.x+Math.cos(a)*r,e.y+Math.sin(a)*r,a+Math.PI/2,.3+.25*pulse);}
   q.globalAlpha=fade;item(q,'absolute',e.x,e.y-12-(1-charge)*65,Math.PI,1.8);
   if(age>=.3){q.strokeStyle='#eeffff';q.globalAlpha=.5*fade*pulse;q.lineWidth=2;q.beginPath();q.arc(e.x,e.y,e.r*(1-pulse*.65),0,Math.PI*2);q.stroke();for(let j=0;j<8;j++){const a=j*Math.PI/4+age,r=e.r*((age*.7+j*.17)%1);q.fillStyle=j%2?'#d8ffff':'#bb98f0';q.fillRect(Math.round(e.x+Math.cos(a)*r),Math.round(e.y+Math.sin(a)*r),2,4);}}
   q.restore();return;
  }
  if(e.kind==='storm'){q.globalAlpha=.12;q.fillStyle=e.color;q.beginPath();q.arc(e.x,e.y,e.r,0,Math.PI*2);q.fill();q.globalAlpha=.6;q.strokeStyle=e.color;q.lineWidth=2;q.stroke();for(let i=0;i<12;i++){const a=i*Math.PI/6+time*1.4,r=e.r*(.3+.65*((i%3)/2));item(q,'frostbolt',e.x+Math.cos(a)*r,e.y+Math.sin(a)*r,a,.25);}q.restore();return;}
  if(e.kind==='chain'){q.strokeStyle=e.color;q.lineWidth=3;q.globalAlpha=Math.max(0,e.life/e.max);q.beginPath();q.moveTo(e.x,e.y);for(let i=1;i<8;i++){const t=i/8;q.lineTo(e.x+(e.tx-e.x)*t+Math.sin(i*13+time*45)*6,e.y+(e.ty-e.y)*t+Math.cos(i*7)*6);}q.lineTo(e.tx,e.ty);q.stroke();q.strokeStyle='#effaff';q.lineWidth=1;q.stroke();q.restore();return;}
  if(e.kind==='impact'){const p=1-e.life/e.max;q.globalAlpha=1-p;for(let i=0;i<6;i++){const a=i*Math.PI/3;q.fillStyle=i%2?'#fff1cd':e.color;q.fillRect(Math.round(e.x+Math.cos(a)*e.r*p),Math.round(e.y+Math.sin(a)*e.r*p),3,3);}q.restore();return;}
const fade=Math.max(0,e.life/e.max);q.strokeStyle=e.color;q.lineWidth=2;q.globalAlpha=Math.min(.8,fade+.15);q.beginPath();q.arc(e.x,e.y,e.r,0,Math.PI*2);q.stroke();
  if(e.kind==='area'){
   q.beginPath();q.arc(e.x,e.y,e.r*(e.hit?1.1:.8),0,Math.PI*2);q.stroke();
   for(let i=0;i<6;i++){const a=i*Math.PI/3+time*.3;item(q,e.weapon||'ember',e.x+Math.cos(a)*e.r*.8,e.y+Math.sin(a)*e.r*.8,a,.28);}
   if(e.hit){q.fillStyle=e.color;q.globalAlpha=fade*.22;q.beginPath();q.arc(e.x,e.y,e.r,0,Math.PI*2);q.fill();q.globalAlpha=fade;for(let i=0;i<12;i++){const a=i*Math.PI/6,x=e.x+Math.cos(a)*e.r*(1-fade),y=e.y+Math.sin(a)*e.r*(1-fade);q.fillStyle=i%2?'#ffe9b1':e.color;q.fillRect(Math.round(x),Math.round(y-fade*18),4,Math.max(3,fade*12));}q.fillStyle='#fff1c8';for(let i=0;i<8;i++){const a=i*Math.PI/4;q.fillRect(e.x+Math.cos(a)*e.r*(1-fade)-2,e.y+Math.sin(a)*e.r*(1-fade)-2,4,4);}}else item(q,e.weapon||'ember',e.x,e.y,0,.65);
  }else{q.globalAlpha=fade*.45;q.lineWidth=3;q.beginPath();q.arc(e.x,e.y,e.r,time*5,time*5+Math.PI*1.3);q.stroke();}q.restore();
 }
 return {item,iconHtml,shot,orbit,effect};
})();

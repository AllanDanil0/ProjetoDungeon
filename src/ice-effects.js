'use strict';
// Bounded, deterministic Canvas effects: no extra simulation particles or damage.
const RubraIceEffects=(()=>{
 const supported=new Set(['frostbolt','halo','comet','glaive','blizzard']);
 const detailed=()=>typeof RubraPreferences==='undefined'||RubraPreferences.particles;
 function shard(q,x,y,r,a,color='#bdf5ff'){q.save();q.translate(Math.round(x),Math.round(y));q.rotate(a);q.fillStyle='#345783';q.beginPath();q.moveTo(0,-r);q.lineTo(r*.42,0);q.lineTo(0,r*.7);q.lineTo(-r*.42,0);q.closePath();q.fill();q.fillStyle=color;q.beginPath();q.moveTo(0,-r);q.lineTo(r*.22,0);q.lineTo(0,r*.4);q.closePath();q.fill();q.restore();}
 function ring(q,x,y,r,angle,alpha){q.save();q.translate(x,y);q.rotate(angle);q.globalAlpha*=alpha;q.strokeStyle='#7ad9ff';q.lineWidth=1;q.beginPath();for(let j=0;j<=12;j++){const a=j*Math.PI/6;j?q.lineTo(Math.cos(a)*r,Math.sin(a)*r):q.moveTo(r,0);}q.stroke();for(let j=0;j<6;j++){const a=j*Math.PI/3;q.save();q.rotate(a);q.strokeStyle='#e0fcff';q.beginPath();q.moveTo(r-5,-3);q.lineTo(r,0);q.lineTo(r-5,3);q.stroke();q.restore();}q.restore();}
 function shot(q,s,t,item){if(s.hostile||!['frostbolt','comet','glaive'].includes(s.weapon))return false;const a=Math.atan2(s.vy,s.vx),rich=detailed();q.save();q.translate(s.x,s.y);q.rotate(a);const comet=s.weapon==='comet',blade=s.weapon==='glaive',length=comet?66:blade?40:34;
  if(rich){for(let k=0;k<3;k++){q.globalAlpha=.14/(k+1);q.strokeStyle=['#7399ef','#77e4ff','#dcfbff'][k];q.lineWidth=(comet?18:7)-k*2;q.beginPath();q.moveTo(5,0);q.lineTo(-length,0);q.stroke();}for(let j=0;j<(comet?10:6);j++){const p=(t*2+j*.137)%1;q.globalAlpha=(1-p)*.7;shard(q,-8-p*length,Math.sin(j*8+t*9)*(comet?8:4)*p,2+(1-p)*3,Math.PI/2+j,['#e7fdff','#79cbff','#bda7ff'][j%3]);}}
  if(blade){q.globalAlpha=.6;q.lineWidth=1;q.strokeStyle=s.returning?'#c7acff':'#bef8ff';for(let j=0;j<2;j++){q.beginPath();q.arc(0,0,15+j*4,t*12+j,t*12+j+Math.PI*1.3);q.stroke();}}
  q.globalAlpha=1;item(q,s.weapon,0,0,blade?s.life*12-a:Math.PI/2,comet?1.05:blade?.95:.65);q.restore();return true;
 }
 function orbit(q,slot,p,t,stats,item){if(slot.id!=='halo')return false;const rich=detailed();q.save();if(rich)ring(q,p.x,p.y,stats.range,t*.15,.2);for(let i=0;i<stats.count;i++){const a=t*RubraConfig.visuals.orbitSpeed+i*Math.PI*2/stats.count;for(let j=0;j<(rich?8:2);j++){const b=a-j*.055;q.globalAlpha=(1-j/8)*.55;q.strokeStyle=j%2?'#b9a4ff':'#b8f8ff';q.lineWidth=1+j*.2;q.beginPath();q.arc(p.x,p.y,stats.range,a-j*.065-.1,a-j*.065);q.stroke();if(rich&&j%2===0)shard(q,p.x+Math.cos(b)*(stats.range+5),p.y+Math.sin(b)*(stats.range+5),3,b+t);}
  q.globalAlpha=1;item(q,'halo',p.x+Math.cos(a)*stats.range,p.y+Math.sin(a)*stats.range,a+t*2,.8);}q.restore();return true;}
 function effect(q,e,t,item){const id=e.weapon||e.id;if(!supported.has(id))return false;const rich=detailed(),age=Math.max(0,e.max-e.life),p=Math.max(0,Math.min(1,age/e.max)),fade=Math.min(1,e.life/.18);q.save();q.globalAlpha=fade;
  if(id==='blizzard'&&e.kind==='storm'){const charge=Math.min(1,age/.3),pulse=Math.max(0,1-((age-.3+e.tick)%e.tick)/e.tick);q.globalAlpha=.065*fade;q.fillStyle='#81bbef';q.beginPath();q.arc(e.x,e.y,e.r*charge,0,Math.PI*2);q.fill();q.globalAlpha=fade;ring(q,e.x,e.y,e.r*charge,t*.13,.55);ring(q,e.x,e.y,e.r*.72,-t*.19,.3);q.strokeStyle='#dbfaff';q.lineWidth=1;q.globalAlpha=fade*.35*pulse;q.beginPath();q.arc(e.x,e.y,e.r*(.4+.6*(1-pulse)),0,Math.PI*2);q.stroke();
   for(let j=0;j<(rich?24:6);j++){const a=j*2.39996+t*(j%2?.65:-.4),r=e.r*(.22+.73*((j*7%23)/23));q.globalAlpha=fade*(.35+.4*Math.sin(age*3+j)**2);shard(q,e.x+Math.cos(a)*r,e.y+Math.sin(a)*r*.8-((age*25+j*7)%24),rich?3+j%3:3,a+t);}
   if(rich){q.strokeStyle='#98dfff';for(let k=0;k<3;k++){q.globalAlpha=.3*fade;q.beginPath();q.ellipse(e.x,e.y-8-k*8,e.r*(.35+k*.22),e.r*.22,t*.2+k,t*1.5+k,t*1.5+k+Math.PI*1.25);q.stroke();}}
   q.globalAlpha=fade;item(q,'blizzard',e.x,e.y-16+Math.sin(t*2)*3,Math.sin(t)*.04,1.5);
  }else if(id==='comet'&&e.kind==='area'){const radius=e.r*Math.min(1,p*2);q.globalAlpha=(1-p)*.18;q.fillStyle='#a6e7ff';q.beginPath();q.arc(e.x,e.y,radius,0,Math.PI*2);q.fill();q.globalAlpha=fade;ring(q,e.x,e.y,radius,p*.2,.8*(1-p));for(let k=0;k<2;k++){q.strokeStyle=k?'#baa9ff':'#eaffff';q.globalAlpha=(1-p)*.65;q.lineWidth=2-k;q.beginPath();q.ellipse(e.x,e.y,radius*(1-k*.2),radius*.7,0,0,Math.PI*2);q.stroke();}for(let j=0;j<(rich?18:6);j++){const a=j*2.39996,r=e.r*(.2+.8*p)*(j%2?1:.7);q.globalAlpha=fade;shard(q,e.x+Math.cos(a)*r,e.y+Math.sin(a)*r-p*14,4+(1-p)*9,a+p*3);}q.globalAlpha=(1-p)**3;q.fillStyle='#f3ffff';q.fillRect(e.x-5,e.y-13,10,26);q.fillRect(e.x-13,e.y-5,26,10);
  }else if(e.kind==='impact'){const r=8+p*22;for(let j=0;j<(rich?8:4);j++){const a=j*Math.PI/4+(id==='glaive'?p*2:0);q.globalAlpha=1-p;shard(q,e.x+Math.cos(a)*r,e.y+Math.sin(a)*r,5*(1-p)+1,a,id==='glaive'?'#cab7ff':'#e5ffff');}q.strokeStyle='#dafaff';q.lineWidth=1;q.globalAlpha=(1-p)*.7;q.beginPath();q.arc(e.x,e.y,r*.7,0,Math.PI*2);q.stroke();
  }else if(id==='halo'&&e.kind==='orbit'){ring(q,e.x,e.y,e.r*(.92+p*.1),t*.3,(1-p)*.4);
  }else{q.restore();return false;}q.restore();return true;
 }
 return {shot,orbit,effect};
})();

'use strict';
// Visual layers only: the supplied arena and character source pixels remain intact.
const RubraSanctuary=(()=>{
 function prepare(images){
  const im=images.absoluteArt,c=document.createElement('canvas');c.width=im.width;c.height=im.height;const q=c.getContext('2d');q.drawImage(im,0,0);const p=q.getImageData(0,0,c.width,c.height);
  let left=c.width,top=c.height,right=0,bottom=0;
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const i=(y*c.width+x)*4;if(p.data[i+3]>80){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}}
  const blade=document.createElement('canvas');blade.width=right-left+1;blade.height=bottom-top+1;blade.getContext('2d').drawImage(c,left,top,blade.width,blade.height,0,0,blade.width,blade.height);RubraProfane.weaponImages.absolute=blade;
 }
 function hero(q,id,base,t,o={}){
  q.save();if(!o.menu){q.translate(o.x,o.y+3);q.scale((o.flip?-1:1)*o.height/64,o.height/64);q.translate(-32,-64);}q.imageSmoothingEnabled=false;
  if(o.menu&&!o.on){q.drawImage(base,0,0);q.restore();return;}
  const phase=t*(id==='karn'?2.1:id==='malthor'?3:4),cycle=(t/(id==='karn'?3.8:id==='malthor'?3.1:2.8))%1;
  const attack=o.menu?Math.pow(Math.max(0,Math.sin(cycle*Math.PI*2)),4):Math.sin(Math.min(1,(o.attack||0)/.55)*Math.PI);
  const walk=(o.moving||o.menu)?Math.sin(phase*(o.menu?1.3:3))*(id==='karn'?1.5:2.3):0,sway=Math.sin(phase)*.65;
  // Weight transfer, alternating feet and a separate upper-body gesture, anchored at the hips.
  q.translate(o.menu?Math.sin(phase*.5)*(id==='vespera'?3.5:id==='malthor'?2.5:1.2):0,o.menu&&id==='vespera'?-Math.abs(Math.sin(phase*.5))*1.5:0);
  q.save();q.translate(32,48);q.rotate((id==='karn'?-1:1)*attack*(id==='vespera'?.07:.035));q.translate(-32,-48);
  // Legs have independent contact phases; torso breathes without stretching the face.
  q.drawImage(base,0,47,32,17,walk*.35,47-Math.max(0,walk),32,17);q.drawImage(base,32,47,32,17,32-walk*.35,47-Math.max(0,-walk),32,17);
  const arm=id==='karn'?{x:0,y:16,w:27,h:27,px:26,py:35}:id==='malthor'?{x:40,y:30,w:24,h:19,px:41,py:32}:{x:42,y:33,w:22,h:16,px:43,py:35};
  q.save();q.translate(0,sway);q.beginPath();q.rect(0,0,64,49);q.rect(arm.x,arm.y,arm.w,arm.h);q.clip('evenodd');q.drawImage(base,0,0);q.restore();
  q.save();q.translate(arm.px,arm.py+sway);q.rotate(id==='karn'?-attack*.34:id==='malthor'?-attack*.38:Math.sin(phase)*.24);q.drawImage(base,arm.x,arm.y,arm.w,arm.h,arm.x-arm.px,arm.y-arm.py,arm.w,arm.h);q.restore();
  q.restore();
  q.globalAlpha=.65;q.lineWidth=.7;
  if(id==='karn'){q.strokeStyle='#dc9573';q.beginPath();q.ellipse(32,59,12+attack*9,2+attack*2,0,0,Math.PI*2);q.stroke();if(attack>.2){q.globalAlpha=attack*.45;q.strokeStyle='#f0aaa0';q.beginPath();q.arc(27,34,24,3.3-attack*.3,4.6-attack*.3);q.stroke();}}
  else if(id==='malthor'){q.strokeStyle='#cf365e';q.beginPath();q.moveTo(48,40);for(let j=1;j<=16;j++){const u=j/16;q.lineTo(48+Math.sin(u*5+phase)*u*10,40-u*(12+attack*17));}q.stroke();for(let j=0;j<4;j++){q.fillStyle='#ed758b';q.fillRect(47+Math.sin(phase+j)*8,24+j*5,1,1);}}
  else{for(let j=0;j<18;j++){const a=phase*.5+j*Math.PI/9,x=32+Math.cos(a)*24,y=43+Math.sin(a)*10;q.fillStyle=j%3?'#a51f40':'#f0a0a5';q.fillRect(Math.round(x),Math.round(y),1.5,1.5);if(j%6===0){q.fillStyle='#d9c5c1';q.fillRect(x,y-2,1,5);q.fillRect(x-1,y-1,3,1);}}}
  q.restore();
 }
 function absoluteEffect(q,e,t){if(e.kind!=='storm'||e.weapon!=='absolute')return false;
  q.save();const age=e.max-e.life,fade=Math.min(1,e.life/.35,age/.12),pulse=(Math.sin(age*10)+1)/2;q.translate(e.x,e.y);q.globalAlpha=fade;
  const glow=q.createRadialGradient(0,0,0,0,0,e.r);glow.addColorStop(0,'rgba(202,250,255,.24)');glow.addColorStop(.65,'rgba(49,154,226,.12)');glow.addColorStop(1,'rgba(24,57,122,0)');q.fillStyle=glow;q.fillRect(-e.r,-e.r,e.r*2,e.r*2);
  for(let ring=0;ring<3;ring++){q.strokeStyle=['#cffaff','#4eb8dc','#657ecb'][ring];q.globalAlpha=fade*(.65-ring*.12);q.lineWidth=ring===0?1.8:1;q.beginPath();for(let j=0;j<=12;j++){const a=j*Math.PI/6+age*.08*(ring%2?1:-1),r=e.r*(.55+ring*.2),x=Math.cos(a)*r,y=Math.sin(a)*r;j?q.lineTo(x,y):q.moveTo(x,y);}q.stroke();}
  for(let j=0;j<12;j++){const a=j*Math.PI/6,r=e.r*.78;q.save();q.rotate(a);q.globalAlpha=fade*.7;q.strokeStyle='#b1eeff';q.lineWidth=1;q.beginPath();q.moveTo(8,0);q.lineTo(r*.5,4);q.lineTo(r*.62,-4);q.lineTo(r,0);q.stroke();q.fillStyle='#defcff';q.fillRect(r,-4,2,8);q.fillRect(r-3,-2,7,1);q.restore();}
  for(let j=0;j<8;j++){const a=j*Math.PI/4+age*.12,r=e.r*.65,h=12+Math.sin(j*2+age*3)*5;q.save();q.translate(Math.cos(a)*r,Math.sin(a)*r);q.globalAlpha=fade*(.6+pulse*.25);q.fillStyle='#338cba';q.beginPath();q.moveTo(-5,4);q.lineTo(-2,-h);q.lineTo(4,-h*.6);q.lineTo(6,3);q.closePath();q.fill();q.fillStyle='#c5faff';q.beginPath();q.moveTo(-2,-h);q.lineTo(1,3);q.lineTo(-5,4);q.closePath();q.fill();q.restore();}
  q.globalAlpha=fade;const im=RubraProfane.weaponImages.absolute,h=112,w=h*im.width/im.height;q.drawImage(im,-w/2,-h-8-Math.sin(age*3)*3,w,h);q.globalAlpha=fade*(.25+pulse*.3);q.strokeStyle='#efffff';q.lineWidth=2;q.beginPath();q.ellipse(0,1,15+pulse*9,4+pulse*2,0,0,Math.PI*2);q.stroke();q.restore();return true;
 }
 return {prepare,hero,flames:(q,t,on)=>RubraIcePolish.flames(q,t,on),absoluteEffect};
})();

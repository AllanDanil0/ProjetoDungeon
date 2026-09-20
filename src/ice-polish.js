'use strict';
// Animation layers retain the supplied monsters and fairy silhouettes.
const RubraIcePolish=(()=>{
 const frames={},fairies=[],fireFrames=[];
 const fairyRects=[[160,175,114,111],[1325,92,96,111],[1386,231,111,104]];
 function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
 function tight(im){const c=canvas(im.width,im.height),q=c.getContext('2d');q.drawImage(im,0,0);const d=q.getImageData(0,0,c.width,c.height);let l=c.width,r=0,t=c.height,b=0;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(d.data[(y*c.width+x)*4+3]>40){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);}const out=canvas(r-l+1,b-t+1);out.getContext('2d').drawImage(c,l,t,out.width,out.height,0,0,out.width,out.height);return out;}
 function prepare(images){
  RubraProfane.weaponImages.prism=tight(images.prismArt);
  const extractMonster=rect=>{const c=canvas(rect[2],rect[3]),q=c.getContext('2d');q.drawImage(images.iceMonsters,rect[0]*images.iceMonsters.width/1408,rect[1]*images.iceMonsters.height/768,rect[2]*images.iceMonsters.width/1408,rect[3]*images.iceMonsters.height/768,0,0,c.width,c.height);const d=q.getImageData(0,0,c.width,c.height),a=d.data;const seen=new Uint8Array(c.width*c.height),queue=[];const add=k=>{if(k<0||k>=seen.length||seen[k])return;const i=k*4,lo=Math.min(a[i],a[i+1],a[i+2]),hi=Math.max(a[i],a[i+1],a[i+2]);if(a[i+3]<20||(hi-lo<22&&lo>60&&hi<195)){seen[k]=1;queue.push(k)}};for(let x=0;x<c.width;x++){add(x);add((c.height-1)*c.width+x)}for(let y=0;y<c.height;y++){add(y*c.width);add(y*c.width+c.width-1)}for(let j=0;j<queue.length;j++){const k=queue[j],x=k%c.width;a[k*4+3]=0;if(x)add(k-1);if(x<c.width-1)add(k+1);add(k-c.width);add(k+c.width)}q.putImageData(d,0,0);return tight(c);};
  for(const [id,rect]of Object.entries(C.ice.monsterCells)){images[id]=extractMonster(rect);frames[id]=[images[id]];}
  const second={frostguard:[0,260,375,250],wraith:[405,260,300,250],snowhulk:[710,260,243,250],frostimp:[953,260,220,250]};
  for(const [id,rect]of Object.entries(second))frames[id].push(extractMonster(rect));
  fairies.length=0;
  for(const [x,y,w,h]of fairyRects){const c=canvas(w,h),q=c.getContext('2d');q.drawImage(images.iceMap,x*images.iceMap.width/1600,y*images.iceMap.height/984,w*images.iceMap.width/1600,h*images.iceMap.height/984,0,0,w,h);const d=q.getImageData(0,0,w,h);for(let i=0;i<d.data.length;i+=4){const a=d.data;const light=Math.min(1,Math.max(0,(a[i+1]-145)/55))*Math.min(1,Math.max(0,(a[i+2]-185)/40));a[i+3]=Math.round(light*255);}q.putImageData(d,0,0);fairies.push({image:c,x,y,w,h});}
  fireFrames.length=0;const atlas=images.fireAtlas,cw=atlas.width/4,ch=atlas.height/2;
  for(let j=0;j<8;j++){const c=canvas(cw,ch),q=c.getContext('2d');q.drawImage(atlas,j%4*cw,Math.floor(j/4)*ch,cw,ch,0,0,cw,ch);const d=q.getImageData(0,0,cw,ch);const pixels=d.data,seen=new Uint8Array(cw*ch),queue=[];const add=k=>{if(k<0||k>=cw*ch||seen[k])return;const p=k*4;if(pixels[p+3]<20||(Math.max(pixels[p],pixels[p+1],pixels[p+2])-Math.min(pixels[p],pixels[p+1],pixels[p+2])<25&&pixels[p]>120)){seen[k]=1;queue.push(k);}};for(let x=0;x<cw;x++){add(x);add((ch-1)*cw+x);}for(let y=0;y<ch;y++){add(y*cw);add(y*cw+cw-1);}for(let k=0;k<queue.length;k++){const n=queue[k],x=n%cw;pixels[n*4+3]=0;if(x)add(n-1);if(x<cw-1)add(n+1);add(n-cw);add(n+cw);}q.putImageData(d,0,0);fireFrames.push(tight(c));}
 }
 // Only edited patches are sampled; the rest of each original map stays byte-identical.
 function patchGround(q,im,x,y,w,h,sx,sy,refW,refH){q.save();q.beginPath();q.rect(x*sx,y*sy,w*sx,h*sy);q.clip();q.drawImage(im,0,0,refW*sx,refH*sy);q.restore();}
 function iceGround(q){for(const [x,y,w,h]of fairyRects)patchGround(q,assetImages.iceClean,x-3,y-3,w+6,h+6,3840/1600,2360/984,1600,984);}
 function profaneGround(q){for(const f of C.profane.braziers)patchGround(q,assetImages.profaneClean,f.x-25,f.y-64,50,70,2.5,2.5,1536,1024);}
 function fairyLayer(q,t,on){q.save();q.scale(3840/1600,2360/984);q.imageSmoothingEnabled=false;for(const [i,f]of fairies.entries()){const bob=on?Math.sin(t*2+i)*3:0,cx=f.x+f.w/2,cy=f.y+f.h/2+bob;q.save();q.translate(cx,cy);const beat=on?.78+Math.sin(t*8+i)*.18:1;q.drawImage(f.image,0,0,f.w*.43,f.h,-f.w*.43*beat,-f.h/2,f.w*.43*beat,f.h);q.drawImage(f.image,f.w*.57,0,f.w*.43,f.h,f.w*.07,-f.h/2,f.w*.43*beat,f.h);q.drawImage(f.image,f.w*.43,0,f.w*.14,f.h,-f.w*.07,-f.h/2,f.w*.14,f.h);q.restore();}q.restore();}
 function enemy(q,e,x,y,t,flip){const id=e.cfg.asset,seq=frames[id];if(!seq)return false;const phase=t*(id==='icewolf'?9:id==='icegolem'?2.7:4)+e.x*.002;const im=seq[Math.floor(phase)%seq.length],h=e.cfg.size,w=h*im.width/im.height,air=['wraith','frostimp','frostlich'].includes(id),attack=e.telegraph?Math.sin(t*8)*.1:0;
  q.save();q.translate(Math.round(x),Math.round(y+3-(air?3+Math.sin(phase)*2:Math.abs(Math.sin(phase))*1.1)));if(flip)q.scale(-1,1);q.imageSmoothingEnabled=false;
  // Feet, trailing cloth and arms move independently while face and body keep their proportions.
  const legs=id==='icewolf'?.58:.74,cut=Math.round(im.height*legs),s=h/im.height;
  q.drawImage(im,0,cut,im.width/2,im.height-cut,-w/2,-h+cut*s+Math.sin(phase)*1.5,w/2,(im.height-cut)*s);
  q.drawImage(im,im.width/2,cut,im.width/2,im.height-cut,0,-h+cut*s-Math.sin(phase)*1.5,w/2,(im.height-cut)*s);
  const edge=im.width*.23,ay=im.height*.3,ah=cut-ay;
  q.drawImage(im,0,0,im.width,ay,-w/2,-h,w,ay*s);
  q.drawImage(im,edge,ay,im.width-2*edge,ah,-w/2+edge*s,-h+ay*s,(im.width-2*edge)*s,ah*s);
  for(const side of [-1,1]){const a=side<0?0:im.width-edge,px=side*(w/2-edge*s);q.save();q.translate(px,-h+ay*s);q.rotate(side*(Math.sin(phase)*.055+attack));q.drawImage(im,a,ay,edge,ah,side<0?-edge*s:0,0,edge*s,ah*s);q.restore();}
  if(e.telegraph){q.strokeStyle='#b5f9ff';q.globalAlpha=.6;q.lineWidth=1.2;q.beginPath();q.ellipse(0,-h*.48,w*.6,5,phase*.2,0,Math.PI*2);q.stroke();}q.restore();return true;
 }
 function flames(q,t,particles){q.save();q.imageSmoothingEnabled=false;for(const [i,f]of C.profane.braziers.entries()){const im=fireFrames[(Math.floor(t*10)+i*3)%8];if(!im)continue;const x=f.x*2.5,y=(f.y-9)*2.5,h=105,w=h*im.width/im.height;q.globalAlpha=1;q.drawImage(im,x-w/2,y-h,w,h);if(particles){const g=q.createRadialGradient(x,y-20,0,x,y-20,52);g.addColorStop(0,'#77f54930');g.addColorStop(1,'#77f54900');q.fillStyle=g;q.fillRect(x-52,y-72,104,104);for(let j=0;j<3;j++){const a=(t*.6+j/3+i*.17)%1;q.globalAlpha=1-a;q.fillStyle='#b5ff90';q.fillRect(x+Math.sin(t+j+i)*11,y-30-a*85,2,3);}}}q.restore();}
 function prism(q,e,t){if(e.kind!=='beam'||e.weapon!=='prism')return false;const dx=e.tx-e.x,dy=e.ty-e.y,len=Math.hypot(dx,dy),age=e.max-e.life,fade=Math.min(1,e.life/.15,age/.035);q.save();q.translate(e.x,e.y);q.rotate(Math.atan2(dy,dx));q.globalAlpha=fade;const g=q.createLinearGradient(0,0,len,0);g.addColorStop(0,'#91ffe8');g.addColorStop(.5,'#8ccfff');g.addColorStop(1,'#cf9dff');q.strokeStyle=g;
  for(const [width,alpha]of [[26,.12],[13,.28],[5,.85]]){q.globalAlpha=fade*alpha;q.lineWidth=width;q.beginPath();q.moveTo(18,0);q.lineTo(len,0);q.stroke();}q.lineWidth=1;q.globalAlpha=fade;for(let k=0;k<3;k++){q.strokeStyle=['#d9fff3','#9ee0ff','#d7afff'][k];q.beginPath();for(let j=0;j<=32;j++){const x=18+(len-18)*j/32,y=Math.sin(j*.8-age*30+k*2)*3;j?q.lineTo(x,y):q.moveTo(x,y);}q.stroke();}for(let j=0;j<16;j++){const x=18+(j/16*len+age*230)%Math.max(1,len-18),y=Math.sin(j*7)*13;q.fillStyle=j%2?'#beadff':'#c8ffec';q.fillRect(x,y,2,2);}q.translate(len,0);q.strokeStyle='#d3eeff';q.lineWidth=1.5;q.beginPath();q.ellipse(0,0,5+age*10,12+age*22,0,0,Math.PI*2);q.stroke();q.restore();q.save();q.globalAlpha=fade;const im=RubraProfane.weaponImages.prism,h=44;q.drawImage(im,e.x-h*im.width/im.height/2,e.y-h/2,h*im.width/im.height,h);q.restore();return true;}
 return {prepare,iceGround,profaneGround,fairyLayer,enemy,flames,prism,frames,fairies,fireFrames};
})();

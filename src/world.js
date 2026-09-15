'use strict';
const RubraWorld={
 trees:[],
 prepareTrees(images){this.trees=[1,2,3].map(n=>{const im=images['crimsonTree'+n],c=document.createElement('canvas');c.width=im.width;c.height=im.height;const q=c.getContext('2d',{willReadFrequently:true});q.drawImage(im,0,0);const d=q.getImageData(0,0,c.width,c.height),a=d.data,w=c.width,h=c.height;const bg=[a[0],a[1],a[2]],seen=new Uint8Array(w*h),queue=[];const add=i=>{if(i<0||i>=w*h||seen[i])return;const p=i*4;if(a[p+3]<20||Math.max(...bg.map((v,k)=>Math.abs(a[p+k]-v)))<(n===3?10:55)){seen[i]=1;queue.push(i);}};for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}for(let k=0;k<queue.length;k++){const i=queue[k],x=i%w;a[i*4+3]=0;if(x)add(i-1);if(x<w-1)add(i+1);add(i-w);add(i+w);}for(let i=0;i<a.length;i+=4)if(n<3&&Math.min(a[i],a[i+1],a[i+2])>220&&Math.max(a[i],a[i+1],a[i+2])-Math.min(a[i],a[i+1],a[i+2])<25)a[i+3]=0;let l=w,t=h,r=0,b=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(a[(y*w+x)*4+3]>20){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);}q.putImageData(d,0,0);const out=document.createElement('canvas');out.height=192;out.width=Math.round((r-l+1)*192/(b-t+1));const g=out.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(c,l,t,r-l+1,b-t+1,0,0,out.width,out.height);return out;});},
 tree(e){const img=this.trees[Math.abs(Math.round(e.x+e.y))%this.trees.length];if(!img){tree(e.x,e.y,e.s);return;}const height=e.border?155:125,width=height*img.width/img.height;ctx.save();if(player&&Math.abs(player.x-e.x)<width*.45&&player.y<e.y&&player.y>e.y-height)ctx.globalAlpha=.38;ctx.drawImage(img,Math.round(e.x-width/2),Math.round(e.y-height),Math.round(width),height);ctx.restore();},
 camera(map,player,width=960,height=540){const w=map.world;return w?{x:Math.round(Math.max(0,Math.min(w.width-width,player.x-width/2))),y:Math.round(Math.max(0,Math.min(w.height-height,player.y-height/2)))}:{x:0,y:0};},
 expandGround(){
  const w=map.world;if(!w)return;
  const tile=document.createElement('canvas');tile.width=W;tile.height=H;tile.getContext('2d').drawImage(ground,0,0,W,H,0,0,W,H);
  ground.width=w.width;ground.height=w.height;g.imageSmoothingEnabled=false;
  for(let y=0;y<w.height;y+=H)for(let x=0;x<w.width;x+=W)g.drawImage(tile,x,y);
  scenery.length=0;
  for(let x=12;x<w.width;x+=83){scenery.push({type:'tree',x,y:60,s:.36,border:true});scenery.push({type:'tree',x,y:w.height+25,s:.45,border:true});}
  for(let y=160;y<w.height;y+=110){scenery.push({type:'tree',x:10,y,s:.4,border:true});scenery.push({type:'tree',x:w.width-5,y,s:.4,border:true});}
  for(const o of map.obstacles)scenery.push({...o,type:o.kind,s:o.kind==='tree'?.4:.45});
  // Painted fallen leaves and burial tiles are decorative, existing trunk collisions remain valid.
  for(const o of map.obstacles){g.fillStyle='#14131b55';g.beginPath();g.ellipse(o.x,o.y,27,11,0,0,Math.PI*2);g.fill();for(let i=0;i<14;i++){g.fillStyle=i%2?'#673144':'#493043';g.fillRect(Math.round(o.x+Math.sin(i*7)*37),Math.round(o.y+Math.cos(i*3)*18),3,2);}}
 },
 renderBase(camera){
  ctx.drawImage(ground,camera.x,camera.y,W,H,camera.x,camera.y,W,H);
  const entities=[...scenery.map(e=>({...e,scenery:true})),...enemies.filter(e=>!e.dead),{type:'hero',...player,isPlayer:true}];
  entities.sort((a,b)=>a.y-b.y);
  for(const e of entities){if(e.x<camera.x-130||e.x>camera.x+W+130||e.y<camera.y-50||e.y>camera.y+H+160)continue;
   if(e.scenery){if(e.type==='tree')this.tree(e);else pillar(e.x,e.y);continue;}
   shadow(e.x,e.y,e.type==='boss'?29:13);ctx.save();if(e.isPlayer&&player.invuln>0&&Math.floor(time*14)%2===0)ctx.globalAlpha=.4;else if(e.flash>0)ctx.globalAlpha=.5;
   drawSprite(e.type,e.x,e.y,2,0,e.x>player.x,e.flash);ctx.restore();
  }
  for(const p of particles){ctx.globalAlpha=Math.min(1,p.life/.3);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);}ctx.globalAlpha=1;ctx.textAlign='center';ctx.font='bold 12px monospace';
  for(const t of texts){ctx.globalAlpha=Math.min(1,t.life*3);ctx.fillStyle=t.color;ctx.fillText(t.text,t.x,t.y);}ctx.globalAlpha=1;
 }
};
if(typeof module!=='undefined')module.exports=RubraWorld;

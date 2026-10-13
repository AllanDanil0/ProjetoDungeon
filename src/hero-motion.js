'use strict';
const RubraHeroMotion=(()=>{
 const directions=['front','right','back','left'];
 const profiles={rubra:{fps:10,bob:1},noctis:{fps:11,bob:1},ignivar:{fps:7,bob:1},nivor:{fps:9,bob:1},vael:{fps:7,bob:1},aelthir:{fps:9,bob:1},karn:{fps:7,bob:1},malthor:{fps:10,bob:1},vespera:{fps:11,bob:1}};
 function canvas(){const c=document.createElement('canvas');c.width=c.height=64;return c;}
 function cell(im,x,y,w,h){
  const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d',{willReadFrequently:true});q.drawImage(im,x,y,w,h,0,0,w,h);
  const p=q.getImageData(0,0,w,h),d=p.data;let l=w,t=h,r=-1,b=-1;
  for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){
   const k=(yy*w+xx)*4,green=d[k+1]>24&&d[k+1]>d[k]*1.2&&d[k+1]>d[k+2]*1.2;
   if(green||xx<3||yy<3||xx>=w-3||yy>=h-3)d[k+3]=0;
  }
  // Keep the connected figure; fragments from neighbouring cells are not animation.
  const seen=new Uint8Array(w*h),groups=[];
  for(let i=0;i<w*h;i++)if(d[i*4+3]>30&&!seen[i]){
   const group=[i];seen[i]=1;
   for(let j=0;j<group.length;j++){const at=group[j],xx=at%w,yy=Math.floor(at/w);
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=xx+dx,ny=yy+dy,ni=ny*w+nx;
     if(nx>=0&&nx<w&&ny>=0&&ny<h&&!seen[ni]&&d[ni*4+3]>30){seen[ni]=1;group.push(ni);}
    }
   }groups.push(group);
  }
  groups.sort((a,b)=>b.length-a.length);const keep=new Uint8Array(w*h);
  for(const i of groups[0]||[])keep[i]=1;
  for(let i=0;i<w*h;i++){if(!keep[i])d[i*4+3]=0;else{const xx=i%w,yy=Math.floor(i/w);l=Math.min(l,xx);t=Math.min(t,yy);r=Math.max(r,xx);b=Math.max(b,yy);}}
  if(r<l)throw Error('Quadro de personagem vazio');q.putImageData(p,0,0);return {c,l,t,w:r-l+1,h:b-t+1};
 }
 function sheet(im,id){
  const cols=id==='noctis'?8:6,n=cols-2;
  const xs=id==='karn'?[0,280,540,782,1014,1271,1536]:id==='malthor'?[0,240,474,704,944,1190,1536]:Array.from({length:cols+1},(_,i)=>i*1536/cols);
  const ys=id==='karn'?[0,255,506,744,1024]:[0,256,512,768,1024],raw=[];
  for(let row=0;row<4;row++)for(let col=0;col<cols;col++)raw.push(cell(im,Math.round(xs[col]*im.width/1536),Math.round(ys[row]*im.height/1024),Math.round((xs[col+1]-xs[col])*im.width/1536),Math.round((ys[row+1]-ys[row])*im.height/1024)));
  // One uniform scale across the entire sheet, including the wide dash poses.
  const scale=Math.min(49/Math.max(...raw.map(v=>v.h)),60/Math.max(...raw.map(v=>v.w)));
  const frames=raw.map(v=>{const c=canvas(),q=c.getContext('2d');q.imageSmoothingEnabled=false;const w=Math.round(v.w*scale),h=Math.round(v.h*scale);q.drawImage(v.c,v.l,v.t,v.w,v.h,32-Math.floor(w/2),60-h,w,h);return c;});
  const hero={dash:{},idle:{},authored:true};directions.forEach((dir,row)=>{hero[dir]=frames.slice(row*cols,row*cols+n);hero.idle[dir]=hero[dir][0];hero.dash[dir]=frames.slice(row*cols+n,row*cols+cols);});
  // Recovery must still face the travel direction, including north/south dashes.
  if(id==='noctis'){
   for(const dir of ['front','back'])hero.dash[dir][1]=hero[dir][4];
   hero.dash.left=hero.dash.right.map(im=>{const c=canvas(),q=c.getContext('2d');q.translate(64,0);q.scale(-1,1);q.drawImage(im,0,0);return c;});
  }
  return hero;
 }
 function pose(base,dir,phase){
  const c=canvas(),q=c.getContext('2d');q.imageSmoothingEnabled=false;
  // Translate rigid pixel regions; never stretch the head, torso or face.
  const lean=dir==='left'?-2:dir==='right'?2:0;
  q.drawImage(base,0,0,64,45,lean,phase===0?2:0,64,45);
  q.drawImage(base,0,45,32,19,lean-1,45+(phase===0?1:-1),32,19);
  q.drawImage(base,32,45,32,19,32+lean+1,45+(phase===0?-1:1),32,19);
  return c;
 }
 function prepare(images,heroes,portraits){
  for(const id of Object.keys(profiles)){
   if(images[id+'Motion'])heroes[id]=sheet(images[id+'Motion'],id);
   const h=heroes[id];h.idle=h.idle||{};h.dash=h.dash||{};
   for(const dir of directions){h.idle[dir]=h.idle[dir]||h[dir][0];
    if(!h.authored){const original=h.dash[dir]?.[0]||h[dir][0];h.dash[dir]=[pose(original,dir,0),pose(original,dir,1)];}
   }portraits[id]=h.idle.front;
  }
 }
 function frame(hero,dir,t,o={}){
  const p=profiles[o.id]||profiles.rubra;
  if(o.dash>0){const sequence=hero.dash[dir],progress=1-o.dash/.18;return sequence[Math.min(sequence.length-1,Math.floor(Math.max(0,progress)*sequence.length))];}
  if(o.moving)return hero[dir][Math.floor((o.clock??t)*p.fps)%hero[dir].length];
  return hero.idle?.[dir]||hero[dir][0];
 }
 function draw(q,hero,id,dir,t,o={}){
  const im=frame(hero,dir,t,{...o,id}),p=profiles[id]||profiles.rubra;
  q.save();q.imageSmoothingEnabled=false;
  const bob=o.moving?Math.round(Math.abs(Math.sin((o.clock??t)*p.fps*Math.PI/2))*p.bob):Math.round(Math.sin(t*2)*.55);
  if(o.menu){q.drawImage(frame(hero,'front',t,{id,moving:o.on,clock:t*.5}),0,-(o.on?bob:0));}
  else{const h=o.height||64;q.translate(Math.round(o.x),Math.round(o.y+3));
   if(o.dash>0&&o.moving){const v=o.vector||{x:dir==='left'?-1:dir==='right'?1:0,y:dir==='back'?-1:dir==='front'?1:0},alpha=q.globalAlpha;
    for(const distance of [8,4]){q.globalAlpha=alpha*(distance===8?.12:.24);q.drawImage(im,Math.round(-h/2-v.x*distance),Math.round(-h-bob-v.y*distance),h,h);}q.globalAlpha=alpha;
   }q.drawImage(im,-h/2,-h-bob,h,h);
  }
  q.restore();
 }
 return {prepare,frame,draw,profiles};
})();

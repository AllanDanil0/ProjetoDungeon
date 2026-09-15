'use strict';
// Import supplied opaque images at runtime. No source artwork is overwritten.
const RubraSprites=(()=>{
 function extract(image,rect,threshold=100){
  const [sx,sy,w,h]=rect.map(Math.round),c=document.createElement('canvas');c.width=w;c.height=h;
  const q=c.getContext('2d',{willReadFrequently:true});q.imageSmoothingEnabled=false;q.drawImage(image,sx,sy,w,h,0,0,w,h);
  const data=q.getImageData(0,0,w,h),d=data.data,seen=new Uint8Array(w*h),queue=[];
  const background=i=>{const p=i*4;return d[p+3]<20||(Math.max(d[p],d[p+1],d[p+2])-Math.min(d[p],d[p+1],d[p+2])<42&&Math.min(d[p],d[p+1],d[p+2])>threshold);};
  const add=i=>{if(i>=0&&i<w*h&&!seen[i]&&background(i)){seen[i]=1;queue.push(i);}};
  for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}
  for(let k=0;k<queue.length;k++){const i=queue[k],x=i%w;d[i*4+3]=0;if(x)add(i-1);if(x<w-1)add(i+1);add(i-w);add(i+w);}
  // Ignore detached JPEG artifacts and decorative bats when measuring the body.
  seen.fill(0);let largest=[];
  for(let i=0;i<w*h;i++){if(seen[i]||!d[i*4+3])continue;const part=[i];seen[i]=1;
   for(let k=0;k<part.length;k++){const n=part[k],x=n%w;for(const j of [x?n-1:-1,x<w-1?n+1:-1,n-w,n+w])if(j>=0&&j<w*h&&!seen[j]&&d[j*4+3]){seen[j]=1;part.push(j);}}
   if(part.length>largest.length)largest=part;
  }
  const keep=new Uint8Array(w*h);let left=w,top=h,right=0,bottom=0;
  for(const i of largest){keep[i]=1;const x=i%w,y=Math.floor(i/w);left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
  for(let i=0;i<w*h;i++)if(!keep[i])d[i*4+3]=0;q.putImageData(data,0,0);
  if(!largest.length)throw new Error('Sprite vazio após recorte');
  return {canvas:c,left,top,width:right-left+1,height:bottom-top+1};
 }
 function normalize(raw,commonHeight=null){const c=document.createElement('canvas');c.width=c.height=64;const q=c.getContext('2d');q.imageSmoothingEnabled=false;
  const scale=Math.min(48/(commonHeight||raw.height),56/raw.width),w=Math.round(raw.width*scale),h=Math.round(raw.height*scale);
  q.drawImage(raw.canvas,raw.left,raw.top,raw.width,raw.height,32-Math.floor(w/2),60-h,w,h);return c;
 }
 function build(images){const noctis={},rubra={},portraits={};
  for(const dir of ['front','right','back','left']){const id='noctis'+dir[0].toUpperCase()+dir.slice(1),img=images[id];if(!img)throw new Error('Direção ausente: '+id);noctis[dir]=[normalize(extract(img,[0,0,img.width,img.height],dir==='front'?35:100))];}
  const img=images.rubraWalk,rows=['front','right','back','left'],raw=[];
  for(let row=0;row<4;row++)for(let col=0;col<4;col++){const x=Math.round(col*img.width/4),y=Math.round(row*img.height/4);raw.push(extract(img,[x,y,Math.round((col+1)*img.width/4)-x,Math.round((row+1)*img.height/4)-y]));}
  const height=Math.max(...raw.map(r=>r.height));rows.forEach((dir,row)=>rubra[dir]=raw.slice(row*4,row*4+4).map(r=>normalize(r,height)));
  for(const id of ['noctis','rubra']){const im=images[id+'Portrait'];portraits[id]=normalize(extract(im,[0,0,im.width,im.height],id==='noctis'?35:100));}
  return {noctis,rubra,portraits};
 }
 return {extract,normalize,build};
})();

'use strict';
const RubraSanctuaryDetail=(()=>{
 let layer=null,changed=0;
 function prepare(images){
  const original=images.profaneMap,detail=images.profaneDetail;
  layer=document.createElement('canvas');layer.width=original.width;layer.height=original.height;
  const q=layer.getContext('2d',{willReadFrequently:true});q.drawImage(original,0,0);const a=q.getImageData(0,0,layer.width,layer.height);q.clearRect(0,0,layer.width,layer.height);q.drawImage(detail,0,0,layer.width,layer.height);const b=q.getImageData(0,0,layer.width,layer.height),out=q.createImageData(layer.width,layer.height);
  const stone=(d,i)=>d[i]>30&&d[i]<180&&d[i+2]>d[i+1]+4&&d[i+2]>d[i]-8&&d[i+2]-d[i]<48&&d[i]-d[i+1]<44;
  changed=0;
  // Accept only texture within purple stone shared by both images. Keep original
  // silhouettes, green moss, bones, flames, symbols and every outer edge intact.
  for(let y=2;y<layer.height-2;y++)for(let x=2;x<layer.width-2;x++){
   const i=(y*layer.width+x)*4;if(!stone(a.data,i)||!stone(b.data,i))continue;
   if(![-2,2,-layer.width*2,layer.width*2].every(n=>stone(a.data,i+n*4)&&stone(b.data,i+n*4)))continue;
   if(C.profane.braziers.some(f=>Math.abs(x-f.x)<27&&y>f.y-67&&y<f.y+8))continue;
   const delta=(b.data[i]+b.data[i+1]+b.data[i+2]-a.data[i]-a.data[i+1]-a.data[i+2])/3;
   if(Math.abs(delta)>22||Math.abs(delta)<2)continue;
   for(let c=0;c<3;c++)out.data[i+c]=Math.max(0,Math.min(255,a.data[i+c]+Math.round(delta*.55)));
   out.data[i+3]=255;changed++;
  }q.putImageData(out,0,0);
 }
 function draw(q){if(layer){q.save();q.imageSmoothingEnabled=false;q.drawImage(layer,0,0,3840,2560);q.restore();}}
 return {prepare,draw,get layer(){return layer;},get changed(){return changed;}};
})();

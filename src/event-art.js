'use strict';
// Native pixel art: three cached transparent sprites, no external asset loading.
const RubraEventArt = (() => {
 const cache = new Map();
 const ink='#130f22', stone='#47394f', light='#96849b', gold='#bb8b4e', bright='#f4d698';
 function rect(q,c,x,y,w,h){q.fillStyle=c;q.fillRect(Math.round(x),Math.round(y),w,h);}
 // Scanline fill keeps even diagonal facets on the pixel grid.
 function facet(q,c,points){
  const min=Math.min(...points.map(p=>p[1])),max=Math.max(...points.map(p=>p[1]));
  for(let y=min;y<max;y++){const xs=[];for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];if((a[1]<=y+.5&&b[1]>y+.5)||(b[1]<=y+.5&&a[1]>y+.5))xs.push(a[0]+(y+.5-a[1])*(b[0]-a[0])/(b[1]-a[1]));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2)rect(q,c,Math.ceil(xs[i]),y,Math.max(1,Math.floor(xs[i+1])-Math.ceil(xs[i])+1),1);}
 }
 function gem(q,x,y,size,palette){
  const [edge,dark,mid,shine]=palette;
  facet(q,edge,[[x,y-size],[x+size*.48,y-size*.32],[x+size*.34,y+size*.48],[x,y+size*.72],[x-size*.4,y+size*.35],[x-size*.48,y-size*.3]]);
  facet(q,dark,[[x,y-size+2],[x+size*.4,y-size*.3],[x+size*.28,y+size*.4],[x,y+size*.6]]);
  facet(q,mid,[[x-1,y-size+2],[x-1,y+size*.55],[x-size*.34,y+size*.25],[x-size*.39,y-size*.28]]);
  facet(q,shine,[[x-2,y-size+4],[x-2,y-size*.08],[x-size*.25,y+size*.16],[x-size*.3,y-size*.3]]);
  rect(q,'#fff0ff',x-2,y-size+4,1,Math.max(2,Math.floor(size*.28)));
 }
 function rune(q,x,y,c,variant=0){
  rect(q,c,x,y,1,7);rect(q,c,x-2,y+2,5,1);rect(q,c,x+(variant%2?2:-2),y+4,1,3);rect(q,c,x-1,y,3,1);
 }
 function stoneCourse(q,x,y,w,h,seed){
  rect(q,ink,x,y,w,h);rect(q,stone,x+1,y+1,w-2,h-2);rect(q,light,x+2,y+1,w-4,1);rect(q,'#66516d',x+1,y+2,2,h-4);
  for(let i=0;i<Math.floor(w*h/25);i++){const px=x+3+(i*17+seed*7)%(w-6),py=y+3+(i*7+seed)%(h-5);rect(q,i%3?'#514258':'#78647c',px,py,2,1);}
 }
 function create(kind){
  const c=document.createElement('canvas');c.width=96;c.height=104;const q=c.getContext('2d');
  if(kind==='altar'){
   // Stepped plinth, fitted stonework, gold inlay and a recessed reliquary.
   stoneCourse(q,10,78,76,10,1);stoneCourse(q,14,72,68,9,2);
   stoneCourse(q,20,42,56,32,3);rect(q,ink,30,46,36,25);
   rect(q,'#251b32',32,47,32,23);rect(q,'#58445f',33,68,30,2);
   for(const x of [21,68]){rect(q,'#a293aa',x,44,6,27);rect(q,'#685675',x+2,45,2,25);rect(q,bright,x-1,45,8,2);rect(q,gold,x-1,67,8,3);}
   for(const x of [15,72]){stoneCourse(q,x,37,9,9,x);rect(q,bright,x,38,9,1);}
   stoneCourse(q,12,33,72,10,4);rect(q,gold,13,40,70,2);rect(q,bright,15,40,66,1);
   facet(q,'#85738b',[[14,33],[24,26],[73,26],[83,33]]);rect(q,'#c1adbb',25,26,48,1);
   for(let i=0;i<5;i++)rune(q,30+i*9,30,'#d8bc82',i);
   // Open grimoire: two individual page blocks and a red ribbon.
   facet(q,ink,[[35,26],[35,16],[47,19],[61,15],[62,26],[48,30]]);
   facet(q,'#b8a27e',[[37,25],[37,18],[47,21],[47,28]]);
   facet(q,'#e4d6ad',[[49,21],[59,18],[60,25],[49,28]]);
   for(let i=0;i<3;i++){rect(q,'#6b5147',39,20+i*2,5,1);rect(q,'#8a7053',51,21+i*2,6,1);}
   rect(q,'#982f50',47,22,2,13);rect(q,'#e16878',47,30,1,4);
   gem(q,48,56,12,[gold,'#236a69','#60bda7','#c4ffe0']);
   for(const x of [23,72]){rect(q,ink,x-5,30,11,3);rect(q,gold,x-4,29,9,2);rect(q,bright,x-1,17,3,12);rect(q,'#ba976c',x+2,20,1,8);rect(q,'#f7edcd',x-2,17,1,7);rect(q,ink,x,15,1,3);}
   for(const x of [19,76]){rect(q,gold,x,76,2,4);rect(q,bright,x,76,1,2);}
  }else if(kind==='crystal'){
   facet(q,ink,[[13,79],[25,69],[67,67],[84,79],[78,87],[25,89]]);
   facet(q,'#403044',[[17,79],[29,71],[64,70],[80,80],[74,85],[25,86]]);
   for(let i=0;i<19;i++){const x=21+(i*13)%52,y=75+(i*7)%10;rect(q,i%2?'#796478':'#281d37',x,y,4,2);}
   const p=['#22132e','#54216e','#9651b4','#e3b2f5'];
   gem(q,29,66,18,p);gem(q,69,63,23,p);gem(q,47,46,35,p);
   facet(q,'#7939a3',[[49,14],[58,39],[50,49],[56,36]]);
   for(let i=0;i<3;i++)rune(q,45,33+i*11,'#ffd6ff',i);
   // Broken restraining bands and small gold rivets.
   for(const [x,y,w]of [[32,61,14],[50,64,13],[62,70,14]]){rect(q,ink,x,y,w,4);rect(q,'#846577',x,y+1,w,1);rect(q,gold,x+2,y,2,3);}
   rect(q,'#d790ed',33,80,7,1);rect(q,'#d790ed',59,79,9,1);
  }else{
   // Heraldic hunt seal with cut metal wings and a ruby core.
   for(const s of [-1,1])for(let i=0;i<5;i++){
    const x=48+s*(8+i*4);rect(q,ink,x-2,41+i*2,5,12-i);rect(q,gold,x-1,42+i*2,3,9-i);rect(q,bright,x-1,42+i*2,1,7-i);
   }
   gem(q,48,47,17,[ink,gold,bright,'#fff0c3']);gem(q,48,46,10,['#50302f','#6f203d','#cb4861','#ffb093']);
   rect(q,bright,47,25,2,6);rect(q,bright,44,28,8,2);
   facet(q,gold,[[43,61],[48,68],[53,61],[48,73]]);
  }
  return c;
 }
 function sprite(q,kind,x,y){if(!cache.has(kind))cache.set(kind,create(kind));q.drawImage(cache.get(kind),Math.round(x)-48,Math.round(y)-82);}
 function spark(q,x,y,c){rect(q,c,x-2,y,5,1);rect(q,c,x,y-2,1,5);}
 function flame(q,x,y,t){
  const f=Math.floor(t*9)%4;
  for(let row=0;row<10;row++){const width=Math.max(1,5-Math.floor(row/2)),dx=row>4?Math.round(Math.sin(row+f)*1.5):0;rect(q,row<4?'#81dbc3':'#52a998',x-Math.floor(width/2)+dx,y-row,width,1);}
  rect(q,'#edffe0',x-1,y-3,2,4);rect(q,'#d3f5a5',x,y-5,1,3);
 }
 function ring(q,x,y,r,progress,color){
  for(let i=0;i<160;i++){const a=i*Math.PI/80;rect(q,i/160<progress?color:'#bda991',x+Math.cos(a)*r,y+Math.sin(a)*r,i%20===0?3:2,i%20===0?3:2);}
  for(let i=0;i<8;i++){const a=i*Math.PI/4;rune(q,Math.round(x+Math.cos(a)*(r-9)),Math.round(y+Math.sin(a)*(r-9))-3,color,i);}
 }
 function altar(q,x,y,t,hp,progress,on=true){
  q.save();q.imageSmoothingEnabled=false;sprite(q,'altar',x,y);
  flame(q,x-25,y-68,t);flame(q,x+24,y-68,t+.4);
  rect(q,ink,x-29,y+13,58,7);rect(q,gold,x-28,y+14,56,5);rect(q,'#302032',x-27,y+15,54,3);
  rect(q,hp<30?'#ef8b99':'#8ee1b4',x-27,y+15,Math.round(54*Math.max(0,Math.min(1,hp/100))),3);
  if(on)for(let i=0;i<5;i++){const phase=(t*.35+i/5)%1;q.globalAlpha=(1-phase)*.75;spark(q,x+Math.sin(i*2.7+t*.3)*21,y-34-phase*38,'#cff8d8');}
  q.restore();
 }
 function crystal(q,x,y,t,on=true){
  q.save();q.imageSmoothingEnabled=false;sprite(q,'crystal',x,y);
  if(on)for(let i=0;i<5;i++){const a=t*.65+i*Math.PI*2/5;spark(q,x+Math.cos(a)*24,y-32+Math.sin(a)*13,'#ebc6ff');}
  q.restore();
 }
 function seal(q,x,y,t,on=true){q.save();q.imageSmoothingEnabled=false;sprite(q,'seal',x,y-35+(on?Math.round(Math.sin(t*2)*2):0));q.restore();}
 return {altar,crystal,seal,ring};
})();

'use strict';
const {app,BrowserWindow}=require('electron');
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const out=path.resolve('test-output/quality-baseline');
app.setPath('userData',path.resolve('.test-profile/quality-'+Date.now()));
app.disableHardwareAcceleration();
app.whenReady().then(async()=>{
 const w=new BrowserWindow({show:false,width:1360,height:768,webPreferences:{offscreen:true,backgroundThrottling:false}});
 const errors=[],checks=[];
 w.webContents.on('console-message',e=>{if(e.level==='error')errors.push(e.message);});
 const js=c=>w.webContents.executeJavaScript(c,true);
 try{
  fs.mkdirSync(out,{recursive:true});await w.loadFile(path.resolve(process.argv.includes('--packaged')?'dist/win-unpacked/resources/app.asar/index.html':'index.html'));
  for(let i=0;i<300&&!await js('assetReady');i++)await new Promise(r=>setTimeout(r,100));
  assert.ok(await js('assetReady'),'assets ready');
  const data=await js(`(()=>{
   state='paused';
   const cv=document.createElement('canvas');cv.width=960;cv.height=384;
   const q=cv.getContext('2d');q.fillStyle='#1a1428';q.fillRect(0,0,960,384);
   q.save();q.scale(3,3);RubraEventArt.altar(q,52,97,.3,85,.4);RubraEventArt.crystal(q,160,97,.3);RubraEventArt.seal(q,263,116,.3);q.restore();
   const atlas=cv.toDataURL();
   const transparent=document.createElement('canvas');transparent.width=160;transparent.height=160;
   const t=transparent.getContext('2d');
   const pixels=(kind,time,on)=>{t.clearRect(0,0,160,160);if(kind==='altar')RubraEventArt.altar(t,80,105,time,90,.5,on);else RubraEventArt[kind](t,80,105,time,on);return transparent.toDataURL();};
   const animated=['altar','crystal','seal'].every(k=>pixels(k,0,true)!==pixels(k,.7,true));
   const reduced=pixels('crystal',0,false)===pixels('crystal',.7,false)&&pixels('seal',0,false)===pixels('seal',.7,false);
   pixels('altar',0,true);const corner=t.getImageData(0,0,1,1).data[3]===0;
   const before=JSON.stringify({save,run,player,enemies,effects});
   const samples=[];for(let i=0;i<400;i++){const a=performance.now();RubraEventArt.altar(t,80,105,i*.016,80,.5);RubraEventArt.crystal(t,80,105,i*.016);RubraEventArt.seal(t,80,105,i*.016);samples.push(performance.now()-a);}
   const unchanged=before===JSON.stringify({save,run,player,enemies,effects});
   const original=document.createElement.bind(document);let allocated=0;document.createElement=(...args)=>{if(args[0]==='canvas')allocated++;return original(...args);};
   try{for(let i=0;i<60;i++){RubraEventArt.altar(t,80,105,i,100,0);RubraEventArt.crystal(t,80,105,i);RubraEventArt.seal(t,80,105,i);}}finally{document.createElement=original;}
   const sorted=[...samples].sort((a,b)=>a-b),weaponStats=[];
   for(const arena of ['necropolis','ice','profane'])for(const [id,cfg]of Object.entries(C.weapons))for(const level of [1,K.weaponCap(arena,id)]){const s=K.stats({id,level},{map:arena});weaponStats.push({arena,id,name:cfg.name,level,damage:s.damage,interval:s.interval,radius:s.radius,duration:s.duration,kind:s.kind});}
   const heroes=Object.entries(C.characters).map(([id,c])=>({id,name:c.name,hp:c.hp,speed:c.speed,damage:c.damage,attackSpeed:c.attackSpeed,weapon:c.weapon,price:c.price||0}));
   return {atlas,animated,reduced,corner,unchanged,allocated,eventDrawMs:{mean:samples.reduce((a,b)=>a+b)/samples.length,p95:sorted[Math.floor(sorted.length*.95)],samples:samples.length},weaponStats,heroes};
  })()`);
  for(const key of ['animated','reduced','corner','unchanged']){assert.ok(data[key],key);checks.push(key);}
  assert.equal(data.allocated,0,'sprite cache never allocates again');checks.push('cached sprites');
  fs.writeFileSync(out+'/event-art.png',Buffer.from(data.atlas.split(',')[1],'base64'));delete data.atlas;
  // Freeze simulation, but allow the compositor and render loop to present the new scene.
  await js('void(update=()=>{})');
  for(const arena of ['necropolis','ice','profane'])for(const type of ['altar','crystals','marked']){
   const ok=await js(`(()=>{save=K.defaults();save.maps=Object.keys(C.maps);save.characters=Object.keys(C.characters);save.weapons=Object.keys(C.weapons);save.selectedMap='${arena}';save.selectedCharacter='rubra';begin();enemies=[];run.eventIndex=0;const ok=RubraChronicles.start('${type}');state='paused';if(ok){const ev=run.encounterEvent;const p=K.nearestPoint({x:ev.x+70,y:ev.y+40},map,player.r);player.x=p.x;player.y=p.y;state='playing';render();}return ok;})()`);
   assert.ok(ok,arena+' '+type);await new Promise(r=>setTimeout(r,250));
   assert.ok(await js("!$('eventHud').classList.contains('hidden')&&run.encounterEvent.type==='"+type+"'&&run.map==='"+arena+"'"));checks.push(arena+' '+type);
   fs.writeFileSync(out+'/'+arena+'-'+type+'.png',(await w.webContents.capturePage()).toPNG());
  }
  data.scenes=await js(`(()=>{
   const rows=[];
   for(const arena of ['necropolis','ice','profane']){
    save.selectedMap=arena;begin();run.encounterEvent=null;state='playing';
    const key=map.waves?map.waves[0]?.pool?.[0]:map.enemies[0];
    const enemyKey=key||(arena==='profane'?'fanatic':'skeleton');
    enemies=[];for(let i=0;i<K.enemyLimit(arena);i++){const a=i*2.39996,p=K.nearestPoint({x:player.x+Math.cos(a)*(90+i*2),y:player.y+Math.sin(a)*(90+i*2)},map,15);enemies.push(newEnemy(enemyKey,p));}
    for(let i=0;i<20;i++)render();
    const ms=[];for(let i=0;i<120;i++){const t=performance.now();render();ms.push(performance.now()-t);}ms.sort((a,b)=>a-b);
    rows.push({arena,enemies:enemies.length,meanMs:ms.reduce((a,b)=>a+b)/ms.length,p95Ms:ms[Math.floor(ms.length*.95)],samples:ms.length});
   }state='paused';return rows;
  })()`);
  assert.deepEqual(errors,[]);
  fs.writeFileSync(out+'/results.json',JSON.stringify({date:new Date().toISOString(),environment:{cpu:os.cpus()[0].model,platform:os.platform(),electron:process.versions.electron,node:process.versions.node,render:'software offscreen; CPU draw-call time, not gameplay FPS'},checks,errors,...data},null,2));
  console.log(checks.length+' quality checks passed; '+JSON.stringify(data.eventDrawMs));app.exit(0);
 }catch(e){console.error(e);fs.writeFileSync(out+'/failure.txt',e.stack);app.exit(1);}
});

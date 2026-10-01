'use strict';
const {app,BrowserWindow}=require('electron'),fs=require('node:fs'),path=require('node:path');
app.setPath('userData',path.resolve('.test-profile/weapons-'+Date.now()));app.disableHardwareAcceleration();
app.whenReady().then(async()=>{try{
 const w=new BrowserWindow({show:false,webPreferences:{offscreen:true,backgroundThrottling:false}});
 const js=c=>w.webContents.executeJavaScript(c,true);
 await w.loadFile(path.resolve('index.html'));
 for(let i=0;i<300&&!await js('assetReady');i++)await new Promise(r=>setTimeout(r,100));
 if(!await js('assetReady'))throw Error('assets not ready');
 const rows=await js(`(()=>{
  const rows=[],random=Math.random,hud=updateHud;let seed=17;
  Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);updateHud=()=>{};
  try{for(const arena of ['necropolis','ice','profane'])for(const id of C.maps[arena].weapons)for(const level of [1,K.weaponCap(arena,id)])for(const count of [1,12]){
   seed=17;save=K.defaults();save.maps=Object.keys(C.maps);save.characters=Object.keys(C.characters);save.weapons=Object.keys(C.weapons);save.selectedMap=arena;save.selectedCharacter='rubra';begin();
   run.eventIndex=3;spawnClock=1e9;player.damage=player.attackSpeed=player.range=1;player.invuln=100;run.weapons=[{id,level}];enemies=[];
   const targets=[];for(let i=0;i<count;i++){const a=i*Math.PI*2/count,p={x:player.x+Math.cos(a)*65,y:player.y+Math.sin(a)*65},e=newEnemy(arena==='profane'?'fanatic':map.enemies[0],p);e.hp=e.maxHp=1e7;enemies.push(e);targets.push(p);}
   let slowed=0;for(let i=0;i<300;i++){for(let j=0;j<enemies.length;j++){enemies[j].x=targets[j].x;enemies[j].y=targets[j].y;enemies[j].telegraph=null;enemies[j].charge=null;}update(1/30);slowed+=enemies.filter(e=>e.slowTimer>0).length/30;}
   const damage=run.report.weapons[id]?.damage||0;if(!Number.isFinite(damage))throw Error('nonfinite damage '+id);
   rows.push({arena,weapon:id,level,targets:count,seconds:10,effectiveDamage:Math.round(damage*100)/100,slowTargetSeconds:Math.round(slowed*100)/100});state='paused';
  }}finally{Math.random=random;updateHud=hud;}return rows;
 })()`);
 fs.mkdirSync('test-output/quality-baseline',{recursive:true});fs.writeFileSync('test-output/quality-baseline/weapons.json',JSON.stringify({method:'Seed 17; neutral hero modifiers; one weapon; 10 s, 30 Hz; 1 or 12 fixed high-HP targets at radius 65; no waves/events. Placement may favor or disadvantage a weapon. Not campaign DPS or player survival.',rows},null,2));
 console.log(rows.length+' weapon scenarios measured');app.exit(0);
}catch(e){console.error(e);app.exit(1);}});

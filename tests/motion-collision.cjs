const {app,BrowserWindow}=require('electron'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),crypto=require('crypto');
app.setPath('userData',path.resolve('.test-profile/motion-'+Date.now()));app.disableHardwareAcceleration();
app.whenReady().then(async()=>{
 const out='test-output/motion-collision';fs.mkdirSync(out,{recursive:true});
 const w=new BrowserWindow({show:false,width:1360,height:900,webPreferences:{offscreen:true,backgroundThrottling:false}}),errors=[],checks=[];
 w.webContents.on('console-message',e=>{if(e.level==='error')errors.push(e.message);});
 const js=c=>w.webContents.executeJavaScript('(()=>eval('+JSON.stringify(c)+'))()',true);
 const check=async(n,c)=>{assert.ok(await js(c),n);checks.push(n);console.log('PASS '+n);};
 try{
  await w.loadFile(path.resolve(process.argv.includes('--packaged')?'dist/win-unpacked/resources/app.asar/index.html':'index.html'));
  for(let i=0;i<400&&!await js('assetReady');i++)await new Promise(r=>setTimeout(r,100));
  await check('all assets ready','assetReady');
  await js("save=K.defaults();save.characters=Object.keys(C.characters);save.maps=Object.keys(C.maps);save.weapons=Object.keys(C.weapons);save.selectedMap='profane';save.selectedCharacter='noctis';begin();state='paused'");
  await check('every hero has directional gait and two dash poses',"Object.values(characterFrames).every(h=>['front','right','back','left'].every(d=>h[d].length>=3&&new Set(h[d].map(c=>c.toDataURL())).size>=3&&h.dash[d].length===2&&h.dash[d][0].toDataURL()!==h.dash[d][1].toDataURL()))");
  await check('Noctis and Profane show distinct front side and back',"['noctis',...C.profane.heroes].every(id=>new Set(['front','right','back','left'].map(d=>characterFrames[id][d][0].toDataURL())).size===4)");
  await check('every imported frame has transparent margin and no green matte',"['noctis',...C.profane.heroes].every(id=>['front','right','back','left'].every(dir=>[...characterFrames[id][dir],...characterFrames[id].dash[dir]].every(c=>{const a=c.getContext('2d').getImageData(0,0,64,64).data;let pixels=0;for(let y=0;y<64;y++)for(let x=0;x<64;x++){const i=(y*64+x)*4;if(a[i+3]){pixels++;if(x===0||x===63||y===0||y===63||a[i+1]>80&&a[i+1]>a[i]*1.4&&a[i+1]>a[i+2]*1.4)return false;}}return pixels>150;})))");
  await check('dash animation progresses even without movement input',"(()=>{const h=characterFrames.noctis;return RubraHeroMotion.frame(h,'right',0,{dash:.17,id:'noctis'})!==RubraHeroMotion.frame(h,'right',0,{dash:.03,id:'noctis'})})()");
  await check('walk and dash render differently without leaking Canvas state',"(()=>{const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');for(const id of Object.keys(C.characters))for(const dir of ['front','right','back','left']){q.clearRect(0,0,128,128);q.globalAlpha=.8;RubraHeroMotion.draw(q,characterFrames[id],id,dir,1,{x:64,y:100,height:64,moving:true,clock:.1});const walk=c.toDataURL();q.clearRect(0,0,128,128);RubraHeroMotion.draw(q,characterFrames[id],id,dir,1,{x:64,y:100,height:64,moving:true,dash:.15});if(walk===c.toDataURL()||q.globalAlpha!==.8||q.getTransform().e!==0||q.getTransform().f!==0)return false;}return true})()");
  const collision=await js(`(()=>{const rows=[];for(const radius of [8,10,30,32])for(const [index,o]of map.obstacles.entries())for(let side=0;side<8;side++){
   const cx=o.shape==='rect'?o.x+o.w/2:o.x,cy=o.shape==='rect'?o.y+o.h/2:o.y;
   const p={x:side===0?o.x-radius-20:side===1?o.x+o.w+radius+20:cx,y:side===2?o.y-radius-20:side===3?o.y+o.h+radius+20:cy,r:radius};
   if(side>=4){p.x=side%2?o.x+o.w+radius+20:o.x-radius-20;p.y=side<6?o.y-radius-20:o.y+o.h+radius+20;}
   if(!K.validPoint(p,map,radius))continue;const dx=cx-p.x,dy=cy-p.y;moveBody(p,dx,dy);if(!K.validPoint(p,map,radius))throw Error('penetration '+index+' '+side+' '+radius);rows.push({index,kind:o.kind,side,radius});
  }return rows;})()`);
  assert.ok(collision.length>150,'collision coverage');checks.push('swept movement around structures, four actor radii');
  await check('missing eastern pillar blocks walking and dash',"!K.validPoint({x:1401*2.5,y:740*2.5},map,8)");
  await check('main aisles and altar approaches stay open',"[[768,760],[768,620],[690,510],[900,490],[240,490],[1300,490],[768,260]].every(([x,y])=>K.validPoint({x:x*2.5,y:y*2.5},map,10))");
  await check('dash direction locked and new run resets stale direction',"(()=>{state='playing';enemies=[];spawnClock=999;run.eventIndex=3;keys.clear();keys.add('d');dash();const x=dashDirection.x;keys.clear();keys.add('a');update(.04);const ok=x===1&&dashDirection.x===1&&player.facing==='right';keys.clear();begin();state='paused';return ok&&dashDirection.x===0&&dashDirection.y===1&&player.dash===0;})()");
  await check('all perimeter edges stop player and ghost',"(()=>{for(const ghost of [false,true])for(const [dx,dy]of [[-5000,0],[5000,0],[0,-5000],[0,5000]]){const e={...map.spawn,r:8,cfg:{ghost}};moveBody(e,dx,dy);if(!RubraProfane.valid(e,map,8,ghost))return false;}return true})()");
  await check('all nine heroes stop at altar during walk and dash',"(()=>{for(const id of Object.keys(C.characters)){save.selectedCharacter=id;begin();enemies=[];spawnClock=999;run.eventIndex=3;player.x=768*2.5;player.y=570*2.5;keys.clear();keys.add('w');for(let i=0;i<100;i++){if(i===20)dash();update(.016);if(!K.validPoint(player,map,player.r))return false;}if(player.moving||player.y<map.obstacles.find(o=>o.kind==='altar').y)return false;}keys.clear();state='paused';return true;})()");
  await check('spawn and checkpoint repair respect the new pillar',"(()=>{for(let i=0;i<500;i++){const p=K.spawnPoint(map,player,200,32);if(p&&!K.validPoint(p,map,32))return false;}run.player={...player,x:1401*2.5,y:740*2.5};save.active=JSON.parse(JSON.stringify(run));begin(true);state='paused';return K.validPoint(player,map,player.r);})()");
  await check('stone texture is sparse transparent overlay',"RubraSanctuaryDetail.changed>1000&&RubraSanctuaryDetail.changed<assetImages.profaneMap.width*assetImages.profaneMap.height*.3");
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync('assets/profane/map.png')).digest('hex'),'0a25f041e063cc3032148bdb3bbef2dd34a67e7617ef2d6b6c6d8dc7632cc651');checks.push('original map bytes unchanged');
  for(const id of await js('Object.keys(characterFrames)')){
   const image=await js(`(()=>{const c=document.createElement('canvas');c.width=1024;c.height=512;const q=c.getContext('2d');q.imageSmoothingEnabled=false;q.fillStyle='#242132';q.fillRect(0,0,c.width,c.height);['front','right','back','left'].forEach((dir,row)=>[...characterFrames['${id}'][dir],...characterFrames['${id}'].dash[dir]].forEach((im,col)=>q.drawImage(im,col*128,row*128,128,128)));return c.toDataURL().split(',')[1]})()`);
   fs.writeFileSync(out+'/'+id+'.png',Buffer.from(image,'base64'));
  }
  const overlay=await js(`(()=>{const c=document.createElement('canvas');c.width=1536;c.height=1024;const q=c.getContext('2d');q.drawImage(assetImages.profaneMap,0,0);q.drawImage(RubraSanctuaryDetail.layer,0,0);q.strokeStyle='#ff746e';q.lineWidth=1;for(const o of map.obstacles)if(o.shape==='rect')q.strokeRect(o.x/2.5,o.y/2.5,o.w/2.5,o.h/2.5);return c.toDataURL().split(',')[1]})()`);fs.writeFileSync(out+'/collisions.png',Buffer.from(overlay,'base64'));
  assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({checks,collision,errors},null,2));console.log(checks.length+' checks; '+collision.length+' structural approaches');app.exit(0);
 }catch(e){console.error(e);fs.writeFileSync(out+'/failure.txt',e.stack);app.exit(1);}
});

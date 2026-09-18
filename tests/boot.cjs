const {app,BrowserWindow}=require('electron'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
app.setPath('userData',path.resolve(__dirname,'../.test-profile/boot'));app.disableHardwareAcceleration();
const output=path.resolve(__dirname,'../test-output/boot');fs.mkdirSync(output,{recursive:true});
app.whenReady().then(async()=>{const win=new BrowserWindow({show:false,webPreferences:{offscreen:true,sandbox:true,contextIsolation:true,backgroundThrottling:false}}),errors=[],checks=[];
win.webContents.on('console-message',e=>{if(e.level==='error')errors.push(e.message);});
const run=s=>win.webContents.executeJavaScript('(()=>eval('+JSON.stringify(s)+'))()',true),wait=ms=>new Promise(r=>setTimeout(r,ms));
const ready=async()=>{for(let i=0;i<200;i++){if(await run("document.body.dataset.assets==='ready'"))return;if(await run("document.body.dataset.assets==='failed'"))throw Error(await run("$('saveNotice').textContent"));await wait(100);}throw Error('Startup timed out');};
const reload=async()=>{const loaded=new Promise(r=>win.webContents.once('did-finish-load',r));win.reload();await loaded;};
const check=async(name,code)=>{assert.ok(await run(code),name);checks.push(name);console.log('PASS '+name);};
try{await win.loadFile(path.resolve(__dirname,process.argv.includes('--packaged')?'../dist/win-unpacked/resources/app.asar/index.html':'../index.html'));await ready();
for(const id of ['tutorial','necropolis','ice','profane']){
 await run(`profile='campaign';save=K.defaults();save.characters=Object.keys(C.characters);save.maps=Object.keys(C.maps);save.weapons=Object.keys(C.weapons);save.selectedCharacter='vespera';save.selectedMap='${id}';save.gold=1379;save.best=86;K.persist(localStorage,save,C.profiles.campaign);`);await reload();await ready();
 await check(id+': cold campaign reload keeps progress and enables actions',`assetReady&&save.selectedMap==='${id}'&&save.gold===1379&&save.best===86&&!$('startButton').disabled&&!$('armoryButton').disabled&&Object.keys(characterFrames).length===Object.keys(C.characters).length`);
 await check(id+': Play and Arsenal navigate with visible portraits/icons',"$('startButton').click();render();const shown=state==='characters'&&[...document.querySelectorAll('[data-portrait]')].every(c=>{const d=c.getContext('2d').getImageData(0,0,64,64).data;return d.some((x,i)=>i%4===3&&x>0)});$('charactersBack').click();$('armoryButton').click();const arsenal=state==='armory'&&$('armoryCards').children.length===Object.keys(C.weapons).length;$('armoryBack').click();shown&&arsenal");
}
await check('profane checkpoint prepared',"save.selectedMap='profane';begin();run.gold=19;elapsed=284;player.hp=4;snapshot();save.active.player={x:player.x,y:player.y,hp:4};K.persist(localStorage,save,C.profiles.campaign);true");await reload();await ready();
await check('cold resume preserves checkpoint, gold and prepared world',"$('continueRun').click();state==='playing'&&run.map==='profane'&&run.gold===19&&player.hp===4&&elapsed>=284&&assetReady");
await check('laboratory changes preserve campaign and all hero previews',"menu();laboratoryScreen();$('labUnlockAll').click();$('labPlay').click();render();const portraits=[...document.querySelectorAll('[data-portrait]')];const ok=portraits.length===Object.keys(C.characters).length&&portraits.every(c=>c.getContext('2d').getImageData(0,0,64,64).data.some((v,i)=>i%4===3&&v));switchProfile('campaign');ok&&save.gold===1379");
assert.deepEqual(errors,[]);let blocked=true;win.webContents.session.webRequest.onBeforeRequest((d,cb)=>cb({cancel:blocked&&d.url.endsWith('/assets/profane/absolute-v2.png')}));await reload();for(let i=0;i<200&&!await run("document.body.dataset.assets==='failed'");i++)await wait(100);
await check('missing asset produces explicit failure and a usable retry',"!assetReady&&$('startButton').disabled&&$('armoryButton').disabled&&!$('retryAssets').classList.contains('hidden')&&$('saveNotice').textContent.includes('absolute-v2.png')");blocked=false;await run("$('retryAssets').click()");await ready();
await check('retry recovers assets and keeps campaign save',"assetReady&&!$('startButton').disabled&&!$('armoryButton').disabled&&$('retryAssets').classList.contains('hidden')&&save.gold===1379&&save.selectedMap==='profane'");
assert.ok(errors.every(s=>s.includes('absolute-v2.png')||s.includes('ERR_BLOCKED_BY_CLIENT')),errors.join('\n'));fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({checks,expectedAssetFailure:errors},null,2));console.log(checks.length+' boot checks passed');app.exit(0);
}catch(e){console.error(e);fs.writeFileSync(path.join(output,'failure.txt'),e.stack+'\n'+errors.join('\n'));app.exit(1);}});
setTimeout(()=>app.exit(2),180000).unref();

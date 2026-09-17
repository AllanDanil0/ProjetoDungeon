const {app,BrowserWindow}=require('electron');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
app.setPath('userData',path.resolve(__dirname,'../.test-profile/menu-qa'));app.disableHardwareAcceleration();
const output=path.resolve(__dirname,'../test-output/menus');fs.mkdirSync(output,{recursive:true});
const checks=[],errors=[];const packaged=process.argv.includes('--packaged');
app.whenReady().then(async()=>{const win=new BrowserWindow({show:false,width:1360,height:900,webPreferences:{offscreen:true,sandbox:true,contextIsolation:true,nodeIntegration:false,backgroundThrottling:false}});const run=c=>win.webContents.executeJavaScript('(()=>eval('+JSON.stringify(c)+'))()',true);const wait=ms=>new Promise(r=>setTimeout(r,ms));
win.webContents.on('console-message',(event)=>{if(event.level==='error')errors.push(event.message);});
try{
 await win.loadFile(path.resolve(__dirname,packaged?'../dist/win-unpacked/resources/app.asar/index.html':'../index.html'));
 for(let i=0;i<150&&!await run('typeof assetReady!=="undefined"&&assetReady');i++)await wait(100);
 await run("localStorage.clear();profile='laboratory';save=K.defaults();K.laboratoryUnlock(save,profile,'maps',Object.keys(C.maps));K.laboratoryUnlock(save,profile,'characters',Object.keys(C.characters));save.selectedCharacter='aelthir';save.gold=390;menu();");
 const screens={menu:'menu()',characters:'charactersScreen()',maps:'mapsScreen()',options:'menu();optionsScreen()',help:"menu();$('menuControls').click()",laboratory:'laboratoryScreen()'};
 for(const [width,height]of [[1360,900],[960,640],[420,850]]){
  win.setSize(width,height);await wait(150);
  for(const [id,open]of Object.entries(screens)){
   await run(open);await wait(350);
   const geometry=await run(`(()=>{const p=$('${id}'),d=p.querySelector('.dialog')||p.querySelector('.title-scene'),r=d.getBoundingClientRect();return {center:Math.abs((r.left+r.right)/2-innerWidth/2),overflow:document.documentElement.scrollWidth>innerWidth+1,chrome:document.body.classList.contains('in-menus'),wallet:document.querySelector('#menuWallet .goldTotal').textContent}})()`);
   assert.ok(geometry.center<3&&!geometry.overflow&&geometry.chrome,JSON.stringify({id,width,geometry}));assert.equal(geometry.wallet,'390');
   const ids=await run(`Array.from($('${id}').querySelectorAll('button:not(:disabled),input:not(:disabled)')).filter(b=>b.getClientRects().length).map((b,i)=>{b.dataset.qa='qa'+i;return b.dataset.qa})`);
   for(const key of ids){const hit=await run(`(()=>{const b=$('${id}').querySelector('[data-qa=${key}]');b.scrollIntoView({block:'center',inline:'nearest'});const r=b.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {ok:!!hit&&(b===hit||b.contains(hit)),rect:[r.x,r.y,r.width,r.height],text:b.textContent?.slice(0,35)}})()`);assert.ok(hit.ok,JSON.stringify({id,width,key,hit}));}
   await run(`$('${id}').scrollTop=0;const d=$('${id}').querySelector('.dialog');if(d)d.scrollTop=0;for(const f of $('${id}').querySelectorAll('fieldset'))f.scrollTop=0;render();`);await wait(150);
   if(width!==960)fs.writeFileSync(path.join(output,`${width}-${id}.png`),(await win.webContents.capturePage()).toPNG());
   checks.push(`${width}x${height}: ${id} centered; controls unobstructed`);
  }
 }
 await run('charactersScreen();save.options.particles=false;time=0;render()');const still=await run("document.querySelector('[data-portrait=aelthir]').toDataURL()");await run('time=1.75;render()');assert.equal(await run("document.querySelector('[data-portrait=aelthir]').toDataURL()"),still);await run('save.options.particles=true;time=0;render()');const animated=await run("document.querySelector('[data-portrait=aelthir]').toDataURL()");await run('time=1.75;render()');assert.notEqual(await run("document.querySelector('[data-portrait=aelthir]').toDataURL()"),animated);checks.push('Aelthir stable pose with optional animated aura');
 assert.equal(errors.length,0,errors.join('\n'));fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({checks,errors},null,2));console.log('PASS '+checks.length+' menu checks');app.exit(0);
}catch(e){console.error(e);fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({checks,errors,failure:String(e)},null,2));app.exit(1);}});
setTimeout(()=>app.exit(2),120000).unref();

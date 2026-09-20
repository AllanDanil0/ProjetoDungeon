const {app,BrowserWindow}=require('electron'),path=require('path'),assert=require('node:assert/strict');
app.commandLine.appendSwitch('user-data-dir',path.resolve('.test-profile/window'));
require(path.resolve(process.argv.includes('--packaged')?'dist/win-unpacked/resources/app.asar/main.js':'main.js'));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
app.whenReady().then(async()=>{try{let w;for(let i=0;i<100;i++){w=BrowserWindow.getAllWindows()[0];if(w?.isVisible())break;await wait(100);}assert.ok(w.isFullScreen());console.log('PASS native window starts fullscreen');
for(const expected of [false,true]){w.webContents.sendInputEvent({type:'keyDown',keyCode:'F11'});w.webContents.sendInputEvent({type:'keyUp',keyCode:'F11'});for(let i=0;i<30&&w.isFullScreen()!==expected;i++)await wait(100);assert.equal(w.isFullScreen(),expected);console.log('PASS native F11 fullscreen='+expected);await wait(400);}w.close();app.exit(0);}catch(e){console.error(e);app.exit(1)}});

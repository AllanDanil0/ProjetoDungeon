// Development entry point is explicitly excluded from distribution.
const {app,BrowserWindow}=require('electron');const path=require('node:path'),fs=require('node:fs');
if(app.isPackaged)throw new Error('Development tools cannot run packaged.');
app.setName('RUBRA Desenvolvimento');app.setPath('userData',path.resolve(__dirname,'../.dev-profile'));
app.whenReady().then(async()=>{const win=new BrowserWindow({width:1360,height:960,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});await win.loadFile(path.resolve(__dirname,'../index.html'));await win.webContents.executeJavaScript(fs.readFileSync(path.join(__dirname,'panel.js'),'utf8'));});app.on('window-all-closed',()=>app.quit());

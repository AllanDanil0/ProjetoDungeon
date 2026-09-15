const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path');

app.setName('The night is yours');
// A stable location preserves the original localStorage record between launches.
app.setPath('userData', path.join(app.getPath('appData'), 'RUBRA'));
const gotLock = app.requestSingleInstanceLock();
let window;
if (!gotLock) app.quit();
else {
  app.on('second-instance', () => {
    if (!window) return;
    if (window.isMinimized()) window.restore();
    window.focus();
  });
  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    window = new BrowserWindow({
      width: 1360, height: 960, minWidth: 800, minHeight: 600,
      title: 'The night is yours', backgroundColor: '#080c15',
      show: false,
      webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true }
    });
    window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    window.webContents.on('will-navigate', event => event.preventDefault());
    window.webContents.session.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
    window.webContents.on('before-input-event', (event, input) => {
      if (input.type === 'keyDown' && input.key === 'F11' && !input.isAutoRepeat) {
        event.preventDefault();
        window.setFullScreen(!window.isFullScreen());
      }
    });
    window.once('ready-to-show', () => window.show());
    window.loadFile(path.join(__dirname, 'index.html'));
  });
  app.on('window-all-closed', () => app.quit());
}

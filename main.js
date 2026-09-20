const { app, BrowserWindow, Menu } = require('electron');
const path = require('node:path');

app.setName('The night is yours');
// A stable location preserves the original localStorage record between launches.
// Honor Electron's standard profile-directory switch; normal launches keep RUBRA.
// Distribution smoke tests use an isolated directory, never the player's save.
const profileDirectory = app.commandLine.getSwitchValue('user-data-dir');
app.setPath('userData', profileDirectory && path.isAbsolute(profileDirectory)
  ? profileDirectory : path.join(app.getPath('appData'), 'RUBRA'));
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
      show: false, fullscreen: true, icon: path.join(__dirname, 'assets/branding/rubra-icon.png'),
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

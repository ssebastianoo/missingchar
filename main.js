const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
let win;

if (require('electron-squirrel-startup')) return app.quit();

const createWindow = () => {
    win = new BrowserWindow({
        width: 500,
        height: 334,
        icon: path.join(__dirname, 'assets/logo.ico'),
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.setAlwaysOnTop(true, 'screen');
    win.loadFile(path.join(__dirname, 'views', 'index.html'));
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

  const ret = globalShortcut.register('Ctrl+alt+.', () => {
    if(win.isFocused()){
        win.hide()
    }else{
        win.show()
    }
  })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('options-action', function (event, arg) {
    switch (arg) {
        case 'minimize':
            win.minimize();
            break;
        case 'maximize':
            if (win.isMaximized()) {
                win.unmaximize()
                event.reply('edit-max-icon', 'maximize');
            } else {
                win.maximize();
                event.reply('edit-max-icon', 'unmaximize');
            }
            break;
        case 'close':
            win.close();
            break;
    }
});


app.on('will-quit', () => {
    globalShortcut.unregisterAll()
  })
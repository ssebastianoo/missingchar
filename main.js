const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
let win;

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
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();1
    });
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
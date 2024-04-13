import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { autoUpdater } from 'electron-updater';
import { app, BrowserWindow, ipcMain } from 'electron';

import { 
    saveAccount, 
    parseAccounts, 
    deleteAccount 
} from './functions.js';

let mainWindow = null;
let addAccount = null;
const __dirname = dirname(fileURLToPath(import.meta.url));

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();
});

const renderWindow = async () => {
    mainWindow = new BrowserWindow({
        minHeight: 800,
        minWidth: 1400,
        width: 1400,
        height: 800,
        frame: false,
        backgroundColor: '#0E0F16',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: false,
            sandbox: false,
            preload: join(__dirname, "../../build/preload.mjs")
        },
        icon: join(__dirname, '../renderer/Images/UI/Lunar Logo.png'),
        resizable: false
    });

    mainWindow.setMenu(null);
    mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.webContents.closeDevTools();
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.loadURL(`file://${join(__dirname, '../../build/index.html')}#/dashboard`);
};

app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.whenReady().then(async () => {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
  await renderWindow();
  autoUpdater.checkForUpdates();
});

ipcMain.on('close-main-window', () => {
    if (mainWindow) {
        mainWindow.close();
    }
});

ipcMain.on('minimize-main-window', () => {
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('close-add-account-window', () => {
    addAccount.close();
});

ipcMain.on('check-for-updates', (event, args) => {
    autoUpdater.checkForUpdates();
  
    autoUpdater.once('update-available', () => {
      event.sender.send('update-result', 'Update Found');
    });
  
    autoUpdater.once('update-not-available', () => {
      event.sender.send('update-result', 'No Updates Found');
    });
  
    autoUpdater.once('checking-for-update', () => {
      event.sender.send('update-result', 'Checking Updates');
    });
});

ipcMain.on('add-account-window', async () => {
    if (addAccount) {
        addAccount.focus();
        return;
    };
  
    const mainWindowBounds = mainWindow.getBounds();
    const windowWidth = 450;
    const windowHeight = 650;
  
    const x = Math.round(mainWindowBounds.x + (mainWindowBounds.width / 2) - (windowWidth / 2));
    const y = Math.round(mainWindowBounds.y + (mainWindowBounds.height / 2) - (windowHeight / 2));
  
    addAccount = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        x: x,
        y: y,
        frame: false,
        alwaysOnTop: true,
        backgroundColor: '#0E0F16',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: false,
            sandbox: false,
            preload: join(__dirname, "../../build/preload.mjs")
        },
        icon: join(__dirname, '../renderer/Images/UI/Lunar Logo.png'),
        resizable: false
    });
    addAccount.loadURL(`file://${join(__dirname, '../../build/index.html')}#/add-account`);
    addAccount.on('closed', () => {
        addAccount = null;
    });
});

ipcMain.handle('save-account', async (event, website, email, password, notes) => {
    await saveAccount(website, email, password, notes);
    const accounts = await parseAccounts();
    mainWindow.webContents.send('accounts-fetched', accounts);
});

ipcMain.handle('fetch-accounts', async (event) => {
    const accounts = await parseAccounts();
    event.sender.send('accounts-fetched', accounts);
});

ipcMain.handle('delete-account', async (event, accountId) => {
    return await deleteAccount(accountId);
});


export const getMainWindow = () => mainWindow;

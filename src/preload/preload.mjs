import { contextBridge, ipcRenderer, shell } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    closeMainWindow: () => ipcRenderer.send('close-main-window'),
    closeAddAccountWindow: () => ipcRenderer.send('close-add-account-window'),
    minimize: () => ipcRenderer.send('minimize-main-window'),
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    },
    off: (channel, callback) => {
        ipcRenderer.removeAllListeners(channel, callback);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    onNavigateTo: (callback) => {
        ipcRenderer.on('navigateTo', (event, route) => {
          callback(route);
        });
    },
    sendAddAccountWindow: () => {
        ipcRenderer.send('add-account-window');
    },
    authenticateLicense: (licenseKey) => ipcRenderer.invoke('authenticate-license', licenseKey),
    openDiscord: () => shell.openExternal('https://discord.gg/ZWYDmnaNqE'),
    saveAccount: async (website, email, password, notes) => ipcRenderer.invoke('save-account', website, email, password, notes),
    fetchAccounts: async () => ipcRenderer.invoke('fetch-accounts'),
    deleteAccount: async (accountId) => ipcRenderer.invoke('delete-account', accountId)
});  
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

async function saveAccount(website, email, password, accountNotes) {
    try {
      const homeDir = os.homedir();
      const lunarManagerPath = path.join(homeDir, 'AppData', 'Local', 'Programs', 'Lunar Manager');
      const accountsFilePath = path.join(lunarManagerPath, 'accounts.json');
  
      try {
        await fs.access(lunarManagerPath);

      } catch (error) {
        await fs.mkdir(lunarManagerPath, { recursive: true });
      }
  
      try {
        await fs.access(accountsFilePath);

      } catch (error) {
        await fs.writeFile(accountsFilePath, JSON.stringify({ "accounts": [] }), 'utf8');
      };
  
      const data = await fs.readFile(accountsFilePath, 'utf8');
      const json = JSON.parse(data);
      const accountObject = {
        "id": uuidv4(),
        "store": website,
        "email": email,
        "password": password,
        "notes": accountNotes
      };
      json.accounts.push(accountObject);
      await fs.writeFile(accountsFilePath, JSON.stringify(json, null, 2), 'utf8');

    } catch (error) {
      console.error('Error processing account:', error);
    }
};

async function parseAccounts() {
    try {
        const homeDir = os.homedir();
        const lunarManagerPath = path.join(homeDir, 'AppData', 'Local', 'Programs', 'Lunar Manager');
        const accountsFilePath = path.join(lunarManagerPath, 'accounts.json');

        const data = await fs.readFile(accountsFilePath, 'utf8');
        const json = JSON.parse(data);
        const accounts = json.accounts;

        return accounts || [];

    } catch (error) {
        console.error('Error parsing accounts:', error);
        throw error;
    }
};

async function deleteAccount(accountId) {
  try {
    const homeDir = os.homedir();
    const lunarManagerPath = path.join(homeDir, 'AppData', 'Local', 'Programs', 'Lunar Manager');
    const accountsFilePath = path.join(lunarManagerPath, 'accounts.json');
    
    const data = await fs.readFile(accountsFilePath, 'utf8');
    const accountsData = JSON.parse(data);
    
    const filteredAccounts = accountsData.accounts.filter(account => account.id !== accountId);
    accountsData.accounts = filteredAccounts;
    
    await fs.writeFile(accountsFilePath, JSON.stringify(accountsData, null, 2), 'utf8');
    return true;

  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export {
    saveAccount,
    deleteAccount,
    parseAccounts,
};
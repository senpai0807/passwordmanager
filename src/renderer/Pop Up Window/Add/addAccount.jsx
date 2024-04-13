import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import './addAccount.css';



function AddAccount() {
    const [notes, setNotes] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('Select Website');
    const [password, setPassword] = useState('');

    const clearInputs = () => {
        setNotes('');
        setEmail('');
        setPassword('');
    };

    const handleClose = () => {
        window.electron.closeAddAccountWindow();
    };

    const addAccount = async () => {
        try {
            await window.electron.saveAccount(website, email, password, notes);
            handleClose();

        } catch (error) {
            console.error('Error saving task group:', error);
        }
    };

    const options = [
        { value: "amex", label: "American Express" },
        { value: "bofa", label: "Bank of America" },
        { value: "capone", label: "Captial One" },
        { value: "chase", label: "Chase Bank" },
        { value: "citi", label: "Citi Bank" },
        { value: "paypal", label: "Paypal" },
        { value: "robinhood", label: "Robinhood" },
        { value: "tdameritrade", label: "TD Ameritrade" },
        { value: "zelle", label: "Zelle" },
        { value: "icloud", label: "ICloud" },
        { value: "google", label: "Google" },
        { value: "gmx", label: "GMX" },
        { value: "outlook", label: "Outlook" },
        { value: "proton", label: "Proton" },
        { value: "yahoo", label: "Yahoo" },
        { value: "battlenet", label: "Battlenet" },
        { value: "epicgames", label: "Epic Games" },
        { value: "fivem", label: "FiveM" },
        { value: "origin", label: "Origin" },
        { value: "playstation", label: "Playstation" },
        { value: "rockstar", label: "Rockstar" },
        { value: "steam", label: "Steam" },
        { value: "xbox", label: "Xbox" },
        { value: "discord", label: "Discord" },
        { value: "instagram", label: "Instagram" },
        { value: "slack", label: "Slack" },
        { value: "snapchat", label: "Snapchat" },
        { value: "tiktok", label: "Tiktok" },
        { value: "twitter", label: "X/Twitter" },
        { value: "crunchyroll", label: "Crunchyroll" },
        { value: "disney", label: 'Disney Plus' },
        { value: "hbo", label: "HBO Max" },
        { value: "hidive", label: "Hidive" },
        { value: "hulu", label: "Hulu" },
        { value: "kick", label: "Kick" },
        { value: "netflix", label: "Netflix" },
        { value: "spotify", label: "Spotify" },
        { value: "twitch", label: "Twitch" },
        { value: "youtube", label: "Youtube" },
        { value: "adobe", label: "Adobe" },
        { value: "amazon", label: "Amazon" },
        { value: "canvas", label: "Canvas Student" },
        { value: "xfinity", label: "Xfinity" },
        { value: "bestbuy", label: "Best Buy" },
        { value: "dhgate", label: "DHGate" },
        { value: "ebay", label: "Ebay" },
        { value: "etsy", label: "Etsy" },
        { value: "target", label: "Target" },
        { value: "walmart", label: "Walmart" },
        { value: "adidas", label: "Adidas" },
        { value: "alias", label: "Alias" },
        { value: "champs", label: "Champs Sports" },
        { value: "copdate", label: "Copdate" },
        { value: "footlocker", label: "Footlocker" },
        { value: "goat", label: "Goat" },
        { value: "hibbett", label: "Hibbett" },
        { value: "jdsports", label: "JD Sports" },
        { value: "nike", label: "Nike/SNKRS" },
        { value: "shopify", label: "Shopify" },
        { value: "stockx", label: "StockX" }
    ];

    return (
        <div className="addAccount-container">
            <div className="addAccount-title-bar">
                <div className="addAccount-title-content">
                    <span className="addAccount-title-text">Add Account</span>
                </div>
                <div className="addAccount-window-controls">
                    <button className="addAccount-button close" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>

            <div className="addAccount-popup-container">
                <div className="addAccount-input-group">
                    <label className="addAccount-label" htmlFor="account-title">Email/Username</label>
                    <input 
                        type="text" 
                        id="account-email-input" 
                        placeholder="johndoe@gmail.com" 
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </input>
                </div>
                <div className="addAccount-input-group">
                    <label className="addAccount-label" htmlFor="account-title">Password</label>
                    <input 
                        type="text" 
                        id="account-password-input" 
                        placeholder="Password123@" 
                        className="input-box"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </input>
                </div>
                <div className="addAccount-input-group">
                    <label className="addAccount-label" htmlFor="account-title">Website</label>
                    <Select
                        className="website-select"
                        style={{
                            borderRadius: '5px',
                            marginTop: '10px',
                            marginLeft: '30px', 
                            width: '353px', 
                            height: '40px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: "'Montserrat', sans-serif",
                            color: '#ffffff',
                            padding: '15px 20px'
                        }}
                        options={options}
                        onChange={(values) => setWebsite(values[0] ? values[0].value : '')}
                        keepOpen={false}
                        clearOnBlur={true}
                        placeholder="Select Website"
                        multi={false}
                        loading={true}
                        clearable={true}
                        searchable={true}
                        separator={false}
                        closeOnSelect={true}
                        color="#5665da"
                        dropdownHandle={true}
                    />
                </div>
                <div className="addAccount-input-group">
                    <label className="addAccount-label" htmlFor="account-title">Notes</label>
                    <textarea 
                        id="accounts-notes-input" 
                        placeholder="This account is used daily." 
                        className="createProxyGroup-input-box"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="addAccount-button-container">
                    <button className="addAccount-clear-btn" onClick={clearInputs}>CLEAR</button>
                    <button className="addAccount-cancel-btn" onClick={handleClose}>Cancel</button>
                    <button className="addAccount-save-task-group" onClick={addAccount}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddAccount;
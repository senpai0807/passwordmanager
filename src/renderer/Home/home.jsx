import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Store } from 'react-notifications-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEye,
    faCopy,
    faStar,
    faHouse,
    faTrash,
    faEyeSlash,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

import './home.css';
import defaultLogo from '../Images/UI/Lunar Logo.png';

import tdLogo from '../Images/Banking/td.png';
import amexLogo from '../Images/Banking/amex.png';
import bofaLogo from '../Images/Banking/bofa.png';
import citiLogo from '../Images/Banking/citi.png';
import chaseLogo from '../Images/Banking/chase.png';
import zelleLogo from '../Images/Banking/zelle.png';
import paypalLogo from '../Images/Banking/paypal.png';
import capOneLogo from '../Images/Banking/capitalone.png';
import robinhoodLogo from '../Images/Banking/robinhood.png';

import gmxLogo from '../Images/Emails/gmx.png';
import yahooLogo from '../Images/Emails/yahoo.png';
import gmailLogo from '../Images/Emails/google.png';
import protonLogo from '../Images/Emails/proton.png';
import icloudLogo from '../Images/Emails/icloud.png';
import outlookLogo from '../Images/Emails/outlook.png';

import epicLogo from '../Images/Gaming/epic.png';
import battlenetLogo from '../Images/Gaming/battlenet.png';
import originLogo from '../Images/Gaming/origin.png';
import rockstarLogo from '../Images/Gaming/rockstar.png';
import fivemLogo from '../Images/Gaming/five.png';
import xboxLogo from '../Images/Gaming/xbox.png';
import steamLogo from '../Images/Gaming/steam.png';
import playstationLogo from '../Images/Gaming/playstation.png';

import slackLogo from '../Images/Social Media/slack.png';
import tiktokLogo from '../Images/Social Media/tiktok.png';
import twitterLogo from '../Images/Social Media/x.png';
import discordLogo from '../Images/Social Media/discord.png';
import snapchatLogo from '../Images/Social Media/snapchat.png';
import instagramLogo from '../Images/Social Media/instagram.png';

import crunchyrollLogo from '../Images/Streaming/crunchyroll.png';
import disneyLogo from '../Images/Streaming/disney.png';
import hbnLogo from '../Images/Streaming/hbo.png';
import hidiveLogo from '../Images/Streaming/hidive.png';
import huluLogo from '../Images/Streaming/hulu.png';
import netflixLogo from '../Images/Streaming/netflix.png';
import spotifyLogo from '../Images/Streaming/spotify.png';
import twitchLogo from '../Images/Streaming/twitch.png';
import youtubeLogo from '../Images/Streaming/youtube.png';
import kickLogo from '../Images/Streaming/kick.png';

import adobeLogo from '../Images/Utilities/adobe.png';
import amazonLogo from '../Images/Utilities/amazon.png';
import canvasLogo from '../Images/Utilities/canvas.png';
import xfinityLogo from '../Images/Utilities/xfinity.png';

import bestbuyLogo from '../Images/Stores/bestbuy.png';
import dhgateLogo from '../Images/Stores/dhgate.png';
import ebayLogo from '../Images/Stores/ebay.png';
import etsyLogo from '../Images/Stores/etsy.png';
import targetLogo from '../Images/Stores/target.png';
import walmartLogo from '../Images/Stores/walmart.png';

import adidasLogo from '../Images/Sneakers/adidas.png';
import aliasLogo from '../Images/Sneakers/alias.png';
import champsLogo from '../Images/Sneakers/champs.png';
import copdateLogo from '../Images/Sneakers/copdate.png';
import ftlLogo from '../Images/Sneakers/ftl.png';
import goatLogo from '../Images/Sneakers/goat.png';
import hibbettLogo from '../Images/Sneakers/hibbett.png';
import jdsportsLogo from '../Images/Sneakers/jd sports.png';
import nikeLogo from '../Images/Sneakers/nike.png';
import shopifyLogo from '../Images/Sneakers/shopify.png';
import stockxLogo from '../Images/Sneakers/stockx.png';

function Dashboard() {
    const [accounts, setAccounts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [sidebarActive, setSidebarActive] = useState(false);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [activeAccountId, setActiveAccountId] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const handleMinimize = () => {
        window.electron.minimize();
    };

    const handleClose = () => {
        window.electron.closeMainWindow();
    };

    const addAccount = () => {
        window.electron.sendAddAccountWindow();
    };

    const handleCheckUpdates = () => {
        window.electron.send('check-for-updates');
    };

    const handleAccountClick = (accountId) => {
        if (activeAccountId === accountId) {
            setActiveAccountId(null);
            setSidebarActive(false);

        } else {
            setActiveAccountId(accountId);
            setSidebarActive(true);
        }
    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const getLogoForStore = (store) => {
        let logo = defaultLogo;
        let name = store;
      
        switch(store.toLowerCase()) {
            case 'amex':
                logo = amexLogo;
                name = 'American Express';
                break;

            case 'bofa':
                logo = bofaLogo;
                name = 'Bank of America';
                break;

            case 'capone':
                logo = capOneLogo;
                name = 'Capital One';
                break;

            case 'chase':
                logo = chaseLogo;
                name = 'Chase Banking';
                break;

            case 'citi':
                logo = citiLogo;
                name = 'Citi Bank';
                break;

            case 'paypal':
                logo = paypalLogo;
                name = 'Paypal';
                break;

            case 'robinhood':
                logo = robinhoodLogo;
                name = 'Robinhood';
                break;

            case 'tdameritrade':
                logo = tdLogo;
                name = 'TD Ameritrade';
                break;

            case 'zelle':
                logo = zelleLogo;
                name = 'Zelle';
                break;

            case 'icloud':
                logo = icloudLogo;
                name = 'ICloud';
                break;

            case 'google':
                logo = gmailLogo;
                name = 'Google';
                break;

            case 'gmx':
                logo = gmxLogo;
                name = 'GMX';
                break;

            case 'outlook':
                logo = outlookLogo;
                name = 'Outlook';
                break;

            case 'proton':
                logo = protonLogo;
                name = 'Proton Mail';
                break;

            case 'yahoo':
                logo = yahooLogo;
                name = 'Yahoo Mail';
                break;

            case 'battlenet':
                logo = battlenetLogo;
                name = 'Battlenet';
                break;

            case 'epicgames':
                logo = epicLogo;
                name = 'Epic Games';
                break;

            case 'fivem':
                logo = fivemLogo;
                name = 'FiveM';
                break;

            case 'origin':
                logo = originLogo;
                name = 'Origin EA';
                break;

            case 'playstation':
                logo = playstationLogo;
                name = 'Playstation Network';
                break;

            case 'rockstar':
                logo = rockstarLogo;
                name = 'Rockstar Gaming';

            case 'steam':
                logo = steamLogo;
                name = 'Steam';
                break;

            case 'xbox':
                logo = xboxLogo;
                name = 'Xbox';
                break;

            case 'discord':
                logo = discordLogo;
                name = 'Discord';
                break;

            case 'instagram':
                logo = instagramLogo;
                name = 'Instagram';
                break;

            case 'slack':
                logo = slackLogo;
                name = 'Slack';
                break;

            case 'snapchat':
                logo = snapchatLogo;
                name = 'Snapchat';
                break;

            case 'tiktok':
                logo = tiktokLogo;
                name = 'Tiktok';
                break;

            case 'twitter':
                logo = twitterLogo;
                name = 'Twitter/X';
                break;

            case 'crunchyroll':
                logo = crunchyrollLogo;
                name = 'Crunchyroll';
                break;

            case 'disney':
                logo = disneyLogo;
                name = 'Disney Plus';
                break;

            case 'hbo':
                logo = hbnLogo;
                name = 'HBO Max';
                break;

            case 'hidive':
                logo = hidiveLogo;
                name = 'Hidive';
                break;

            case 'hulu':
                logo = huluLogo;
                name = 'Hulu';
                break;

            case 'kick':
                logo = kickLogo;
                name = 'Kick';
                break;

            case 'netflix':
                logo = netflixLogo;
                name = 'Netflix';
                break;

            case 'spotify':
                logo = spotifyLogo;
                name = 'Spotify';
                break;

            case 'twitch':
                logo = twitchLogo;
                name = 'Twitch';
                break;

            case 'youtube':
                logo = youtubeLogo;
                name = 'Youtube';
                break;

            case 'adobe':
                logo = adobeLogo;
                name = 'Adobe';
                break;

            case 'amazon':
                logo = amazonLogo;
                name = 'Amazon';
                break;

            case 'canvas':
                logo = canvasLogo;
                name = 'Canvas Student';
                break;

            case 'xfinity':
                logo = xfinityLogo;
                name = 'Xfinity';
                break;

            case 'bestbuy':
                logo = bestbuyLogo;
                name = 'Best Buy';
                break;

            case 'dhgate':
                logo = dhgateLogo;
                name = 'DHGate';
                break;

            case 'ebay':
                logo = ebayLogo;
                name = 'Ebay';
                break;

            case 'etsy':
                logo = etsyLogo;
                name = 'Etsy';
                break;

            case 'target':
                logo = targetLogo;
                name = 'Target';
                break;

            case 'walmart':
                logo = walmartLogo;
                name = 'Walmart';
                break;

            case 'adidas':
                logo = adidasLogo;
                name = 'Adidas/Confirmed';
                break;

            case 'alias':
                logo = aliasLogo;
                name = 'Alias';
                break;

            case 'champs':
                logo = champsLogo;
                name = 'Champs Sports';
                break;

            case 'copdate':
                logo = copdateLogo;
                name = 'Copdate';
                break;

            case 'footlocker':
                logo = ftlLogo;
                name = 'Footlocker';
                break;

            case 'goat':
                logo = goatLogo;
                name = 'Goat';
                break;

            case 'hibbett':
                logo = hibbettLogo;
                name = 'Hibbett';
                break;

            case 'jdsports':
                logo = jdsportsLogo;
                name = 'JD Sports';
                break;

            case 'nike':
                logo = nikeLogo;
                name = 'Nike/SNKRS';
                break;

            case 'shopify':
                logo = shopifyLogo;
                name = 'Shopify';
                break;

            case 'stockx':
                logo = stockxLogo;
                name = 'StockX';
                break;  
      
            default:
                break;
        }
      
        return { logo, name };
    };

    const handleDeleteAccount = async (accountId) => {
        try {
            await window.electron.deleteAccount(accountId);
            const updatedAccounts = accounts.filter(account => account.id !== accountId);
            setAccounts(updatedAccounts);

        } catch (error) {
            console.error('Failed to delete account:', error);
        }
    };

    const AccountCard = ({ id, logo, store, email, onClick, onDelete, isActive }) => {
        return (
            <div
                className={`account-card ${isActive ? 'active' : ''}`}
                onClick={() => onClick(id)}
            >
                <img src={logo} alt={store} className="account-logo" />
                <div className="account-info">
                    <div className="account-store">{store}</div>
                    <div className="account-email">{email}</div>
                </div>
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }} />
            </div>
        );
    };

    const AccountDetails = ({ account }) => {
        let site = null;
        const { logo, name } = getLogoForStore(account.store);

        switch(account.store.toLowerCase()) {
            case 'amex':
                site = 'www.americanexpress.com';
                break;

            case 'bofa':
                site = 'www.bankofamerica.com';
                break;

            case 'capone':
                site = 'www.capitalone.com';
                break;

            case 'chase':
                site = 'www.chase.com';
                break;

            case 'citi':
                site = 'www.citi.com';
                break;

            case 'paypal':
                site = 'www.paypal.com';
                break;

            case 'robinhood':
                site = 'www.robinhood.com/';
                break;

            case 'tdameritrade':
                site = 'www.tdameritrade.com';
                break;

            case 'zelle':
                site = 'www.zellepay.com';
                break;

            case 'icloud':
                site = 'www.icloud.com';
                break;

            case 'google':
                site = 'www.google.com';
                break;

            case 'gmx':
                site = 'www.gmx.com';
                break;

            case 'outlook':
                site = 'www.outlook.com';
                break;

            case 'proton':
                site = 'www.protonmail.com';
                break;

            case 'yahoo':
                site = 'www.yahoo.com';
                break;

            case 'battlenet':
                site = 'us.shop.battle.net';
                break;

            case 'epicgames':
                site = 'store.epicgames.com';
                break;

            case 'fivem':
                site = 'fivem.net';
                break;

            case 'origin':
                site = 'www.ea.com';
                break;

            case 'playstation':
                site = 'www.playstation.com';
                break;

            case 'rockstar':
                site = 'www.rockstargames.com';
                break;

            case 'steam':
                site = 'store.steampowered.com';
                break;

            case 'xbox':
                site = 'www.xbox.com';
                break;

            case 'discord':
                site = 'discord.com';
                break;

            case 'instagram':
                site = 'www.instagram.com';
                break;

            case 'slack':
                site = 'slack.com';
                break;

            case 'snapchat':
                site = 'www.snapchat.com';
                break;

            case 'tiktok':
                site = 'www.tiktok.com';
                break;

            case 'twitter':
                site = 'twitter.com';
                break;

            case 'crunchyroll':
                site = 'www.crunchyroll.com';
                break;

            case 'disney':
                site = 'www.disneyplus.com';
                break;

            case 'hbo':
                site = 'www.max.com';
                break;

            case 'hidive':
                site = 'www.hidive.com';
                break;

            case 'hulu':
                site = 'www.hulu.com';
                break;

            case 'kick':
                site = 'kick.com';
                break;

            case 'netflix':
                site = 'www.netflix.com';
                break;

            case 'spotify':
                site = 'https://www.spotify.com/';
                break;

            case 'twitch':
                site = 'www.twitch.tv';
                break;

            case 'youtube':
                site = 'www.youtube.com';
                break;

            case 'adobe':
                site = 'www.adobe.com';
                break;

            case 'amazon':
                site = 'www.amazon.com';
                break;

            case 'canvas':
                site = 'www.instructure.com/canvas';
                break;

            case 'xfinity':
                site = 'www.xfinity.com';
                break;

            case 'bestbuy':
                site = 'www.bestbuy.com';
                break;

            case 'dhgate':
                site = 'www.dhgate.com';
                break;

            case 'ebay':
                site = 'www.ebay.com';
                break;

            case 'etsy':
                site = 'www.etsy.com';
                break;

            case 'target':
                site = 'www.target.com';
                break;

            case 'walmart':
                site = 'www.walmart.com';
                break;

            case 'adidas':
                site = 'www.adidas.com';
                break;

            case 'alias':
                site = 'www.alias.org';
                break;

            case 'champs':
                site = 'www.champssports.com';
                break;

            case 'copdate':
                site = 'www.copdate.com';
                break;

            case 'footlocker':
                site = 'www.footlocker.com';
                break;

            case 'goat':
                site = 'www.goat.com';
                break;

            case 'hibbett':
                site = 'www.hibbett.com';
                break;

            case 'jdsports':
                site = 'www.jdsports.com';
                break;

            case 'nike':
                site = 'www.nike.com';
                break;

            case 'shopify':
                site = 'www.shopify.com';
                break;

            case 'stockx':
                site = 'stockx.com';
                break;
        };

        const copyToClipboard = async () => {
            try {
                await navigator.clipboard.writeText(account.password);
                const message = 'Password Copied To Clipboard';
                const title = 'Copied To Clipboard';
          
                Store.addNotification({
                  content: (props) => <CustomNotification {...props} title={title} message={message} />,
                  title: title,
                  message: message,
                  type: 'info',
                  insert: "top",
                  container: "bottom-right",
                  className: 'notification-dashboard',
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: false
                  }
                });
            } catch (err) {
                console.error('Failed to copy password: ', err);
            }
        };

        return (
            <div>
                <div className="account-detail-card">
                    <img src={logo} alt={name} className="account-detail-logo" />
                    <div className="account-detail-info">
                        <div className="account-detail-store">{name}</div>
                        <div className="account-detail-type">Login</div>
                    </div>
                    {/* <FontAwesomeIcon icon={faStar} className="account-detail-star" /> */}
                </div>

                <div className="email-card">
                    <div className="email-info">
                        <label className="account-email-label" htmlFor="account-email">Email/Username</label>
                        <div className="account-detail-email">{account.email}</div>
                    </div>

                    <div className="password-info">
                        <label className="account-password-label" htmlFor="account-email">Password</label>
                        <div className="account-detail-password">
                            <span className={isPasswordVisible ? "password-text" : "password-dots"}>
                                {isPasswordVisible ? account.password : '•'.repeat(account.password.length)}
                            </span>
                            <div className="password-icons">
                                <FontAwesomeIcon 
                                    icon={isPasswordVisible ? faEyeSlash : faEye} 
                                    onClick={togglePasswordVisibility}
                                    className="password-icon"
                                />
                                <FontAwesomeIcon 
                                    icon={faCopy} 
                                    onClick={copyToClipboard} 
                                    className="password-icon" 
                                />
                            </div>
                        </div>
                    </div>


                    <div className="website-info">
                        <label className="account-website-label" htmlFor="account-email">Website</label>
                        <div className="account-detail-website">{site}</div>
                    </div>
                </div>

                <div className="notes-card">
                    <div className="notes-info">
                        <label className="account-notes-label" htmlFor="account-email">Notes</label>
                        <div className="account-detail-notes">{account.notes}</div>
                    </div>
                </div>

            </div>
        );
    };


    useEffect(() => {
        const handleAccountsFetched = (event, fetchedAccounts) => {
            setAccounts(fetchedAccounts || []);
        };
    
        window.electron.on('accounts-fetched', handleAccountsFetched);
        window.electron.fetchAccounts().then(fetchedAccounts => {
                setAccounts(fetchedAccounts || []);
            }).catch(error => {
                console.error('Failed to fetch accounts:', error);
                setAccounts([]);
            });
    
        return () => {
            window.electron.off('accounts-fetched', handleAccountsFetched);
        };
    }, []);

    useEffect(() => {
        const filterAccounts = () => {
            if (!searchInput.trim()) {
                setFilteredAccounts(accounts);
                return;
            }

            const lowercasedFilter = searchInput.toLowerCase();
            const filteredData = accounts.filter(account => {
                return (
                    account.email.toLowerCase().includes(lowercasedFilter) ||
                    account.store.toLowerCase().includes(lowercasedFilter) ||
                    account.notes.toLowerCase().includes(lowercasedFilter)
                );
            });

            setFilteredAccounts(filteredData);
        };

        filterAccounts();
    }, [searchInput, accounts]);

    useEffect(() => {
        const handleUpdateResult = (result) => {
          let message = null;
          let title = null;
    
          if (result === 'Update Found') {
            message = result;
            title = 'Client Update Available';
    
          } else if (result === 'No Updates Found') {
            message = result;
            title = 'Client Up To Date';
    
          } else if (result === 'Checking Updates') {
            message = 'Checking For Available Client Updates';
            title = 'Checking For Updates';
          }
    
        Store.addNotification({
            content: (props) => <CustomNotification {...props} title={title} message={message} />,
            title: title,
            message: message,
            type: 'info',
            insert: "top",
            container: "top-right",
            className: 'notification-dashboard',
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: false
            }
          });
        };
    
        window.electron.receive('update-result', handleUpdateResult);
        return () => {
            window.electron.off('update-result', handleUpdateResult);
        };
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-drag-area"></div>
            <nav className="nav-menu">
                <div className="logo-title">Lunar Manager</div>
                    <Link to="/dashboard" className="nav-link"><FontAwesomeIcon icon={faHouse} className="nav-house" />Dashboard</Link>
            </nav>
            <div className="dashboard-main-content">
                <div className="dashboard-maincontent-drag-area"></div>
                    <div className="search-container">
                        <div className="search-input-container">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                            <input 
                                type="text" 
                                id="search-input" 
                                placeholder="Search By Email, Password, Site, Notes"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>
                        <button className="account-add-btn" onClick={addAccount}>+</button>
                    </div>

                <div className="accounts-container">
                    {filteredAccounts.map((account) => {
                        const { logo, name } = getLogoForStore(account.store);
                        return (
                            <AccountCard
                                key={account.id}
                                id={account.id}
                                logo={logo}
                                store={name}
                                email={account.email}
                                onClick={handleAccountClick}
                                onDelete={handleDeleteAccount}
                                isActive={account.id === activeAccountId}
                            />
                        );
                    })}
                </div>
            </div>

            <aside className={`dashboard-right-sidebar ${sidebarActive ? 'active' : ''}`}>
                <div className="dashboard-right-drag-area"></div>
                <div className="dashboard-top-bar">
                    <span className="dashboard-app-version" onClick={handleCheckUpdates}>Check For Updates</span>
                    <div className="dashboard-window-controls">
                        <button className="dashboard-button minimize" onClick={handleMinimize}><i className="fa-solid fa-window-minimize"></i></button>
                        <button className="dashboard-button close" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </div>

                <div className="account-details-container" style={{ display: activeAccountId ? 'block' : 'none' }}>
                    {activeAccountId && accounts.length > 0 && 
                        <AccountDetails account={accounts.find(acc => acc.id === activeAccountId)} />
                    }
                </div>
            </aside>
        </div>
    );
}

function CustomNotification({ title, message }) {    
    return (
        <div className="custom-notification" style={{ backgroundColor: '#5665da', borderLeft: `#3f51b5` }}>
            <h4 className="notification-title">{title}</h4>
            <div className="message-and-progress">
                <p className="notification-message">{message}</p>
                <div className="progress-bar"></div>
            </div>
        </div>
    );
}

export default Dashboard;
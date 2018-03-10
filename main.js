'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow

app.setName(config.productName)

var fs = require('fs');

fs.appendFile('myaddresses.txt', 'address-1', function (err) {
  if (err) throw err;
  console.log('Updated Address!');
});


let multichain = require("multichain-node")({
    port: 2900,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "9mMUBoAZGiQQwfGMguFrj2DfMfdgHdyydR4GyhTiHLxH",
});

multichain.getInfo((err, info) => {
    if(err){
        throw err;
    }
    console.log(info);
})


var mainWindow = null
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    title: config.productName,
backgroundColor: '#312450',
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  // Enable keyboard shortcuts for Developer Tools on various platforms.
  let platform = os.platform()
  if (platform === 'darwin') {
    globalShortcut.register('Command+Option+I', () => {
      mainWindow.webContents.openDevTools()
    })
  } else if (platform === 'linux' || platform === 'win32') {
    globalShortcut.register('Control+Shift+I', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', () => { app.quit() })

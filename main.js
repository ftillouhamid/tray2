const {app, BrowserWindow, Tray, Menu} = require('electron');
const path=require('path');
let  iconPath= path.join(__dirname,'assets/icons/win/unimatelLogo.ico');

let appIcon = null;
let top = null;
let child = null; 


app.on('ready', function() {
    top = new BrowserWindow({  icon: iconPath, kiosk: true, thickFrame :true, 
                                backgroundColor: '#2e2c29'                            });
    //top.loadURL('file://'+__dirname+'/index.html');
    top.loadFile('index.html');

    child=new BrowserWindow({parent: top,  width:500, height:400, icon: iconPath});
    //child.loadURL('file://'+__dirname+'/child.html');
    child.loadURL('http://192.168.1.8/estimation.html?x=0');
    child.setMenuBarVisibility(false);
    child.on('resize', function() { 
       // console.log(child.width+ ','+child.height);
       console.log(child.getBounds());
     //   document.getElementById('message').innerHTML =child.width+ ','+child.height;
        }
    );
    
    appIcon= new Tray(iconPath);
    
    var contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type:'radio', checked: true},
        { label: 'Child',
            click: function(){ child.show();}
        },
        { label: 'Item3'},
        { label: 'DevTools', accelerator:'Ctrl+Shift+I',
            click: function() {
                top.show();
            }
        },
        { label: 'Quit', accelerator:'Alt+F4', selector:'terminate:',
                                    //click: function(){ app.quit;}
        }
    ]);
    //top.setMenu(contextMenu);
    appIcon.setToolTip('Unimatel Try Test');
    appIcon.setContextMenu(contextMenu);
    
});
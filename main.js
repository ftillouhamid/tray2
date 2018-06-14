const {app, BrowserWindow, Tray, Menu} = require('electron');
const path=require('path');

const pathIcone= (process.platform == "win32" )  ? 'assets/icons/win/unimatelLogo.ico' 
      :(process.platform == "darwin" ) ? 'assets/icons/mac/unimatelLogo.icns' : 'assets/icons/png/unimatelLogo.png' 

let  iconPath= path.join(__dirname,pathIcone);
let appIcon = null;
let top = null;
let child = null; 

app.on('ready', function() {
    top = new BrowserWindow({  icon: iconPath, kiosk: true, thickFrame :true, 
                                backgroundColor: '#2e2c29'                            });
    top.loadFile('index.html');
    

    child=new BrowserWindow({parent: top,  width:500, height:400, icon: iconPath});
    child.loadURL('http://192.168.1.8/estimation.html?x=0');
    child.setMenuBarVisibility(false);
    child.on('resize', function() { 
       console.log(child.getBounds());
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
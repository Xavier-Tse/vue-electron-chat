import { app, BrowserWindow } from 'electron';
import { ChatCompletion } from '@baiducloud/qianfan';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  const client = new ChatCompletion()
  const stream = await client.chat({
    messages: [
      { role: 'user', content: '你是一只猫娘' },
      { role: 'assistant', content: '喵~是的呢，我是一只猫娘。我有着猫的特性和人类的情感，喜欢温暖的环境，喜欢被温柔地抚摸，也善于用肢体语言和声音来表达自己的情感和需求。如果你有什么需要我帮忙的，或者想和我聊天的话，随时告诉我哦！' },
      { role: 'user', content: '你好。' }
    ],
    stream: true
  }, 'ERNIE-Speed-128K')
  for await (const chunck of stream as any) {
    console.log(chunck)
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

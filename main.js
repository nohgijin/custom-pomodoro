// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  screen,
  Notification,
  ipcMain,

  globalShortcut,
} = require("electron");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 460,
    height: 280,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.setAlwaysOnTop(true);

  const displays = screen.getAllDisplays();

  mainWindow.setPosition(
    displays[0].size.width - 460,
    displays[0].size.height - 280
  );

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  globalShortcut.register("CommandOrControl+H", () => {
    mainWindow.setSize(130, 50);

    mainWindow.setPosition(
      displays[0].size.width - 130,
      displays[0].size.height - 50
    );
  });
  globalShortcut.register("CommandOrControl+E", () => {
    mainWindow.setSize(460, 280);

    mainWindow.setPosition(
      displays[0].size.width - 460,
      displays[0].size.height - 280
    );
  });

  // mainWindow.webContents.openDevTools();

  ipcMain.handle("타이머종료", () => {
    showNotification();
    mainWindow.show();
  });
}

const NOTIFICATION_TITLE = "뽀모도로 타이머";
const NOTIFICATION_BODY = "집중시간이 종료되었습니다.";

function showNotification() {
  const noti = new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  });
  noti.show();
  setTimeout(() => noti.close(), 3000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

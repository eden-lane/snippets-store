import { app, BrowserWindow, ipcMain } from "electron";
import { readdir } from "node:fs";
import path from "node:path";
import { Snippet } from "../src/types";
import { Db } from "../src/services/db";
import { SnippetsStore } from "../src/services/snippetsStore";


process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.handle("addSnippet", async (_, snippet: Snippet) => {
    try {
      await Db.addSnippet(snippet);
    } catch (error) {
      console.log(error);
    }
  });

  ipcMain.handle("deleteSnippet", async (_, id: string) => {
    try {
      await Db.deleteSnippet(id);
    } catch (error) {
      console.log(error);
    }
  });

  ipcMain.handle("getSnippets", async () => {
    try {
      return await Db.getSnippets();
    } catch (error) {
      console.log(error);
    }
  });

  ipcMain.handle("installSnippet", async (_, snippet: Snippet) => {
    SnippetsStore.installSnippet(snippet);
  });

  ipcMain.handle("uninstallSnippet", async (_, snippet: Snippet) => {
    SnippetsStore.uninstallSnippet(snippet);
  });

  ipcMain.handle("isSnippetInstalled", async (_, snippet: Snippet) => {
    return SnippetsStore.isSnippetInstalled(snippet);
  });

  createWindow();
});

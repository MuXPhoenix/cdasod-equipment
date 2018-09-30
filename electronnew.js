"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var ElectronMain = /** @class */ (function () {
    function ElectronMain() {
        this.appTitle = "设备列表";
        this.initApp();
        this.initAppEvents();
        this.initIpc();
    }
    ElectronMain.prototype.initApp = function () {
        this.enableHotReload(this.checkElectronArgs());
        this.disableSecurityWarnings();
    };
    ElectronMain.prototype.initAppEvents = function () {
        var _this = this;
        electron_1.app.on("ready", function () { return _this.createWindows(); });
        electron_1.app.on("window-all-closed", function () { return _this.quitAppOnNonDarwin(); });
        electron_1.app.on("activate", function () { return _this.createDefaultWindows(); });
    };
    ElectronMain.prototype.initIpc = function () {
        var _this = this;
        electron_1.ipcMain.on("event", function (e, data) { return _this.ipcEventHandler(e, data); });
    };
    ElectronMain.prototype.checkElectronArgs = function () {
        this.args = process.argv.slice(1);
        return this.args.some(function (val) { return val === "--serve"; });
    };
    ElectronMain.prototype.enableHotReload = function (serve) {
        if (serve) {
            require("electron-reload")(__dirname, {
                electron: require(__dirname + "/node_modules/electron")
            });
        }
    };
    ElectronMain.prototype.createWindows = function () {
        this.createMainWindow();
        this.createSecondWindow();
    };
    ElectronMain.prototype.createMainWindow = function () {
        // this.mainWindow = this.createBrowserWindow();
        this.mainWindow = new electron_1.BrowserWindow({
            title: this.appTitle,
            fullscreen: true,
            minimizable: false,
            maximizable: false,
            autoHideMenuBar: true,
            closable: false,
            x: 0,
            y: 0
        });
        // this.loadFromFile(this.mainWindow);
        this.mainWindow.loadURL(url.format({
            // pathname: path.join(__dirname, 'index.html'),
            pathname: path.join(__dirname, "/dist/index.html"),
            protocol: "file:",
            slashes: true,
            hash: "/"
        }));
        this.enableDevTools(this.mainWindow);
        this.onWindowClosed(this.mainWindow);
    };
    ElectronMain.prototype.createSecondWindow = function () {
        var secondDisplay = electron_1.screen.getAllDisplays()[1];
        // if (this.checkSecondDisplay(secondDisplay)) {
        // 	this.secondWindow = this.createBrowserWindow(secondDisplay.bounds.x, secondDisplay.bounds.y);
        // }
        this.secondWindow = new electron_1.BrowserWindow({
            title: this.appTitle,
            fullscreen: true,
            minimizable: false,
            maximizable: false,
            autoHideMenuBar: true,
            closable: false,
            x: secondDisplay.bounds.x,
            y: secondDisplay.bounds.y
        });
        // this.loadFromFile(this.secondWindow, "/modbus");
        this.secondWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            // pathname: path.join(__dirname, "/dist/electron-angular/index.html"),
            protocol: "file:",
            slashes: true,
            hash: "/modbus"
        }));
        this.enableDevTools(this.secondWindow);
        this.onWindowClosed(this.secondWindow);
    };
    ElectronMain.prototype.checkSecondDisplay = function (secondDisplay) {
        return secondDisplay && secondDisplay !== undefined && secondDisplay !== null;
    };
    ElectronMain.prototype.createBrowserWindow = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new electron_1.BrowserWindow({
            title: this.appTitle,
            fullscreen: true,
            minimizable: false,
            maximizable: false,
            autoHideMenuBar: true,
            closable: false,
            x: x,
            y: y
        });
    };
    ElectronMain.prototype.loadFromFile = function (window, routePath) {
        if (routePath === void 0) { routePath = "/"; }
        window.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            // pathname: path.join(__dirname, "/dist/electron-angular/index.html"),
            protocol: "file:",
            slashes: true,
            hash: routePath
        }));
    };
    ElectronMain.prototype.enableDevTools = function (window) {
        window.webContents.openDevTools();
    };
    ElectronMain.prototype.onWindowClosed = function (window) {
        window.on("closed", function () { return electron_1.app.quit(); });
    };
    ElectronMain.prototype.createDefaultWindows = function () {
        if (null === this.mainWindow) {
            this.createMainWindow();
        }
        if (this.secondWindow === null) {
            this.createSecondWindow();
        }
    };
    ElectronMain.prototype.quitAppOnNonDarwin = function () {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    };
    ElectronMain.prototype.ipcEventHandler = function (e, data) {
        console.log("[EVENT]:", "recieved from main process");
    };
    ElectronMain.prototype.disableSecurityWarnings = function () {
        process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
    };
    return ElectronMain;
}());
exports["default"] = new ElectronMain();

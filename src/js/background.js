import '../img/128.png'
import '../img/icon-34.png'
import { User } from './user.js'

var $ = require("jquery");
var openpgp = require('openpgp');

chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.get(['loggedIn'], function (result) {
        if (result.loggedIn == "Temp") {
            chrome.storage.local.remove(['loggedIn']);
            chrome.runtime.sendMessage({ type: "check"});
        }
    });
});

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ UserList: [] });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type == "Login") {
        let user = new User(request.name, null, null,
            request.privkey, request.publicKey, null);

        sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else if (request.type == "popup") {
        console.log("response");
        sendResponse({ currentUser: sessionStorage.getItem("currentUser") });
    } else if (request.type == "Logout"){
        sessionStorage.removeItem("currentUser");
    }
});
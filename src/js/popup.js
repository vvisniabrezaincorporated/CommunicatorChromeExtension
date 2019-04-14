import "../css/popup.css";
import { User } from './user.js'

var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {

    chrome.storage.local.get(['UserList'], function(result) {
        if(result.UserList === undefined){
            chrome.storage.local.set({UserList: []});
        }
        console.log(result.UserList);
    }) 
})
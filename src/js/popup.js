import 'bootstrap';
import '../scss/popup.scss';
import { User } from './user.js'

var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {

    chrome.storage.local.get(['UserList', 'currentOwner'], function(result) {
        //if(result.UserList === undefined){
        //    chrome.storage.local.set({UserList: []});
        //}
        if(result.currentOwner != undefined){
            $("#setText").text("You are currenty logged in as " + result.currentOwner);
            console.log("iffff" + result.currentOwner);
        }else{
            $("#setText").text("You are not loged in.");
            console.log("else" + result.currentOwner);
        }
        console.log(result.UserList);
    })
})
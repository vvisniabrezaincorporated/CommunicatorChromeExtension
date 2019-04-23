import 'bootstrap';
import '../scss/popup.scss';
import { User } from './user.js'

var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {
    chrome.storage.local.get(['UserList', 'currentOwner', 'loggedIn'], function(result) {
        if(result.loggedIn == "Const"){
            console.log("Const");
            $("#setText").text("You are currenty logged in as " + result.currentOwner);
        }else if(result.loggedIn == "Temp"){
            console.log("Temp");
            chrome.runtime.sendMessage({type: "popup"}, function(response) {
                var viewUser= $.parseJSON(response.currentUser);
                $("#setText").text("You are currenty logged in as " + viewUser.name);
              });
        }else{
            console.log("Brak");
            $("#setText").text("You are not loged in.");
        }
        console.log(result.UserList);
    })
})
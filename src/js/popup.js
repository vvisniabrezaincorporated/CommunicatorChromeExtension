import "../css/popup.css";

var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {
    $('#test1').text("Test2");

})

$(function () {
    chrome.storage.sync.set({login: 'Mateusz'}, function() {
        console.log('Value is set to Mateusz');
      });
});

$('#test2').click(function(){
    chrome.storage.sync.get(['login'], function(result) {
        $('#test1').text(result.login);
        console.log('Value currently is ' + result.login);
    })


})

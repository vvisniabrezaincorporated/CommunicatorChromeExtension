import 'bootstrap';
import '../scss/options.scss';
import { User } from './user.js'

var openpgp = require('openpgp');
var $ = require("jquery");

$("#createKey").click(function () {
    if (validationCreate()) {

        $('#progressBar').removeClass('invisible');
        $('#progressBar').addClass('visible');
        $('#inputOwner').removeClass('is-valid');
        $('#inputEmail').removeClass('is-valid');
        $('#inputPassword').removeClass('is-valid');

        createKey();
        console.log('OK');
    } else {
        console.log('NIE OK');
    }
});

$("#loginKey").click(function () {

    chrome.storage.local.get(['UserList'], function (result) {
        var userList = result.UserList
        var validation = false

        userList.forEach(function (user) {
            if (user.name == $('#loginOwner').val() && user.password == $('#loginPassword').val()) {
                chrome.storage.local.set({currentOwner: user.name, currentKey: user.privkey});
                validation = true;
            }
        });
        if(!validation){
            $('#loginKey').addClass('is-invalid');
        }
    })
});

function createKey() {

    chrome.storage.local.get(['UserList'], function (result) {
        if (result.UserList === undefined) {
            chrome.storage.local.set({ UserList: [] });
        }
        console.log(result.UserList);
    })

    let user = new User($('#inputOwner').val(), $('#inputEmail').val(), $('#inputPassword').val(),
        null, null, null);

    var options = {
        userIds: [{ name: user.name, email: user.emailaddress }],
        numBits: 4096,
        passphrase: user.password
    };

    openpgp.generateKey(options).then(function (key) {
        var privkey = key.privateKeyArmored;
        var pubkey = key.publicKeyArmored;
        var revocationCertificate = key.revocationCertificate;

        chrome.storage.local.get(['UserList'], function (result) {
            user.privkey = privkey;
            user.publicKey = pubkey;
            user.revocationCertificate = revocationCertificate;

            var LocalUserList = result.UserList;
            LocalUserList.push(user);
            chrome.storage.local.set({ UserList: LocalUserList });
            $('#progressBar').removeClass('visible');
            $('#progressBar').addClass('invisible');
        })
    });
}

function validationCreate() {
    var email = true;
    var owner = true;
    var password = true;

    if ($('#inputOwner').val() == "") {
        $('#inputOwner').removeClass('is-valid');
        $('#inputOwner').addClass('is-invalid');
        owner = false;
    } else {
        $('#inputOwner').removeClass('is-invalid');
        $('#inputOwner').addClass('is-valid');
    }

    if (!validateEmail($('#inputEmail').val())) {
        $('#inputEmail').removeClass('is-valid');
        $('#inputEmail').addClass('is-invalid');
        email = false;
    } else {
        $('#inputEmail').removeClass('is-invalid');
        $('#inputEmail').addClass('is-valid');
    }

    if (!hasNumber($('#inputPassword').val()) || !hasLowerAndUpper($('#inputPassword').val())) {
        $('#inputPassword').removeClass('is-valid');
        $('#inputPassword').addClass('is-invalid');
        password = false
    } else {
        $('#inputPassword').removeClass('is-invalid');
        $('#inputPassword').addClass('is-valid');
    }

    if (email && password && owner) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function hasNumber(str) {
    return /\d/.test(str);
}

function hasLowerAndUpper(str) {
    return str.match(/[a-z]/) && str.match(/[A-Z]/);
}
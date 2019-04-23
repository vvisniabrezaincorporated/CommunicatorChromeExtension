var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {

    chrome.storage.local.get(['loggedIn', 'currentPrivKey', 'currentPubKey'], async function (result) {

        if (result.loggedIn == "Const") {
            const privateKey = (await openpgp.key.readArmored(result.currentPrivKey)).keys[0]
            await privateKey.decrypt("Aq1")

            const options = {
                message: await openpgp.message.readArmored($('#wiadomosc').text()),
                publicKeys: (await openpgp.key.readArmored(result.currentPubKey)).keys,
                privateKeys: [privateKey]
            }

            openpgp.decrypt(options).then(plaintext => {
                console.log(plaintext.data)
                $('#wiadomosc').text(plaintext.data);
            })
        } else if (result.loggedIn == "Temp") {
            chrome.runtime.sendMessage({ type: "send" }, async function (response) {
                var viewUser = $.parseJSON(response.currentUser);

                const privateKey = (await openpgp.key.readArmored(viewUser.privkey)).keys[0]
                await privateKey.decrypt("Aq1")

                const options = {
                    message: await openpgp.message.readArmored($('#wiadomosc').text()),
                    publicKeys: (await openpgp.key.readArmored(viewUser.publicKey)).keys,
                    privateKeys: [privateKey]
                }

                openpgp.decrypt(options).then(plaintext => {
                    console.log(plaintext.data)
                    $('#wiadomosc').text(plaintext.data);
                })
            });
        }
    })
})
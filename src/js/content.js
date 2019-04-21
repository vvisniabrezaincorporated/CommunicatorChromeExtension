var $ = require("jquery");
var openpgp = require('openpgp');

$(function () {

    chrome.storage.local.get(['currentPrivKey', 'currentPubKey'], function (result) {
        
        const runBlock = async() => {
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
        }
        runBlock();
    })
})
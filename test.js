const nfc = require('./index').nfc,
    util = require('util'),
    version = nfc.version(),
    devices = nfc.scan();

console.log('version: ' + util.inspect(version, {depth: null}));
console.log('devices: ' + util.inspect(devices, {depth: null}));

function read(deviceID) {
    const nfcDev = new nfc.NFC();

    nfcDev.on('read', function (tag) {
        // console.log(util.inspect(tag, {depth: null}));
        if ((!!tag.data) && (!!tag.offset)) {
            console.log(util.inspect(nfc.parse(tag.data.slice(tag.offset)), {depth: null}));
        }
        // nfcDev.stop();
    });

    nfcDev.on('error', function (err) {
        console.log(util.inspect(err, {depth: null}));
    });

    nfcDev.on('stopped', function () {
        console.log('stopped');
    });

    console.log(nfcDev.start(deviceID));
}

for (const deviceID in devices) {
    read(deviceID);
}

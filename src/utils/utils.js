const { default: mongoose } = require("mongoose");

const constants = require("../constants");
const WrapToNative = require("../models/wrap-native");
const SelendraToWrap = require("../models/selendra-wrap");
const NativeToWrap = require("../models/native-wrap");
const WrapToSelendra = require("../models/wrap-selendra");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const waitForTx = async (provider, hash) => {
    console.log(`Waiting for tx: ${hash}...`)
    while (!await provider.getTransactionReceipt(hash)) {
        sleep(15000)
    }
}

const saveWN = async (from, to, amount, hash) => {
    await mongoose.connect(constants.DBURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((_res) => console.log("Connect to db ..."))
        .catch((err) => console.log(err));

    const wndata = new WrapToNative({
        from: from,
        to: to,
        amount: amount,
        hash: hash,
    })

    await wndata.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    await mongoose.connection.close()
}

const saveNW = async (from, to, amount, hash) => {
    await mongoose.connect(constants.DBURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((_res) => console.log("Connect to db ..."))
        .catch((err) => console.log(err));

    const nwdata = new NativeToWrap({
        from: from,
        to: to,
        amount: amount,
        hash: hash,
    })

    await nwdata.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    await mongoose.connection.close()
}

const saveSW = async (from, amount, hash) => {
    await mongoose.connect(constants.DBURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((_res) => console.log("Connect to db ..."))
        .catch((err) => console.log(err));

    const swdata = new SelendraToWrap({
        from: from,
        amount: amount,
        hash: hash,
    })

    await swdata.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    await mongoose.connection.close()
}

const saveWS = async (from, amount, hash) => {
    await mongoose.connect(constants.DBURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((_res) => console.log("Connect to db ..."))
        .catch((err) => console.log(err));

    const wsdata = new WrapToSelendra({
        from: from,
        amount: amount,
        hash: hash,
    })

    await wsdata.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    await mongoose.connection.close()
}

module.exports = {
    waitForTx,
    saveWN,
    saveNW,
    saveSW,
    saveWS
};

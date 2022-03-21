const nativeTransfer = require("./bridge/nativeTransfer");
const { wrapTransfer, wrapApprove } = require("./bridge/wraptransfer");
const { approveForHandler, selendraToWrap, withdrawFromWrap, approveForWrap } = require("./bridge/selendraV2ToWrap");
const { withdrawToSelendraV2, selendraV2ToNative } = require("./index");

async function nativeToWrap() {
    const mnemonic = "arrange permit extend come kitchen breeze magic crisp unusual stove cram move";
    const recipient = "0x34cF5F9c6AaD6207051C1e19a29cb081C24f8352";
    const amount = 50;
    
    await nativeTransfer(mnemonic, recipient, amount);
}

async function wrapToNative() {
    const privatekey = "000000000000000000000000000000000000000000000000000000616c696365";
    const substrateAdress = "5Eo5UWonGx75gTnEFRi6A3So5qfHGP4dL1ZFcHAc6fonYKKd";
    const amount = 30;

    await wrapApprove(privatekey, amount);
    await wrapTransfer(privatekey, substrateAdress, amount);
}

async function v2ToWrap() {
    const privatekey = "000000000000000000000000000000000000000000000000000000616c696365";
    const amount = 200;

    await approveForHandler(privatekey, amount);
    await selendraToWrap(privatekey, amount);
}

async function wrapTov2() {
    const privatekey = "000000000000000000000000000000000000000000000000000000616c696365";
    const amount = 150;

    await approveForWrap(privatekey, amount);
    await withdrawFromWrap(privatekey, amount);
}


const privatekey = "27bc80b5c8ee2e39daff79c8b69cedd5a2ca3ec2fef6a426149b7b8a84f31af6";
const substrateAdress = "5Eo5UWonGx75gTnEFRi6A3So5qfHGP4dL1ZFcHAc6fonYKKd";
const amount = 30;

// selendraV2ToNative(privatekey, substrateAdress, amount)

withdrawToSelendraV2(privatekey, amount)
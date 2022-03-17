const nativeTransfer = require("./nativeTransfer");
const {wrapTransfer, approve} = require("./wraptransfer");

async function selendraToWrap() {
    const mnemonic = "arrange permit extend come kitchen breeze magic crisp unusual stove cram move";
    const recipient = "0x34cF5F9c6AaD6207051C1e19a29cb081C24f8352";
    const amount = 50;
    
    await nativeTransfer(mnemonic, recipient, amount);
}

async function approveAmount() {
    const privatekey = "27bc80b5c8ee2e39daff79c8b69cedd5a2ca3ec2fef6a426149b7b8a84f31af6";
    const amount = 15;

    await approve(privatekey, amount)
}

async function wrapToSelendra() {
    const privatekey = "27bc80b5c8ee2e39daff79c8b69cedd5a2ca3ec2fef6a426149b7b8a84f31af6";
    const substrateAdress = "5Eo5UWonGx75gTnEFRi6A3So5qfHGP4dL1ZFcHAc6fonYKKd";
    const amount = 15;

    await wrapTransfer(privatekey, substrateAdress, amount);
}

approveAmount()
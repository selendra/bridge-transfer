const ethers = require('ethers');
const { decodeAddress } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');
const ContractABIs = {
    Bridge: require("../contract/Bridge.json")
}

function getHex(substrateAdress){
    const publicKey = decodeAddress(substrateAdress);
    const hexPublicKey = u8aToHex(publicKey);
    return hexPublicKey
}

async function wrapTransfer(privatekey, substrateAdress, amount){
    console.log("starting Wrap transfer...");
    const provider = new ethers.providers.JsonRpcProvider (
        "https://ropsten.infura.io/v3/87a29c128cdb49329e9b95e524e0ba7b", {chainId: 3}
    );
    const wallet = new ethers.Wallet(privatekey, provider);
    const recipient = getHex(substrateAdress);
    const transferAmount = BigInt(amount * Math.pow(10, 18));

    const bridgeInstance = new ethers.Contract(
        "0xe8f9290AC56f4045F070F0306f0dAfba57e2280a", ContractABIs.Bridge.abi, wallet,
    );
    const data = '0x' +
            ethers.utils.hexZeroPad(ethers.BigNumber.from(transferAmount).toHexString(), 32).substr(2) +    // Deposit Amount        (32 bytes)
            ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +    // len(recipientAddress) (32 bytes)
            recipient.substr(2);
    await bridgeInstance.deposit(1, "0x0000000000000000000000372a410b50DA68144b8666Fa351FD38DFb0E1C3703", data);
    console.log("balance have been transfer....");
    process.exit(1);
}

module.exports = wrapTransfer;

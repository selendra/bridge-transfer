const ethers = require('ethers');
const { decodeAddress } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');
const constants = require("../constants");
const {waitForTx, saveWN} = require("../utils/utils");

function getHex(substrateAdress){
    const publicKey = decodeAddress(substrateAdress);
    const hexPublicKey = u8aToHex(publicKey);
    return hexPublicKey
}

async function wrapApprove(privatekey, amount){
    console.log("Start Approve before transfer ...")
    const provider = new ethers.providers.JsonRpcProvider (
        constants.BRIDGEPROVIDER, {chainId: constants.BRIDGECHAINID}
    );
    const wallet = new ethers.Wallet(privatekey, provider);
    const approveAmount = BigInt(amount * Math.pow(10, 18));
    
    const erc20Instance = new ethers.Contract(
        constants.ERC20CONTRACT, 
        constants.ContractABIs.Erc20.abi, 
        wallet
    );

    const tx = await erc20Instance.approve(
        constants.ERC20HANDLERCONTRACT, 
        approveAmount
    );
    await waitForTx(provider, tx.hash);
}

async function wrapTransfer(privatekey, substrateAdress, amount){
    console.log("Start Wrap transfer...");
    const provider = new ethers.providers.JsonRpcProvider (
       constants.BRIDGEPROVIDER, {chainId: constants.BRIDGECHAINID}
    );
    const wallet = new ethers.Wallet(privatekey, provider);
    const recipient = getHex(substrateAdress);
    const transferAmount = BigInt(amount * Math.pow(10, 18));

    const bridgeInstance = new ethers.Contract(
        constants.BRIDGECONTRACT, constants.ContractABIs.Bridge.abi, wallet,
    );
    const data = '0x' +
            ethers.utils.hexZeroPad(ethers.BigNumber.from(transferAmount).toHexString(), 32).substr(2) +    // Deposit Amount        (32 bytes)
            ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +    // len(recipientAddress) (32 bytes)
            recipient.substr(2);

    const tx = await bridgeInstance.deposit(
        constants.SELENDRABRIDGECHAINID, 
        constants.BRIDGERESOURCEID, 
        data,
    );

    await saveWN(wallet.address, substrateAdress, amount, tx.hash)

    await waitForTx(provider, tx.hash);
}

module.exports.wrapTransfer = wrapTransfer;
module.exports.wrapApprove = wrapApprove;
const constants = require("../constants");
const waitForTx = require("../utils");
const ethers = require('ethers');

async function approveForHandler(privatekey, amount){
    console.log("Start Approve before transfer ...")
    const provider = new ethers.providers.JsonRpcProvider (
        constants.BRIDGEPROVIDER, {chainId: constants.BRIDGECHAINID}
    );
    const wallet = new ethers.Wallet(privatekey, provider);
    const approveAmount = BigInt(amount * Math.pow(10, 18));
    
    const erc20Instance = new ethers.Contract(
        constants.SELENDRAADDRESS, 
        constants.ContractABIs.SelendraV2.abi, 
        wallet
    );

    const tx = await erc20Instance.approve(
        constants.SELENDRAHANDLERS, 
        approveAmount
    );
    await waitForTx(provider, tx.hash);
}

async function approveForWrap(privatekey, amount){
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
        constants.SELENDRAHANDLERS, 
        approveAmount
    );
    await waitForTx(provider, tx.hash);
}

async function selendraToWrap(privatekey, amount){
    console.log("Start transfer to WrapSelendra...")
    const provider = new ethers.providers.JsonRpcProvider (
        constants.BRIDGEPROVIDER, {chainId: constants.BRIDGECHAINID}
    );
    const wallet = new ethers.Wallet(privatekey, provider);
    const swapAmount = BigInt(amount * Math.pow(10, 18));

    const selendraHandle = new ethers.Contract(
        constants.SELENDRAHANDLERS, 
        constants.ContractABIs.SelendraHandler.abi, 
        wallet
    );

    const tx = await selendraHandle.swapBridge(swapAmount);
    await waitForTx(provider, tx.hash);
}

async function withdrawFromWrap(privatekey, amount){
    console.log("Strat withdraw back to selendraV2...")
    const provider = new ethers.providers.JsonRpcProvider (
        constants.BRIDGEPROVIDER, {chainId: constants.BRIDGECHAINID}
    );
    const wallet = new ethers.Wallet(privatekey, provider);
    const withdrawAmount = BigInt(amount * Math.pow(10, 18));

    const selendraHandle = new ethers.Contract(
        constants.SELENDRAHANDLERS, 
        constants.ContractABIs.SelendraHandler.abi, 
        wallet
    );

    const tx = await selendraHandle.withdraw(withdrawAmount);
    await waitForTx(provider, tx.hash);
}

module.exports.approveForHandler = approveForHandler;
module.exports.selendraToWrap = selendraToWrap;
module.exports.approveForWrap = approveForWrap;
module.exports.withdrawFromWrap = withdrawFromWrap;
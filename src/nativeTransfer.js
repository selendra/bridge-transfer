// Import the API & Provider and some utility functions
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { Keyring } = require( '@polkadot/keyring');

async function nativeTransfer(mnemonic, recipient, amount, chainId=3) {
    console.log("starting native transfer...")
    const provider = new WsProvider('wss://rpc1-testnet.selendra.org/');
    const api = await ApiPromise.create({ provider });

    await cryptoWaitReady();
    const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });
    const account = keyring.createFromUri(mnemonic);

    const transferAmount = BigInt(amount * Math.pow(10, api.registry.chainDecimals));

    const nonce = await api.rpc.system.accountNextIndex(account.address);
    await api.tx.bridgeTransfer
        .transferNative(transferAmount, recipient, chainId)
        .signAndSend(account, { nonce});
    
    console.log("balance have been transfer....");
    process.exit(1);
}

module.exports = nativeTransfer;

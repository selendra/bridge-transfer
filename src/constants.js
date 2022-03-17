// Contract

module.exports.ContractABIs = {
    Bridge: require("../contract/Bridge.json"),
    Erc20: require("../contract/erc20.json"),
}


// selendra
module.exports.WSPROVIDER='wss://indranet.selendra.org';
module.exports.SS58FORMAT=42;
module.exports.SELENDRABRIDGECHAINID=1;

// bridge
module.exports.BRIDGEPROVIDER="https://rinkeby.infura.io/v3/330b5a1f4348415cb7701a576b525bcf";
module.exports.BRIDGECHAINID=4;
module.exports.BRIDGECONTRACT="0x02c1b212A38040E6EF064a178835d70530730Def";
module.exports.ERC20CONTRACT="0xDd030D6a093B75972aF6B458Af84eA09384Db5D7";
module.exports.ERC20HANDLERCONTRACT="0x3EE5cc9887dF692c1Aa605d42cc184d7249b666b"
module.exports.BRIDGERESOURCEID="0x0000000000000000000000Dd030D6a093B75972aF6B458Af84eA09384Db5D704";
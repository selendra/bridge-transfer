const nativeTransfer = require("./bridge/nativeTransfer");
const {wrapApprove, wrapTransfer} = require("./bridge/wraptransfer");
const { approveForHandler, selendraToWrap, withdrawFromWrap, approveForWrap } = require("./bridge/selendraV2ToWrap");

async function withdrawToSelendraV2(privatekey, amount) {
    await approveForWrap(privatekey, amount);

    await withdrawFromWrap(privatekey, amount);
}

async function selendraV2ToNative(privatekey, recipient, amount) {
    await approveForHandler(privatekey, amount);
    await selendraToWrap(privatekey, amount);

    await wrapApprove(privatekey, amount);
    await wrapTransfer(privatekey, recipient, amount);
}

module.exports = {
    nativeTransfer,
    withdrawToSelendraV2,
    selendraV2ToNative
}

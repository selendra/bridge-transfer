const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nativeToWrapSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
}, {timestamps: true} );

const NativeToWrap = mongoose.model("nativeToWrap", nativeToWrapSchema);

module.exports = NativeToWrap;
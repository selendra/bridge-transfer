const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wrapToNativeSchema = new Schema({
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

const WrapToNative = mongoose.model("WrapToNative", wrapToNativeSchema);

module.exports = WrapToNative;
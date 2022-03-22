const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selendraToWrapSchema = new Schema({
    from: {
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

const SelendraToWrap = mongoose.model("SelendraToWrap", selendraToWrapSchema);

module.exports = SelendraToWrap;
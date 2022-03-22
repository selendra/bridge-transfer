const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wrapToSelendraSchema = new Schema({
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

const WrapToSelendra = mongoose.model("WrapToSelendra", wrapToSelendraSchema);

module.exports = WrapToSelendra;
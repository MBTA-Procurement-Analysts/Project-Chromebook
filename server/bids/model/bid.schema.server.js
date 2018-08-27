var mongoose = require('mongoose');

var bidSchema = mongoose.Schema({
        bidType: String,
        bidNumber: {type: String, unique: true, require: true},
        bidDesc: String,
        bidDeadline: Date,
        preBidDate: Date,
        preBidLocation: String,
        dbeOwner: String,
        dbePercent: Number,
        entered: { type: Date, default: Date.now }
    },
    {
        collection: "bid"
    }
    )
;

module.exports = bidSchema;
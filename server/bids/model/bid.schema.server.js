var mongoose = require('mongoose');

var bidSchema = mongoose.Schema({
        "Buyer": String,
        "Proj_Name": String,
        "Req_ID": String,
        "Fund_Code": String,
        "Bid_Type": String,
        "Timeframe": Date,
        "Comments": String,
        "Requested_Dttm": Date,
        "Bid_ID": String
    },
    {
        collection: "bid"
    }
    )
;

module.exports = bidSchema;

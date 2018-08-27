var mongoose = require('mongoose');
var bidSchema = require('./bid.schema.server');
var bidModel = mongoose.model('BidModel', bidSchema);

bidModel.createBid = createBid;
bidModel.getBids = getBids;
bidModel.getSpecificBid = getSpecificBid;
bidModel.updateBid = updateBid;
bidModel.removeBid = removeBid;
module.exports = bidModel;

function createBid(bid) {
    bid.bidDeadline = Date.parse(bid.bidDeadline);
    return bidModel.create(bid);
}

function getBids() {
    return bidModel.find();
}

function getSpecificBid(bidId) {
    return bidModel.find({"_id": bidId});
}

function updateBid(bid, bidId) {
    return bidModel.update({_id: bidId}, {$set: bid});
}
function removeBid(bidId) {
    return bidModel.remove({_id: bidId});
}

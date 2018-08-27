var app = require('../../../express');
var bidModel = require('../model/bid.model.server');

app.post('/api/add-bid', createBid);
app.get('/api/bids', getBids);
app.get('/api/bid/:bidId', getSpecificBid);
app.put('/api/update-bid/:bidId', updateBid);
app.delete('/api/remove-bid/:bidId', removeBid);

function createBid(req, res) {
    var bid = req.body;
    console.log(bid);
    bidModel
        .createBid(bid)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}

function updateBid(req, res) {
    var bid = req.body;
    console.log(bid);
    bidModel
        .updateBid(bid, req.params.bidId)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}

function getBids(req, res) {
    bidModel
        .getBids()
        .then(function (bids) {
            res.send(bids);
        }, function (err) {
            res.send(err);
        });
}

function getSpecificBid(req, res) {
    bidModel
        .getSpecificBid(req.params.bidId)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}

function removeBid(req, res) {
    bidModel
        .removeBid(req.params.bidId)
        .then(function (bid) {
            res.send(bid);
        }, function (err) {
            res.send(err);
        });
}

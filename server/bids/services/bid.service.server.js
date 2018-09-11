var app = require('../../../express');
var bidModel = require('../model/bid.model.server');
var counterModel = require('../model/counter.model.server');
app.post('/api/add-bid', createBid);
app.get('/api/bids', getBids);
app.get('/api/bid/:bidId', getSpecificBid);
app.put('/api/update-bid/:bidId', updateBid);
app.delete('/api/remove-bid/:bidId', removeBid);

function createBid(req, res) {
    var bid = req.body;
    var b_id = bid.Bid_Type;
    var fund = bid.Fund_Code.slice(-1);
    var bidNum = "";
    var d = new Date;
    counterModel.getCount()
        .then(function (response) {
            bidNum = response.Count;
            counterModel.incrCount();
            b_id = b_id + " " + bidNum;
            if (fund != "N") {
                b_id = b_id + fund;
            }
            bid.Bid_ID = b_id +"-" + (d.getYear() - 100);

            bidModel
                .createBid(bid)
                .then(function (bid) {
                    res.send(bid);
                }, function (err) {
                    res.send(err);
                });
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

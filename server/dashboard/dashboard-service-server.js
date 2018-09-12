var app = require('../../express');
var dashModel = require("./dashboard-model");

app.get('/api/dashboard/:userID', findUserDash);

function findUserDash(req, res) {
    console.log("ITEM NUMBER: " + req.params.number);
    dashModel
        .findUserDash(req.params.userID)
        .then(function (val) {
            res.json(val);
        })
}
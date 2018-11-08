var app = require('../../express');
var dashModel = require("./dashboard-model");
app.put('/api/req/addFlag/:reqID', addFlag);
app.get('/api/dashboard/:userID', findUserDash);

function findUserDash(req, res) {
    dashModel
        .findUserDash(req.params.userID)
        .then(function (val) {
            res.json(val);
        })
}


function addFlag(req, res) {
    console.log("Here");
    dashModel
        .addFlag(req.params.reqID)
        .then(function (val) {
            res.json(val);
        })
}

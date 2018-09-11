var app = require('../../express');
var reqModel = require("./req-model");

app.get('/api/req/:number', findReq);
function findReq(req,res){
    console.log("REQ NUMBER: " + req.params.number);
    console.log('wow we made it');
    reqModel
        .findReq(req.params.number)
        .then(function(val){
            console.log(val);
            res.json(val);
        })
}
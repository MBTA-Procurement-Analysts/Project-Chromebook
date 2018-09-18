var app = require('../../express');
var reqModel = require("./req-model");

app.get('/api/req/:number', findReq);
app.post('/api/add-note/:reqId', addNote);

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
function addNote(req, res){
    console.log(req.body);
    reqModel
        .addNote(req.params.number, req.body)
        .then(function(val){
            res.json(val);
        })
}
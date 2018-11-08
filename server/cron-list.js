var cron = require("node-cron");
var express = require('express');
var app = express();
cron.schedule("0 */3 * * *", function(){
    console.log(new Date);
    var trello = require('./trello/trello.service.server.js');
    trello.getLists();
    trello.formatBySE();
    trello.summaryGenerator();
});

app.listen(3128);
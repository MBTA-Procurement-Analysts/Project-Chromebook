var mongoose = require("mongoose");
var reqSchema = require("./req-schema");
var reqModel = mongoose.model('REQModel',reqSchema);
reqModel.findReq = findReq;
reqModel.addNote = addNote;
reqModel.getBuyerReqsForDate = getBuyerReqsForDate;
reqModel.getReqsForDate = getReqsForDate;
module.exports = reqModel;

function findReq(reqNumber){
    console.log("NO: " + reqNumber);
    return reqModel.find({"REQ_No": reqNumber});
}

function addNote(reqNumber, note){
    console.log(reqNumber);
    console.log(note.User);
    console.log(note.Date);
    console.log(note.Note_Info);
    return reqModel.updateOne({"REQ_No": reqNumber}, {
        '$push': {
            "User_Notes": {
                "User": note.User,
                "Date": note.Date,
                "Note_Info": note.Note_Info
            }
        }})
}

function getBuyerReqsForDate(buyer, date){
    console.log(buyer + " " + new Date(date).toISOString());
    return reqModel.find({"Buyer": buyer, "Approved_On":  new Date(date)});
}

function getReqsForDate(date){
    return reqModel.find({"Approved_On":  new Date(date)});
}
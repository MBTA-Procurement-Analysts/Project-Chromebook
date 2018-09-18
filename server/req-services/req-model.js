var mongoose = require("mongoose");
var reqSchema = require("./req-schema");
var reqModel = mongoose.model('REQModel',reqSchema);
reqModel.findReq = findReq;
reqModel.addNote = addNote;
module.exports = reqModel;

function findReq(reqNumber){
    console.log("NO: " + reqNumber);
    return reqModel.find({"REQ_No": reqNumber});
}

function addNote(reqNumber, note){
    console.log(note.User);
    console.log(note.Date);
    console.log(note.Note_Info);
    return reqModel.update({"REQ_No": reqNumber}, {
        '$addToSet': {
            "User_Notes": {
                "User": note.User,
                "Date": note.Date,
                "Note_Info": note.Note_Info
            }
        }})
}
var mongoose = require("mongoose");
var dashSchema = require("./dashboard-schema");
var dashboardModel = mongoose.model('DASHModel',dashSchema);
dashboardModel.findUserDash = findUserDash;
dashboardModel.addFlag = addFlag;

module.exports = dashboardModel;

function findUserDash(userID){
    return dashboardModel.find({"Buyer": userID});
}

function addFlag(reqID){
    return dashboardModel.update({"REQ_No": reqID},{"$set" : {"flag" : True}},{upsert:True});
}
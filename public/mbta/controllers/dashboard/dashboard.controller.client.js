(function () {
    angular
        .module('Chrubix')
        .controller('dashboardController', dashboardController);

    function dashboardController(dashService, getterService, currentUser) {
        var model = this;
        model.user = currentUser;
        model.limitTo = 10;
        model.reqInformation = [];
        model.inactionable = [];
        model.normalReqs = [];
        model.getDashboardInformation = function () {
            dashService
                .getDashboard(currentUser.username)
                .then(function (dash) {
                    //console.log(dash);
                    model.dash = dash;
                    for(req in dash){
                        if(dash[req].Hold_From_Further_Processing === 'Y' || dash[req].Transmitted === 'Y'){
                            model.inactionable.push(dash[req]);
                            getAdditionalInfo(dash[req].Req_ID, 'inactionable', model.inactionable.length);
                        }else{
                            model.normalReqs.push(dash[req]);
                            getAdditionalInfo(dash[req].Req_ID, 'normal', model.normalReqs.length);

                        }
                       // console.log(dash[req])
                    }
                });
        };
        model.showMore = function(){
            model.limitTo = model.limitTo + 10;
        };
        function getAdditionalInfo(reqId, arrayID, arrayIndex){
            getterService
                .findREQ(reqId)
                .then(function(reqOut){
                    reqOut[0].Amount = getSumOfLines(reqOut[0].lines);
                    if(arrayID == 'inactionable'){
                        model.inactionable[arrayIndex-1].reqInfo = reqOut[0]
                    }
                    if(arrayID == 'normal'){
                        console.log(model.normalReqs);
                        model.normalReqs[arrayIndex-1].reqInfo = reqOut[0]
                    }
                });
        }
        model.getDashboardInformation();
        model.formatDate = function (mongoDate) {
            if(mongoDate == null){
                return "";
            }
            var date = new Date(mongoDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            return month + "/" + day + "/" + year;

        };
        model.addFlag = function(reqId){
            dashService
                .addFlag(reqId)
                .then(function(){
                    model.getDashboardInformation();
                })
        }
        function getSumOfLines(lines){
            sum = 0;
            for(line in lines){
                sum += lines[line].Line_Total;
            }
            return sum;
        }
        model.formatMoney = function(text){
            if(text ==null){
                return "";
            }
            return "$" + text.toLocaleString();
        }
    }
})();
(function () {
    angular
        .module('VPP')
        .controller('MBTAbidNumSubmissionController', MBTAbidNumSubmissionController);

    function MBTAbidNumSubmissionController($location, bidRequestService, currentUser) {

        var model = this;
        model.user = currentUser;

        model.submitRequest = function () {
            if(model.timeFrame=="Other"){
                model.timeFrame = model.realTimeFrame;
            }
            var d = new Date;
            var bid = {
                "BuyerID": model.user.username,
                "Proj_Name":model.projName,
                "Req_ID":model.reqID,
                "Fund_Code":model.fundCode,
                "Fund_Src":model.fundSrc,
                "Timeframe":model.timeFrame,
                "Comments":model.comments,
                "Requested_Dttm": d.getTime()
            };
            bidRequestService.requestBid(bid)
                .then(function (bid) {
                    $location.url('/success');
                });
            ;
        }

    }
})();
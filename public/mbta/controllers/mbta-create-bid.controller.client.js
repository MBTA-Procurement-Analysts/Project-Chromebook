(function () {
    angular
        .module('Chrubix')
        .controller('MBTAcreateController', MBTAcreateController);

    function MBTAcreateController($location, bidService, currentUser) {

        var model = this;
        model.user = currentUser;
        model.submitBid = function () {
            var d = new Date;
            var bid = {
                "Buyer": model.user.username,
                "Proj_Name":model.projName,
                "Req_ID":model.reqID,
                "Fund_Code":model.fundCode,
                "Bid_Type":model.bidType,
                "Timeframe":model.timeFrame,
                "Comments":model.comments,
                "Requested_Dttm": d.getTime()
            };
            bidService.addBid(bid)
                .then(function (bid) {
                    $location.url('/success');
                });
            ;
        }

    }
})();
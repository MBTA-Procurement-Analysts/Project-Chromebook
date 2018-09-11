(function () {
    angular
        .module('Chrubix')
        .controller('MBTAbidEditController', MBTAbidEditController);

    function MBTAbidEditController($location, bidService, $routeParams) {

        var model = this;
        model.submitBid = function () {
            var bid = {
                bidType: model.bidType,
                bidNumber: model.bidNumber,
                bidDesc: model.bidDesc,
                bidDeadline: model.bidDeadline,
                preBidDate: model.preBidDate,
                preBidLocation: model.preBidLocation,
                dbeOwner: model.dbeOwner,
                dbePercent: model.dbePercent,
                materialType: model.materialType
            };
            bidService.updateBid(bid, $routeParams.bidNumber)
                .then(function (bid) {
                    $location.url('/view-bid/' + $routeParams.bidNumber);
                });

        };

        model.removeBid = function () {
            bidService.removeBid($routeParams.bidNumber)
                .then(function (bid) {
                    $location.url('/list-bids');
                });
        };

        function init() {
            bidService.getSpecificBid($routeParams.bidNumber)
                .then(function (res) {
                    model.bid = res[0];
                    model.bidType = model.bid.bidType;
                    model.bidNumber = model.bid.bidNumber;
                    model.bidDesc = model.bid.bidDesc;
                    model.bidDeadline = new Date(model.bid.bidDeadline);
                    model.preBidDate = new Date(model.bid.preBidDate);
                    model.preBidLocation = model.bid.preBidLocation;
                    model.dbeOwner = model.bid.dbeOwner;
                    model.dbePercent = model.bid.dbePercent;
                    model.materialType = model.bid.materialType;
                })
        }

        init();
    }
})();
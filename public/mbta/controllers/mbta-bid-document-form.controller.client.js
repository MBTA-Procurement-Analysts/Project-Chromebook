(function () {
    angular
        .module('Chrubix')
        .controller('MBTAbidDocFormController', MBTAbidDocFormController);

    function MBTAbidDocFormController($location, bidService, currentUser, $routeParams) {

        var model = this;
            bidService
                .getSpecificBid($routeParams.bidNumber)
                .then(function (bid) {
                    model.bid = bid[0];
                    console.log(model.bid);
                    model.user = currentUser;
                    model.bid.Timeframe = new Date(model.bid.Timeframe);
                    model.bid.minimumAcceptanceDays = 120;
                    model.bid.performanceBond = false;
                });
        model.saveFields = function () {
            var d = new Date;
            var docInformation = model.bid;
            bidService.saveFields(docInformation)
                .then(function (bid) {
                    $location.url('/success');
                });

        };

    }
})();
(function () {
    angular
        .module('Chrubix')
        .controller('MBTAlistController', MBTAlistController);

    function MBTAlistController(bidService) {
        var model = this;
        model.getBids = function () {
            bidService
                .getBids()
                .then(function (bids) {
                    console.log(bids);
                    model.bids = bids;
                });
        };
        model.getBids();

        model.formatDate = function (mongoDate) {
            var date = new Date(mongoDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            return month + "/" + day + "/" + year;
        };

    }
})();
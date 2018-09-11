(function () {
    angular
        .module('Chrubix')
        .controller('vendorListController', vendorListController);

    function vendorListController(vendorService) {
        var model = this;
        model.getVendors = function () {
            vendorService
                .getVendors()
                .then(function (vendors) {
                    model.vendors = vendors;
                });
        };
        model.getVendors();

    }
})();
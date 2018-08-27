(function () {
    angular
        .module('VPP')
        .controller('createVendorController', createVendorController);

    function createVendorController($location, vendorService, currentUser) {
        $(document).ready(function () {
            $('#vendorTypeBox').select2();
            $('#vendorEntityBox').select2();
            $('#vendorsalesBox').select2({minimumResultsForSearch: Infinity});
            $('#vendorYearsBox').select2({minimumResultsForSearch: Infinity});
        });
        var model = this;
        model.vendor = {};
        model.vendor.type = "";
        model.vendor.users = [];
        model.vendor.users[0] = currentUser._id;
        model.submitVendor = function () {
            vendorService.addVendor(model.vendor)
                .then(function (vendor) {
                    $location.url('/');
                });
        };

    }

})();
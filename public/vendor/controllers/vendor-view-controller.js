(function () {
    angular
        .module('VPP')
        .controller('MBTAvendorViewController', MBTAvendorViewController);

    function MBTAvendorViewController(vendorService, $routeParams, currentUser) {
        var model = this;
        model.user = currentUser;
        model.getSpecificVendor = function () {
            vendorService
                .getSpecificVendor($routeParams.vendorNumber)
                .then(function (vendor) {
                    model.vendor = vendor[0];
                    console.log(model.vendor);
                });
        };
        model.getSpecificVendor();
        model.arrayToString = function (array) {
            var finalString = "";
            for (elt in array) {
                if(finalString != ""){
                    finalString = finalString + ", "
                }
                finalString = finalString + array[elt];
            }
            return finalString
        }

    }
})();
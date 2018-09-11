(function () {
    angular
        .module('Chrubix')
        .factory('vendorService', vendorService);

    function vendorService($http) {
        var api = {
            addVendor: addVendor,
            getVendors: getVendors,
            getSpecificVendor: getSpecificVendor,
            updateVendor: updateVendor,
            removeVendor: removeVendor
        };
        return api;

        function addVendor(vendorInformation) {
            console.log(vendorInformation);
            var url = "/api/add-vendor";
            return $http.post(url, vendorInformation)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeVendor(vendorId) {
            var url = "/api/remove-vendor/"+vendorId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateVendor(vendorInformation, vendorId) {
            console.log(vendorInformation);
            var url = "/api/update-vendor/"+vendorId;
            return $http.put(url, vendorInformation)
                .then(function (response) {
                    return response.data;
                });
        }

        function getVendors() {
            var url = '/api/vendors';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getSpecificVendor(vendorId) {
            var url = '/api/vendor/'+vendorId;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
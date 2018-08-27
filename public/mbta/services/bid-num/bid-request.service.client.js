(function () {
    angular
        .module('VPP')
        .factory('bidRequestService', bidRequestService);

    function bidRequestService($http) {
        var api = {
            requestBid: requestBid
        };
        return api;

        function requestBid(bidObj) {
            var url = "/api/bid-num/request";
            return $http.post(url, bidObj)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
(function () {
    angular
        .module('Chrubix')
        .factory('bidRequestService', bidRequestService);

    function bidRequestService($http) {
        var api = {
            requestBid: requestBid,
            getNextNumber: getNextNumber
        };
        return api;

        function requestBid(bidObj) {
            var url = "/api/bid-num/request";
            return $http.post(url, bidObj)
                .then(function (response) {
                    return response.data;
                });
        }
        function getNextNumber(){
            var url = "/api/bid-num/next";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();
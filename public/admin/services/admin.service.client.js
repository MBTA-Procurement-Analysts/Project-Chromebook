(function () {
    angular
        .module('VPP')
        .factory('adminService', adminService);

    function adminService($http) {
        var api = {
            addBid: addBid,
            getBids: getBids,
            getUsers: getUsers,
            createUser: createUser,
            getSpecificBid: getSpecificBid,
            uploadFile: uploadFile,
            updateBid: updateBid,
            removeBid: removeBid
        };
        return api;

        function addBid(bidInformation) {
            console.log(bidInformation);
            var url = "/api/add-bid";
            return $http.post(url, bidInformation)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeBid(bidId) {
            var url = "/api/remove-bid/"+bidId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateBid(bidInformation, bidId) {
            console.log(bidInformation);
            var url = "/api/update-bid/"+bidId;
            return $http.put(url, bidInformation)
                .then(function (response) {
                    return response.data;
                });
        }

        function getBids() {
            var url = '/api/bids';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getUsers() {
            var url = '/api/users';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getSpecificBid(bidId) {
            var url = '/api/bid/'+bidId;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadFile(fileObj){
            var url = "/api/bid/file";
            return $http.post(url, fileObj)
                .then(function (response) {
                    return response.data;
                });

        }
    }
})();
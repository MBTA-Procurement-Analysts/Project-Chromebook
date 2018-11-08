(function () {
    angular
        .module('Chrubix')
        .factory('dashService', dashService);

        function dashService($http) {
        var api = {
            getDashboard: getDashboard,
            addFlag: addFlag
        };
        return api;

        function getDashboard(user) {
            var url = '/api/dashboard/' + user.toUpperCase();
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addFlag(reqId){
            var url = '/api/req/addFlag/' + reqId;
            console.log(url);
            return $http.put(url)
                .then(function(response,error){
                    console.log(error)
                    return response.data;
                })
        }

    }
})();
(function () {
    angular
        .module('Chrubix')
        .factory('dashService', dashService);

    function dashService($http) {
        var api = {
            getDashboard: getDashboard,
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

    }
})();
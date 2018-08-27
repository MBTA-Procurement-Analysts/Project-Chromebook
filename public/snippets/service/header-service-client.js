(function () {
    angular
        .module('VPP')
        .factory('headerService', headerService);

    function headerService($q, userService) {
        var api = {
            checkUser: checkUser
        };
        return api;

        function checkUser() {
            var deferred = $q.defer();
            userService.checkLoggedIn()
                .then(function (currentUser) {
                    if (currentUser === '0') {
                        deferred.resolve({});
                    } else {
                        console.log(currentUser);
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

    }
})();
(function () {
    angular
        .module('Chrubix')
        .controller('adminUserViewController', adminUserViewController);

    function adminUserViewController($location, userAdminService) {

        var model = this;

        function init() {
            userAdminService
                .getUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        init();
    }
})();
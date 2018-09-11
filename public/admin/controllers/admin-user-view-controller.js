(function () {
    angular
        .module('Chrubix')
        .controller('adminUserViewController', adminUserViewController);

    function adminUserViewController($location, adminService) {

        var model = this;

        function init() {
            adminService
                .getUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

        init();
    }
})();
(function () {
    angular
        .module('Chrubix')
        .controller('headerController', headerController);

    function headerController(headerService) {
        var model = this;
        headerService
            .checkUser()
            .then(function (user) {
            model.user = user;
        });
        console.log(model.user);
    }
})();
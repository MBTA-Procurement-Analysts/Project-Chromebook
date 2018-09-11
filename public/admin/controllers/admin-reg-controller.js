(function () {
    angular
        .module('Chrubix')
        .controller('adminRegistrationController', adminController);

    function adminController($location, adminService) {

        var model = this;
        model.role ="";
        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if(!password) {
                model.error = "Password is required";
                return;
            }
            if(!password2) {
                model.error = "Passwords are required";
                return;
            }
            if(!username) {
                model.error = "A username is required";
                return;
            }
            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = null; //userService.findUserByUsername(username);

            if(found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: username,
                    password: password,
                    role: model.role
                };
                // model.message = user;
                adminService
                    .createUser(user)
                    .then(function(user){
                        $location.url('/');
                    });
            }
        }
    }
})();
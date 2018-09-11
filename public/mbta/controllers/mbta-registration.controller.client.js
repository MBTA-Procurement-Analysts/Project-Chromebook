(function () {
    angular
        .module('Chrubix')
        .controller('MBTAregisterController', MBTAregisterController);

    function MBTAregisterController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(fname, lname, email, phone, reasoning, password, password2) {
            if (!password) {
                model.error = "Password is required";
                return;
            }
            if (!password2) {
                model.error = "Password is required";
                return;
            }
            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            var found = null; //userService.findUserByUsername(username);

            if (found !== null) {
                model.error = "Username is not available";
            } else {
                var user = {
                    username: fname.substring(0, 1) + "" + lname,
                    password: password,
                    email: email,
                    phone: phone,
                    reasoning: reasoning,
                    status: "pending"
                };
                userService
                    .register(user)
                    .then(function (user) {
                        $location.url('/profile');
                    });
            }
        }
    }
})();
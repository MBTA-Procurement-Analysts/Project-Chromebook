(function () {
    angular
        .module('VPP')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            login: login,
            logout: logout,
            register: register,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            addFavorite: addFavorite,
            registerAdmin: registerAdmin,
            followUser: followUser
        };
        return api;
        function register(user) {
            var url = "/api/register";
            console.log('registering user');
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function registerAdmin(user) {
            var url = "/api/registerAdmin";
            console.log('registering user');
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function followUser(userId, user) {
            var url = "/api/follow/" + userId;
            console.log(url);
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            console.log('is the user logged in?');
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addFavorite(user, newsId) {
            var url = "/api/" + newsId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }


        function checkAdmin() {
            var url = "/api/checkAdmin";
            return $http.get(url)
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

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            console.log(url);
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            console.log('deleting user ' + userId);
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = '/api/user/username/' + username;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = '/api/users';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user/username/" + username + "/password/" + password;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    console.log('response:' + response.data);
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            console.log(username + " " + password + " logging in");
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();
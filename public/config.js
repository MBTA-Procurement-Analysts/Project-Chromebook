(function () {
    angular
        .module('Chrubix')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'home.html'
            })

            .when('/', {
                templateUrl: './mbta/templates/mbta-login.html',
                controller: 'MBTAloginController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkNotLoggedIn
                }
            })
            .when('/submitbidnumber', {
                templateUrl: './mbta/templates/bid-num/mbta-bidnum-submission.html',
                controller: 'MBTAbidNumSubmissionController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/document-bid/:bidNumber', {
                templateUrl: './mbta/templates/mbta-bid-document-form.html',
                controller: 'MBTAbidDocFormController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/success', {
                templateUrl: './mbta/templates/bid-num/mbta-bidnum-success.html',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/vendor', {
                templateUrl: './vendor/templates/vendor-login.html'
            })
            .when('/login', {
                templateUrl: './mbta/templates/mbta-login.html',
                controller: 'MBTAloginController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkNotLoggedIn
                }
            })
            .when('/about', {
                templateUrl: 'about.html'
            })
            .when('/add-vendor', {
                templateUrl: './vendor/templates/vendor-register.html',
                controller: 'createVendorController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/list-vendors', {
                templateUrl: './vendor/templates/vendor-list.html',
                controller: 'vendorListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/view-vendor/:vendorNumber', {
                templateUrl: './vendor/templates/vendor-view.html',
                controller: 'MBTAvendorViewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/edit-vendor/:vendorNumber', {
                templateUrl: './vendor/templates/vendor-view.html',
                controller: 'MBTAvendorViewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/register-mbta', {
                templateUrl: './mbta/templates/mbta-register.html',
                controller: 'MBTAregisterController',
                controllerAs: 'model'
            })
            .when('/add-bid', {
                templateUrl: './mbta/templates/mbta-create-bid.html',
                controller: 'MBTAcreateController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/list-bids', {
                templateUrl: './mbta/templates/mbta-bid-listing.html',
                controller: 'MBTAlistController',
                controllerAs: 'model'
            })
            .when('/view-bid/:bidNumber', {
                templateUrl: './mbta/templates/mbta-bid.html',
                controller: 'MBTAbidViewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/trello_plotly', {
                templateUrl: './management/plotly.html'
            })
            .when('/trello', {
                templateUrl: './management/trelloDashboard.html'
            })
            .when('/edit-bid/:bidNumber', {
                templateUrl: './mbta/templates/mbta-bid-edit.html',
                controller: 'MBTAbidEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/upload-bid/:bidNumber', {
                templateUrl: './mbta/templates/mbta-bid-file-upload.html',
                controller: 'MBTAbidFileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/add-user', {
                templateUrl: './admin/templates/user-registration.html',
                controller: 'adminRegistrationController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/view-users', {
                templateUrl: './admin/templates/user-list.html',
                controller: 'adminUserViewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/map', {
                templateUrl: './toy-map.html'
            })
            .when('/buyeritems/:reqid', {
                templateUrl: './rubix/templates/buyer-items-info.html',
                controller: 'buyerItemsController',
                controllerAs: 'model'
            })

            .when('/hello', {
                templateUrl: './rubix/templates/hello.html',
                controller: 'helloController',
                controllerAs: 'model'
            })

            .when('/buyeritems', {
                templateUrl: './rubix/templates/buyer-items-info.html',
                controller: 'buyerItemsController',
                controllerAs: 'model'
            })
            .when('/printitems', {
                templateUrl: './rubix/templates/buyer-items-bulk-print.html',
                controller: 'buyerItemsBulkPrintController',
                controllerAs: 'model'
            })
            .when('/printitems/:buyerid/:date', {
                templateUrl: './rubix/templates/buyer-items-bulk-print.html',
                controller: 'buyerItemsBulkPrintController',
                controllerAs: 'model'
            })
            .when('/reqinfo', {
                templateUrl: './rubix/templates/req-info.html',
                controller: 'reqInfoController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/reqinfo/:reqid', {
                templateUrl: './rubix/templates/req-info.html',
                controller: 'reqInfoController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/dashboard', {
                templateUrl: './mbta/templates/dashboard/my-dashboard.html',
                controller: 'dashboardController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login')
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkNotLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser !== '0') {
                    deferred.reject();
                    $location.url('/')
                } else {
                    deferred.resolve({});
                }
            });
        return deferred.promise;
    }

    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkAdmin()
            .then(function (currentUser) {
                if (currentUser.role !== 'Admin') {
                    deferred.reject();
                    $location.url('/login')

                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();

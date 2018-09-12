(function () {
    angular
        .module('Chrubix')
        .controller('dashboardController', dashboardController);

    function dashboardController(dashService, getterService, currentUser) {
        var model = this;
        model.user = currentUser;
        model.limit = 10;
        model.getDashboardInformation = function () {
            dashService
                .getDashboard(currentUser.username)
                .then(function (dash) {
                    console.log(dash);
                    model.dash = dash;
                    for(req in dash){
                        console.log(dash[req]);
                        getterService
                            .findREQ(dash[req].Req_ID)
                            .then(function(reqOut){
                                model.dash[req].reqInfo = reqOut;
                                console.log(model.dash[req]);
                            })
                    }
                });
        };
        model.getDashboardInformation();

        model.formatDate = function (mongoDate) {
            var date = new Date(mongoDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            return month + "/" + day + "/" + year;
        };
       // function tagForBuckets(aOf)

    }
})();
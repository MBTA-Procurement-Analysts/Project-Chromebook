(function () {
    angular
        .module('Chrubix')
        .service('adminService', adminService);

    function adminService($http) {

        var api = {
            //updatePO: updatePO,
            //updateREQ: updateREQ,
            //getCollections: getCollections,
            findItem: findItem,
            addNote: addNote
        };
        return api;

        function findItem(itemNumber) {
            var url = "/api/item/" + itemNumber;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }
        function addNote(note){
            var url = "/api/add-note/:reqId";
            console.log(note);
            return $http.post(url, note)
                .then(function(response){
                    return response.data;
                }, function(err){
                    return err;
                })
        }
    }
})();

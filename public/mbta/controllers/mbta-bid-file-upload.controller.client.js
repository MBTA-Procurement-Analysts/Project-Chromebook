(function () {
    angular
        .module('VPP')
        .controller('MBTAbidFileController', MBTAbidFileController);

    function MBTAbidFileController(bidService, $routeParams) {
        var model = this;
        model.uploadFiles = function () {
            var input = document.getElementById('filesToUpload');
            for (var x = 0; x < input.files.length; x++) {
                var fileObj = {
                    bidId: $routeParams.bidNumber,
                    fileName: input.files[x].name,
                    file: input.files[x]
                };
                console.log(fileObj);
                bidService
                    .uploadFile(fileObj)
                    .then(function (bid) {
                        document.getElementById('upload-info').innerHTML = document.getElementById('upload-info').innerHTML + "<br> uploaded successfully"
                    });

            }
        };

    }
})();
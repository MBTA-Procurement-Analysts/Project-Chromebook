(function () {
    angular
        .module('VPP')
        .controller('MBTAcreateController', MBTAcreateController);

    function MBTAcreateController($location, bidService) {

        var model = this;
        model.bidDesc = "The MBTA seeks to purchase";
        model.preBidLocation = "10 Park Plaza Room 2810, Boston, MA, 02116";
        /*  var uploaders = [];
          var uploaderDescs = [];

          model.addUploader = function () {
              var modelName = "model.uploader" + uploaders.length;
              var modelName2 = "model.uploadDesc" + uploaderDescs.length;
              var br = document.createElement("br");
              var label = document.createElement("label");
              var input = document.createElement("input");
              input.setAttribute("type", "text");
              uploaders.push("uploader" + uploaders.length);
              uploaderDescs.push("uploadDesc" + uploaders.length);
              input.setAttribute("ng-model", modelName);
              label.innerHTML = "Display Name:";
              var input2 = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("ng-model", modelName2);

              document.getElementById("addUpload").appendChild(br);
              document.getElementById("addUpload").appendChild(label);
              document.getElementById("addUpload").appendChild(input2);
              document.getElementById("addUpload").appendChild(input);

          };*/
        model.submitBid = function () {
            var bid = {
                bidType: model.bidType,
                bidNumber: model.bidNumber,
                bidDesc: model.bidDesc,
                bidDeadline: model.bidDeadline,
                preBidDate: model.preBidDate,
                preBidLocation: model.preBidLocation,
                dbeOwner: model.dbeOwner,
                dbePercent: model.dbePercent,
                materialType: model.materialType
            };
            bidService.addBid(bid)
                .then(function (bid) {
                    $location.url('/upload-bid/'+bid._id);
                });
            ;
        }

    }
})();
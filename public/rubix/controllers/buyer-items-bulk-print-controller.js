(function () {
  angular
    .module('Chrubix')
    .controller('buyerItemsBulkPrintController', buyerItemsBulkPrintController)

  function buyerItemsBulkPrintController(getterService, $routeParams, $q, $scope) {//currentUser){
    var model = this;
    model.inputParams = $routeParams
    try { 
      this.ifIE = String(navigator.userAgent).includes("Trident")
    } catch (err) {
      this.ifIE = true
    }

    console.log(this.ifIE)
    // Whether to hide the REQ Details view, true initially and when REQ is null
    this.hideTables = true;
    // Whether the REQ is valid, used to control the alert
    this.foundData = true;
    // Status abbreviation. Can be fixed in DB if wanted

    // incoming Buyer ID
    this.inputBuyerId = "";
    // incoming Date
    this.inputDate = "";

    this.REQSJSON = {}

    // List of Object Entries 
    this.ENTRIESJSON = [] 

    model.log = function() {
      console.log(this.inputBuyerId);
      console.log(this.inputDate);
    }

    this.statusDict =
      {
        "A": "Approved",
        "C": "Completed",
        "P": "Pending",
        "X": "Cancelled"
      }
    this.itemStatusDict = 
      {
        1: "Active",
        2: "Hold",
        3: "Discontinue",
        4: "Inactive",
        5: "Pending Approval",
        6: "Denied Approval",
        7: "Under Initialization"
      }

    model.redir = function() {
      window.location = "#!/printitems/" + model.inputBuyerId + "/" + model.inputDate;
    }

    // Obtain REQ from andminService, then clean it a bit
    model.filter1 = function(req) {
      return new Promise(function(resolve, reject) {
        try {
          // Address NA processing
          // MFG_ID can also be processed, but not yet
          if (req['Ship_To']['Address_2'] == "NA") {
            req['Ship_To']['Address_2'] = ""}
          // Status Translation
          var abvStatus = req['Status']
          req['Status'] = model.statusDict[abvStatus];
          // Calculates total sum of the REQ
          // `for i in x in JS returns index, not objects`
          // Oh I miss python
          totalSum = 0.0;
          for (item in req['lines']) {
            totalSum += req['lines'][item]['Line_Total'];
            if (req['lines'][item]['More_Info'].length > 175) {
              req['lines'][item]['More_Info'] = req['lines'][item]['More_Info'].substring(0,65) + "...";
            }
          }
          req['totalSum'] = totalSum;
          console.log(req) 
          // Construct the list of items by quering the getterService
          resolve(req);
        }

        // Display the Details component, remove the alert if displaying
        catch (error) {
          reject(error);
        }})}

    // Function to construct the item list
    model.constructItemList = function(req) {
      return new Promise(function(resolve, reject) {
        try {
          let itemdata = {}
          for (line in req['lines']) {
            getterService.findItem(req['lines'][line]['Item'])
              .then(function(response) {
                var modifiedResponse = response[0];
                for (wareHouseLine in modifiedResponse['Warehouse_Information']) {
                  var wareHouseStatus = modifiedResponse['Warehouse_Information'][wareHouseLine]['Status_Current']
                  modifiedResponse['Warehouse_Information'][wareHouseLine]['Status_Current'] = model.itemStatusDict[wareHouseStatus]
                } 
                modifiedResponse['Status'] = model.itemStatusDict[response[0]['Status']];
                itemdata[response[0]['Item_No']] = response[0]
                resolve(itemdata);
              })
          }
        }
        catch (error) {
          reject(error)
        }
      })}

    model.fetchData = function() {
      getterService.findReqsByBuyerDate(model.inputBuyerId, model.inputDate)
        .then(function(response){
          model.REQSJSON = response 
        })
        .then(function() {
          var entries = []
          for (req in model.REQSJSON) {
            var entryreq = model.filter1(model.REQSJSON[req]).then(function(res) {
              return res; 
            })

            var entryitem =  model.constructItemList(model.REQSJSON[req]).then(function(res) {
              return res;
            })

            Promise.all([entryreq, entryitem]).then(function(values) {
              model.ENTRIESJSON.push({"entryreq": values[0], "entryitem": values[1]})
            })
          }
          return(model.ENTRIESJSON); 
        })}

    if (this.inputParams['buyerid'] && this.inputParams['date']) {
      this.inputBuyerId = this.inputParams['buyerid'];
      this.inputDate = this.inputParams['date'];
      model.log();
      model.fetchData();
      console.log(model.ENTRIESJSON);
      console.log(model.ENTRIESJSON == false)
      if (!model.ENTRIESJSON == false) {
        model.hideTables = false;
        model.foundData = true;
      } else {
        model.hideTables = true;
        model.foundData = false;
      } 

    }}})();

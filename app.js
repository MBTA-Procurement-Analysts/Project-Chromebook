console.log("SERVER SIDE!");
var app = require('express'); // creates an instance of the express lib
var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/VPP';
if (process.env.MLAB_USERNAME_WEBDEV) {
    console.log("on heroku!");
    connectionString = process.env.MLAB_USERNAME_WEBDEV + ":" +
        process.env.MLAB_PASSWORD_WEBDEV + "@ds135444.mlab.com:35444/heroku_829kjs4t"
}

if (process.env.MLAB_USERNAME) { // check if running remotely
    connectionString = process.env.MLAB_USERNAME_WEBDEV + ":" +
        process.env.MLAB_PASSWORD_WEBDEV + "@ds135444.mlab.com:35444/heroku_829kjs4t"
}
console.log("connecting with: " + connectionString);

mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;
require("./server/user/services/user.service.server");
require("./server/bids/services/file.service.server");
require("./server/bids/services/bid.service.server");

require("./server/bids/services/bid.service.server");
require("./server/bids/services/file.service.server");
require("./server/vendors/services/vendor.service.server");
require("./server/bid-num/services/bid-num.service.server");

//require("./server/mail/mail.server");



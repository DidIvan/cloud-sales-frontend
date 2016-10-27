var RestClient = require('node-rest-client').Client;

var showcaseRestClient = new RestClient();

module.exports = function (router) {
    require("./goods")(router, showcaseRestClient);
};
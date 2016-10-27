var express = require('express');
var RestClient = require('node-rest-client').Client;

var router = express.Router();
var restClient = new RestClient();

/**
 * Init controllers there
 * e.g. require("./home")(router, restClient);
 * I use custom restClient for admin because there is self backend service unavailable page
 */
require("./admin")(router);
require("./showcase")(router);

/** add catch server error, custom error, not found, backend service unavailable */

module.exports = router;
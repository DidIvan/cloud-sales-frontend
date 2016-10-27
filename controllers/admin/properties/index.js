var backendService = require("./../../../middlewares/backend-service");
var siteNavigation = require("./../../../middlewares/site-navigation");
var AdminURL = require('./../../../url/AdminURL');

var redirect = siteNavigation.redirect;
var wrapData = backendService.makeServiceRequestBody;

module.exports = function (router, restClient) {
    router.get(AdminURL.ADMIN_PROPERTY_URL, function (req, res) {
        restClient.get(backendService.PROPERTY_URL, function (data) {
            console.log('Sending request to:  ' + backendService.PROPERTY_URL);
            console.log('Response data: ' + data);
            res.json(data);
        });
    });
    router.post(AdminURL.ADMIN_PROPERTY_URL, function (req, res) {
        restClient.post(backendService.PROPERTY_URL, wrapData(req.body), function (data, response) {
            console.log('Sending request to:  ' + backendService.PROPERTY_URL);
            console.log('Response data: ' + data);
            res.json(data);
        });
    });
    router.put(AdminURL.ADMIN_PROPERTY_URL, function (req, res) {
        console.log('PUT  - .../admin/properties-tab');
        restClient.post(backendService.PROPERTY_URL, wrapData(req.body), function (data, response) {
            console.log('PUT to: ' + backendService.PROPERTY_URL);
            console.log('PUT  response - .../admin/properties-tab' + response + "Data: " + data);
            res.json(data);
        });
    });
};
/**
 * Created by Vlad on 15.06.2016.
 */
var backendService = require("./../../../middlewares/backend-service");
var wrapData = backendService.makeServiceRequestBody;
var AdminURL = require('./../../../url/AdminURL');

module.exports = function (router, restClient) {
    router.get(AdminURL.ADMIN_MEASURE_URL, function (req, res) {
        restClient.get(backendService.MEASURE_URL, function (data) {
            res.json(data);
        });
    });
    router.post(AdminURL.ADMIN_MEASURE_URL, function (req, res) {
        restClient.post(backendService.MEASURE_URL, wrapData(req.body), function (data, response) {
            res.json(data);
        });
    });
    router.put(AdminURL.ADMIN_MEASURE_URL, function (req, res) {
        console.log('PUT  - .../admin/measure-tab');
        restClient.post(backendService.MEASURE_URL, wrapData(req.body), function (data, response) {
            console.log('PUT to: ' + backendService.MEASURE_URL);
            console.log('PUT  response - .../admin/measure-tab' + response + "Data: " + data);
            res.json(data);
        });
    });
};
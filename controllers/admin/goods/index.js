var backendService = require("./../../../middlewares/backend-service");
var AdminURL = require('./../../../url/AdminURL');

var wrapData = backendService.makeServiceRequestBody;

module.exports = function (router, restClient) {
    router.get(AdminURL.ADMIN_GOODS_URL, function (req, res) {
        console.log('GET  - .../admin/goods-tab');
        restClient.get(backendService.GOODS_URL, function (data) {
            console.log('GET  - ' + backendService.GOODS_URL);
            res.json(data);
        });
    });
    router.post(AdminURL.ADMIN_GOODS_URL, function (req, res) {
        console.log('POST  - .../admin/goods-tab');
        restClient.post(backendService.GOODS_URL, wrapData(req.body), function (data, response) {
            console.log('POST to: ' + backendService.GOODS_URL);
            console.log('POST  response - .../admin/goods-tab' + response + "Data: " + data);
            res.json(data);
        });
    });

    router.put(AdminURL.ADMIN_GOODS_URL, function (req, res) {
        console.log('PUT  - .../admin/goods-tab');
        restClient.post(backendService.GOODS_URL, wrapData(req.body), function (data, response) {
            console.log('PUT to: ' + backendService.GOODS_URL);
            console.log('PUT  response - .../admin/goods-tab' + response + "Data: " + data);
            res.json(data);
        });
    });
};
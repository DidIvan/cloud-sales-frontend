var backendService = require("./../../../middlewares/backend-service");

module.exports = function (router, restClient) {
    router.get("/showcase/goods/list", function (req, res) {
        restClient.get(backendService.GOODS_URL, function (data) {
            
            res.json(data);
        });
    });
};
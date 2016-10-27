var RestClient = require('node-rest-client').Client;

var goodsRestClient = new RestClient(),
    categoryRestClient = new RestClient(),
    propertyRestClient = new RestClient(),
    measureRestClient = new RestClient();

module.exports = function (router) {
    require("./goods")(router, goodsRestClient);
    require("./categories")(router, categoryRestClient);
    require("./properties")(router, propertyRestClient);
    require("./measure")(router, measureRestClient);

    router.get("/admin/service/400", function (req, res) {
        res.render("admin/errors/backend-server-400", {});
    });

    router.get("/admin/service/500", function (req, res) {
        res.render("admin/errors/backend-server-500", {});
    });
};
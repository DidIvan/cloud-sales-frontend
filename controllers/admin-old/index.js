var RestClient = require('node-rest-client').Client;

var adminRestClient = new RestClient();

module.exports = function (router) {
    require("./goods")(router, adminRestClient);

    router.get("/admin/service/400", function(req, res) {
        res.render("admin/errors/backend-server-400", {});
    });

    router.get("/admin/service/500", function(req, res) {
        res.render("admin/errors/backend-server-500", {});
    });
};

// add listeners for error
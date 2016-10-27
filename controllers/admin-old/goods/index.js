var backendService = require("./../../../middlewares/backend-service");
var siteNavigation = require("./../../../middlewares/site-navigation");

var redirect = siteNavigation.redirect;
var wrapData = backendService.makeServiceRequestBody;

module.exports = function (router, restClient) {
    router.get("/admin-old", function(req, res) {
        res.render("admin", {});
    });

    router.get("/admin/goods/list", function(req, res) {

        restClient.get(backendService.GOODS_URL, function (data) {
            res.render("admin/goods/list", {data: data});
        });
    });

    router.post("/admin/goods/save", function(req, res) {
        console.log(wrapData(req.body));
        console.log(wrapData(req.body).data.propertyValues);
        restClient.post(backendService.GOODS_URL, wrapData(req.body), function (data, response) {
            if (response.statusCode == 200) {
                redirect(req, res, "/admin/goods/list");
            } else if (response.statusCode == 400) {
                redirect(req, res, "/admin/service/400");
            } else {
                redirect(req, res, "/admin/service/500");
            }
        });
    });

    router.get("/admin/goods/properties", function(req, res) {
        restClient.get(backendService.PROPERTY_URL, function (data) {
            res.render("admin/goods/properties", {data: data});
        });
    });

    router.post("/admin/goods/property/save", function(req, res) {
        restClient.post(backendService.PROPERTY_URL, wrapData(req.body), function (data, response) {
            if (response.statusCode == 200) {
                redirect(req, res, "/admin/goods/properties");
            } else if (response.statusCode == 400) {
                redirect(req, res, "/admin/service/400");
            } else {
                redirect(req, res, "/admin/service/500");
            }
        });
    });

    router.get("/admin/goods/new", function(req, res) {
        restClient.get(backendService.GOODS_MAP_URL, function (data) {
            res.render("admin/goods/new", {data: data});
        });
    });

    router.get("/admin/goods/view/:id", function(req, res) {
        restClient.get(backendService.GOODS_URL + "/" + req.params.id, function (data) {
            res.render("admin/goods/view", {data: data});
        });
    });

    router.get("/admin/goods/measures", function(req, res) {
        restClient.get(backendService.MEASURE_URL, function (data) {
            res.render("admin/goods/measures", {data: data});
        });
    });

    router.post("/admin/goods/measure/save", function(req, res) {
        restClient.post(backendService.MEASURE_URL, wrapData(req.body), function (data, response) {
            if (response.statusCode == 200) {
                redirect(req, res, "/admin/goods/measures");
            } else if (response.statusCode == 400) {
                redirect(req, res, "/admin/service/400");
            } else {
                redirect(req, res, "/admin/service/500");
            }
        });
    });
};
var config = require('./../config');
var serviceEndpoint = config.get('backendServiceEndpoint');


function makeServiceRequestBody(data) {
    // remove empty values
    Object.keys(data).forEach(function (key) {
        if (data[key] == "") {
            delete data[key];
        }
    });

    var args = {
        "data": data, 
        headers: {"Content-Type": "application/json"}
    };
    return args;
}


module.exports.makeServiceRequestBody = makeServiceRequestBody;

module.exports.GOODS_URL = serviceEndpoint + "/rest/v1_1/goods";
module.exports.CATEGORIES_URL = serviceEndpoint + "/rest/v1_1/goods/category";
module.exports.PROPERTY_URL = serviceEndpoint + "/rest/v1_1/goods/property";
module.exports.MEASURE_URL = serviceEndpoint + "/rest/v1_1/goods/measure";
module.exports.GOODS_MAP_URL = serviceEndpoint + "/goods/map";
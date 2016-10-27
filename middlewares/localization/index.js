var config = require("nconf");
var phrazesUa = require("./langs/phrases-ua");

function getPhrase(key) {   /* if (config.get("defaultLanguage") == "en") {*/
    if (false) {
        return key;
    }
    var phr = phrazesUa[key];
    if (phr == undefined) {
        console.log("=> " + key);
        return key;
    }
    return phr;
}

function getCurrentLanguageCode() {
    return config.get("defaultLanguage");
}

module.exports = getPhrase;
module.exports.get = getPhrase;
module.exports.currentLanguageCode = getCurrentLanguageCode;
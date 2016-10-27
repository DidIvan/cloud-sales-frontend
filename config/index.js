var nconf = require('nconf');
var path = require('path');

var env = process.env.NODE_ENV;
try {
    if (env) {
        const filePath = "./config-" + env + ".json";
        var envConfigFile = require(filePath);
        nconf.argv()
            .env()
            .file({file: path.join(__dirname, filePath)});
    } else {
        console.error('NODE_ENV undefined' + env + "config-default.json will be applied.");
        console.error('Please set NODE_ENV=' + env);
        nconf.argv()
            .env()
            .file({file: path.join(__dirname, './config-default.json')});
    }
}
catch (e) {
    console.error('File config-' + env + ".json doesn't exist, file: config-default.json will be applied.");
    console.error('Please add config-' + env + ".json file to directory: [project]/config/");
    nconf.argv()
        .env()
        .file({file: path.join(__dirname, './config-default.json')});
}

console.log("Config settings: NODE_ENV=" + env);
console.log("Config settings: backEnd host: " + nconf.get('backendServiceEndpoint'));
console.log("Config settings: port: " + nconf.get('serverPort'));

module.exports = nconf;

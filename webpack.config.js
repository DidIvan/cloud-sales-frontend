var path = require("path");

module.exports = [{
    context: path.join(__dirname, "/views"),
    entry: {
        bundle: "./main.js",
        bundle1: "./mainAdmin.js"
    },
    output: {
        path: __dirname + "/public/js",
        filename: "[name].js",
        library: '[name]'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ["", ".js", ".jsx"],
        root: [path.join(__dirname, "public", "javascripts")],
        modulesDirectories: ["node_modules"]
    }
}];
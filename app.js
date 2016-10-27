var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var React = require("react");
var reactViews = require('express-react-views');
var config = require('./config');

var app = express();
app.set('port', config.get('serverPort'));

app.set('views', __dirname + '/views');
app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(require("./controllers"));

const BACKEND_HOST = "localhost:8000";
app.get('/', function (req, res) {
    var initialState = {
        urlBackEnd: BACKEND_HOST
    };
    res.render('Html', {data: initialState});
});

app.get('/admin', function (req, res) {
    var initialState = {
        urlBackEnd: BACKEND_HOST
    };
    res.render('HtmlAdmin', {data: initialState});
});

var server = app.listen(app.get('port'), function () {
    console.log('Server is listening on port: ' + server.address().port);
});
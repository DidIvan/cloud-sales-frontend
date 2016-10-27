var React = require('react');
var ReactDOM = require('react-dom');
var Container = require('./components/container.react');

module.exports = function (data) {
    var container = document.getElementById('content');
    ReactDOM.render(
        <Container {...data} />,
        container
    );

};
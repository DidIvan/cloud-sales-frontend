var Dispatcher = require('flux').Dispatcher;

var AdminDispatcher = new Dispatcher();

AdminDispatcher.handleViewAction = function(action) {
    this.dispatch({
        source: 'VIEW_ACTION',
        action: action
    });
}

module.exports = AdminDispatcher;
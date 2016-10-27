var AdminDispatcher = require('../dispatcher/AdminDispatcher'),

    AdminLoginConstants = require('../constants/AdminLoginConstants');

var AdminLoginActions = {

    storeInputName: function (value) {
        AdminDispatcher.handleViewAction({
            actionType: AdminLoginConstants.ADMIN_LOGIN_STORE_INPUT_NAME,
            value: value
        });
    }, 
    storeInputPassword: function (value) {
        AdminDispatcher.handleViewAction({
            actionType: AdminLoginConstants.ADMIN_LOGIN_STORE_INPUT_PASSWORD,
            value: value
        });
    },
    storeLoginSubmit: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminLoginConstants.ADMIN_LOGIN_STORE_SUBMIT
        });
    }


};

module.exports = AdminLoginActions;
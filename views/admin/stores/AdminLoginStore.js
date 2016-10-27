var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminURL = require('./../../../url/AdminURL'),
    AdminLoginConstants = require('../constants/AdminLoginConstants'),

    GoodsUtils = require("./../../utils/GoodsUtils"),
    requestSender = require('./../../utils/RequesSender'),
    StoreConstants = require("./StoreConstants");

var _loginData = {
        "name": "",
        "password": ""
    },
    _errorMessagesUsername,
    _errorMessagesPassword,
    _isNameValid = StoreConstants.INVALID,
    _isPasswordValid = StoreConstants.INVALID,
    _isAllDataValid = StoreConstants.INVALID,
    _isAuthorized = StoreConstants.CLOSE;


function _validateLoginName(value) {
    _errorMessagesUsername = "";
    if (value.length == 0) {
        _errorMessagesUsername = "Обов'язкове поле";
        _isAllDataValid = StoreConstants.INVALID;

    } else if (value.length > 64) {
        _errorMessagesUsername = "Максимум 64 символи";
        _isAllDataValid = StoreConstants.INVALID;
    } else {
        _isNameValid = StoreConstants.VALID;
    }
}
function _validateLoginPassword(value) {
    ///TODO ...
    _errorMessagesPassword = "";
    if (value.length == 0) {
        _errorMessagesPassword = "Обов'язкове поле";
        _isPasswordValid = StoreConstants.INVALID;

    }
    if (value.length > 64) {
        _errorMessagesPassword = "Максимум 64 символи";
        _isPasswordValid = StoreConstants.INVALID;
    } else {
        _isPasswordValid = StoreConstants.VALID;
    }
}
function successLoadData(data) {
    ///TODO ...
}
function errorLoadData(xhr, status, err) {
    ///TODO ...
}
function successPostData(data) {
    ///TODO ...
    /*_isAuthorized = StoreConstants.ENTER;
     AdminLoginStore.emitChange();*/
}
function errorPostData(xhr, status, err) {
    ///TODO ...
}
var AdminLoginStore = _.extend({}, EventEmitter.prototype, {
    getLoginData: function () {
        return _loginData;
    },
    getErrorMessagesUsername: function () {
        return _errorMessagesUsername;
    },
    getErrorMessagesPassword: function () {
        return _errorMessagesPassword;
    },
    isAuthorized: function () {
        return _isAuthorized;
    },
    emitChange: function () {
        this.emit(StoreConstants.CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(StoreConstants.CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(StoreConstants.CHANGE_EVENT, callback);
    }
});

AdminDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {

        case AdminLoginConstants.ADMIN_LOGIN_STORE_INPUT_NAME:
            _validateLoginName(action.value);
            _loginData.name = action.value;
            AdminLoginStore.emitChange();
            break;

        case AdminLoginConstants.ADMIN_LOGIN_STORE_INPUT_PASSWORD:
            _validateLoginPassword(action.value);
            _loginData.password = action.value;
            AdminLoginStore.emitChange();
            break;


        case AdminLoginConstants.ADMIN_LOGIN_STORE_SUBMIT:
           /* if (this.state.userName == '' || this.state.password == '') {
                this.setState({uiMessage: "Все поля должны быть заполнены!"})
                return;
            }*/
            if (_isNameValid && _isPasswordValid) {
                _isAllDataValid = StoreConstants.VALID
            }
            if (!_isNameValid) {
                _errorMessagesUsername = "Не правильно заповнене поле";
            }
            if (!_isPasswordValid) {
                _errorMessagesPassword = "Не правильно заповнене поле";
            }

            if (_isAllDataValid) {
                _isAuthorized = StoreConstants.ENTER;
                /*requestSender.post(errorPostData, successPostData, AdminURL.ADMIN_CATEGORY_URL, _loginData);*/
            } else {
                /*  _errorMessagesName = "Не правильно заповнены поля";*/
            }
            AdminLoginStore.emitChange();
            break;
    }
    return true;
});

module.exports = AdminLoginStore;
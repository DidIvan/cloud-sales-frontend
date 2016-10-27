var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminPropertiesConstants = require('../constants/AdminPropertiesConstants'),

    GoodsUtils = require("./../../utils/GoodsUtils"),
    requestSender = require('./../../utils/RequesSender'),
    AdminURL = require('./../../../url/AdminURL'),
    StoreConstants = require("./StoreConstants");

var _addingOrEditingProperty = {
    "id": '',
    "name": '',
    "measureId": '',
    "valueType": ''
};

var _columnMetaData = [
    {
        "displayName": "РЕДАГ.",
        "style": {
            width: 70,
            padding: 0
        }
    },
    {
        "displayName": "IД",
        "style": {
            width: 70,
            padding: 0
        }
    },
    {
        "displayName": "Назва характеристики",
        "style": {
            width: 120,
            padding: 0
        }
    },
    {
        "displayName": "Одиниця вимірювання",
        "style": {
            width: 120,
            padding: 0
        }
    },

    {
        "displayName": "Тип данних",
        "style": {
            width: 120,
            padding: 0
        }
    }
];

var _measurementList = {};

var _dataTypeList = [
    {
        "id": 1,
        "name": "TEXT"
    },
    {
        "id": 2,
        "name": "INTEGER"
    },
    {
        "id": 3,
        "name": "FLOAT"
    }

];

var _propertyList = {
    properties: []
};

var _selectedPropertiesList = [];

var _addPropertiesDialogOpen = false,
    _editPropertiesDialogOpen = false,
    _isAllDataValid = StoreConstants.VALID,
    _isNewProperties = StoreConstants.VALID,
    _errorMessages = "",
    _errorMessagesDataType = "",
    _errorMessagesMeasurement = "";

var _validatePropertiesName = function (value) {
    _errorMessages = "";
    if (value.length == 0) {
        _errorMessages = "Обов'язкове поле";
        _isAllDataValid = StoreConstants.INVALID;
    } else if ((value.length > 0 && value.length < 3) || value.length > 64) {
        _errorMessages = "Довжина тексту повинна бути в діапазоні віз 3 до 64 символів";
        _isAllDataValid = StoreConstants.INVALID;
    } else _isAllDataValid = StoreConstants.VALID;
}
var _validatePropertiesMeasurement = function (value) {
    _errorMessagesMeasurement = "";

    /*    if (value.length == 0) {
     _errorMessagesMeasurement = "Обов'язкове поле";
     _isAllDataValid = false;
     }*/
};
var _validatePropertiesDataType = function (value) {
    _errorMessagesDataType = "";
    /*    if (value.length == 0) {
     _errorMessagesDataType = "Обов'язкове поле";
     _isAllDataValid = false;
     }*/
};

var _clearStates = function () {

    _addingOrEditingProperty = {
        "id": "",
        "name": "",
        "measureId": "1",
        "valueType": "TEXT"
    };
    _errorMessages = '';
    _errorMessagesMeasurement = "";
    _errorMessagesDataType = "";

    _isAllDataValid = StoreConstants.INVALID;
};

var _updateProperties = function () {
    let id = _addingOrEditingProperty.id;
    let temp = GoodsUtils.getObjectById(id, _propertyList);
    temp.name = _addingOrEditingProperty.name;
    temp.valueType = _addingOrEditingProperty.valueType;
    temp.measureId = _addingOrEditingProperty.measureId;
}

function successLoadData(data) {
    _propertyList = data;
    AdminPropertiesStores.emitChange();
}
function errorLoadData(xhr, status, err) {
    _propertyList = {
        properties: []
    };
}
function successPostData(data) {

}
function errorPostData(xhr, status, err) {

}
function successLoadMeasureData(data) {
    _measurementList = data;
    AdminPropertiesStores.emitChange();
}
function errorLoadMeasureData(xhr, status, err) {
    _measurementList = [];
    AdminPropertiesStores.emitChange();
}
function successPutData(data) {
    //TODO ...
}
function errorPutData(xhr, status, err) {
    //TODO ...
}
function setDefaultValues() {
    _addingOrEditingProperty.measureId = "1";
    _addingOrEditingProperty.valueType = "TEXT"
}

var AdminPropertiesStores = _.extend({}, EventEmitter.prototype, {
    loadData: function () {
        requestSender.get(errorLoadData, successLoadData, AdminURL.ADMIN_PROPERTY_URL);
        requestSender.get(errorLoadMeasureData, successLoadMeasureData, AdminURL.ADMIN_MEASURE_URL);
    },
    getColumnMetaData: function () {
        return _columnMetaData;
    },
    getPropertyList: function () {
        return _propertyList;
    },
    getMeasurementList: function () {
        return _measurementList;
    },
    getDataTypeList: function () {
        return _dataTypeList;
    },
    getSelectedPropertiesList: function () {
        return _selectedPropertiesList;
    },
    getErrorMessagesName: function () {
        return _errorMessages;
    },
    getErrorMessagesMeasurement: function () {
        return _errorMessagesMeasurement;
    },
    getErrorMessagesDataType: function () {
        return _errorMessagesDataType;
    },
    isAddPropertiesDialogOpen: function () {
        return _addPropertiesDialogOpen;
    },
    isEditPropertiesDialogOpen: function () {
        return _editPropertiesDialogOpen;
    },
    getAddingOrEditingProperties: function () {
        return _addingOrEditingProperty;
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
        case AdminPropertiesConstants.ADMIN_PROPERTIES_SELECT_FOR_DELETE:
            _selectedPropertiesList = action.selectedRows;
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_DELETE_SELECTED:
            //TODO NEED DELETE HTTP REQUEST
            _selectedPropertiesList.map(function (item) {
                for (var j = 0; j < _selectedPropertiesList.length; j++) {
                    for (var i = _propertyList.properties.length - 1; i >= 0; i--) {
                        if (i == _selectedPropertiesList[j]) _propertyList.properties.splice(i, 1);
                    }
                }
            })
            AdminPropertiesStores.emitChange();
            break;

        case AdminPropertiesConstants.ADMIN_PROPERTIES_ADD_DIALOG_OPEN:
            _addPropertiesDialogOpen = true;
            _isNewProperties = true;
            setDefaultValues();
            AdminPropertiesStores.emitChange();
            break;

        case AdminPropertiesConstants.ADMIN_PROPERTIES_ADD_DIALOG_CLOSE:
            _addPropertiesDialogOpen = false;
            _clearStates();
            AdminPropertiesStores.emitChange();
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_EDIT_DIALOG_OPEN:
            _isNewProperties = false;
            let selectedRowObject = _propertyList.properties[action.rowNumber];
            _addingOrEditingProperty = selectedRowObject;
            _editPropertiesDialogOpen = true;

            AdminPropertiesStores.emitChange();
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_STORE_DIALOG_NAME:
            _validatePropertiesName(action.value);
            _addingOrEditingProperty.name = action.value;

            AdminPropertiesStores.emitChange();
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_STORE_DIALOG_MEASUREMENT:
            _validatePropertiesMeasurement(action.value);
            _addingOrEditingProperty.measureId = action.value;

            AdminPropertiesStores.emitChange();
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_STORE_DIALOG_TYPE:
            _validatePropertiesDataType(action.value);
            _addingOrEditingProperty.valueType = action.value;
            AdminPropertiesStores.emitChange();
            break;

        case AdminPropertiesConstants.ADMIN_PROPERTY_ADD_OR_UPDATE:
            _validatePropertiesName(_addingOrEditingProperty.name);
            if (_isAllDataValid) {
                if (_isNewProperties) {
                    requestSender.post(errorPostData, successPostData, AdminURL.ADMIN_PROPERTY_URL, _addingOrEditingProperty);
                    _addPropertiesDialogOpen = StoreConstants.CLOSE;
                } else {
                    /*    _updateProperties();*/
                    requestSender.put(errorPutData, successPutData, AdminURL.ADMIN_PROPERTY_URL, _addingOrEditingProperty);
                    _addPropertiesDialogOpen = StoreConstants.CLOSE;
                }
                _clearStates();
            }
            AdminPropertiesStores.emitChange();
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_EDIT_DIALOG_CLOSE:
            _clearStates();
            _editPropertiesDialogOpen = false,
                AdminPropertiesStores.emitChange();
            break;
        case AdminPropertiesConstants.ADMIN_PROPERTIES_CLEAR_DIALOG_DATA:
            _clearStates();

            AdminPropertiesStores.emitChange();
            break;
    }
    return true;
});

module.exports = AdminPropertiesStores;
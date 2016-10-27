const MEASURE_URL = "/admin/measure-tab";

var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminMeasureConstants = require('../constants/AdminMeasureConstants'),
    AdminCategoriesStore = require('../stores/AdminCategoriesStore'),
    AdminPropertiesStore = require('../stores/AdminPropertiesStore'),

    GoodsUtils = require("./../../utils/GoodsUtils"),
    requestSender = require('./../../utils/RequesSender'),
    StoreConstants = require("./StoreConstants");

var _columnMetadata = [
        {
            "displayName": "РЕДАГ.",
            "style": {
                width: 70,
                padding: 0
            }
        },
        {
            "displayName": "ІД",
            "style": {
                width: 80,
                padding: 0
            }
        },
        {
            "displayName": "НАЗВА",
            "style": {
                width: 150,
                padding: 0
            }
        },
        {
            "displayName": "ОДИНИЦЯ ВИМІРЮВАННЯ",
            "style": {
                width: 150,
                padding: 0
            }
        },

    ],
    _measureList = {
        measures: []
    },
    _measurementDropDownList = [
        {
            measureId: 1,
            name: "Kg"
        },
        {
            measureId: 2,
            name: "m"
        },
        {
            measureId: 3,
            name: "m2"
        },
        {
            measureId: 4,
            name: "m3"
        },
        {
            measureId: 5,
            name: "sec"
        }

    ],
    _selectedMeasureList = [],

//DIALOG states:
    _addingOrEditingMeasure = {
        "id": '',
        "name": '',
        "abbreviation": ''
    },

    _addMeasureDialogOpen = false,
    _editMeasureDialogOpen = false,
    _isNameValid = false,
    _isShortNameValid = false,
    _isNewMeasure = '',
    _errorMessagesName = '',
    _errorMessagesShortName = '';

var _validateMeasureName = function (value) { //ttitle not null, measure title range
    _errorMessagesName = "";

    if (value.length == 0) {
        _errorMessagesName = "Обов'язкове поле";
        _isNameValid = false;
    } else if (value.length < 3) {
        _errorMessagesName = "Довжина тексту повинна бути в діапазоні віз 3 до 64 символів";
        _isNameValid = false;
    } else if (value.length > 64) {
        _errorMessagesName = "Довжина тексту повинна бути в діапазоні віз 3 до 64 символів";
        _isNameValid = false;
    } else {
        _isNameValid = true;
    }
}

var _validateMeasureShortName = function (value) { //ValidationMeasureAbrRange
        _errorMessagesShortName = "";

        if (value.length == 0) {
            _errorMessagesShortName = "Обов'язкове поле";
            _isShortNameValid = false
        } else if (value.length > 8) {
            _errorMessagesShortName = "Довжина тексту повинна бути в діапазоні віз 1 до 8 символів";
            _isShortNameValid = false
        } else {
            _isShortNameValid = true
        }
    };

var _clearStates = function () {
    _addingOrEditingMeasure = {
        "id": '',
        "name": '',
        "abbreviation": ''
    };

    _errorMessagesName = '';
    _errorMessagesShortName = '';

    _isNameValid = false;
    _isShortNameValid = false

};

var _updateMeasure = function () {
    let id = _addingOrEditingMeasure.id;
    let temp = GoodsUtils.getObjectById(id, _measureList);
    temp.name = _addingOrEditingMeasure.name;
    temp.abbreviation = _addingOrEditingMeasure.abbreviation;

}

function successLoadData(data) {
    _measureList = data;
    AdminMeasureStores.emitChange();
}
function errorLoadData(xhr, status, err) {
    _measureList = {
        "measures": []
    }
    AdminMeasureStores.emitChange();
}

function successPostData(data) {

}
function errorPostData(xhr, status, err) {

}
function successPutData(data) {
    //TODO ...
}
function errorPutData(xhr, status, err) {
    //TODO ...
}

//_measurementDataTypeDropdownList
var AdminMeasureStores = _.extend({}, EventEmitter.prototype, {
    loadData: function () {
        requestSender.get(errorLoadData, successLoadData, MEASURE_URL);
    },
    getMeasurementDropDownList: function () {
        return _measurementDropDownList;
    },
    getAddingOrEditingMeasure: function () {
        return _addingOrEditingMeasure;
    },
    getColumnMetadata: function () {
        return _columnMetadata;
    },
    getMeasureList: function () {
        return _measureList;
    },
    getSelectedMeasureList: function () {
        return _selectedMeasureList;
    },
    isAddMeasureDialogOpen: function () {
        return _addMeasureDialogOpen;
    },
    isEditMeasureDialogOpen: function () {
        return _editMeasureDialogOpen;
    },
    getErrorMessagesName: function () {
        return _errorMessagesName;
    },
    getErrorMessagesShortName: function () {
        return _errorMessagesShortName;
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
})

AdminDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case AdminMeasureConstants.ADMIN_MEASURE_SELECT_FOR_DELETE:
            _selectedMeasureList = action.selectedRows;
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_DELETE_SELECTED:
            _selectedMeasureList.map(function (item) {
                for (var j = 0; j < _selectedMeasureList.length; j++) {
                    for (var i = _measureList.length - 1; i >= 0; i--) {
                        if (i == _selectedMeasureList[j]) _measureList.splice(i, 1);
                    }
                }
            })

            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_ADD_DIALOG_OPEN:
            _isNewMeasure = true;
            _addMeasureDialogOpen = true;

            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_ADD_DIALOG_CLOSE:
            _addMeasureDialogOpen = false;
            _clearStates();

            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_EDIT_DIALOG_OPEN:
            _isNewMeasure = false;
            let selectedRowObject = _measureList.measures[action.rowNumber];
            _addingOrEditingMeasure = selectedRowObject;
            _editMeasureDialogOpen = true;

            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_CLEAR_DIALOG_DATA:
            _clearStates();
            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_EDIT_DIALOG_CLOSE:
            _editMeasureDialogOpen = false;
            _clearStates();

            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_STORE_DIALOG_NAME:
            _validateMeasureName(action.value);
            _addingOrEditingMeasure.name = action.value;

            AdminMeasureStores.emitChange();
            break;

        case AdminMeasureConstants.ADMIN_MEASURE_STORE_DIALOG_MEASURE:
            //  case AdminMeasureConstants.ADMIN_MEASURE_STORE_DIALOG_MEASURE:
            _validateMeasureShortName(action.value);
            _addingOrEditingMeasure.abbreviation = action.value;

            AdminMeasureStores.emitChange();
            break;


        case AdminMeasureConstants.ADMIN_MEASURE_ADD_OR_UPDATE:

            /*_validateMeasureName(_addingOrEditingMeasure.name);
             _validateMeasureShortName(_addingOrEditingMeasure.abbreviation);
             _validateMeasureType(_addingOrEditingMeasure.typeId);*/

            //if (_isNameValid) {
            /*if (true) {
             if (_isNewMeasure) {
             let newMeasure = {
             "id": 99,
             "name": action.data.name,
             "abbreviation": action.data.abbreviation,
             "typeId": action.data.typeId
             }
             _measureList.push(newMeasure);
             _addMeasureDialogOpen = false;
             } else {
             //TODO make just update existing goods.
             _updateMeasure();
             _editMeasureDialogOpen = false;
             }
             _clearStates();
             }*/

            _validateMeasureName(_addingOrEditingMeasure.name);
            _validateMeasureShortName(_addingOrEditingMeasure.abbreviation);

            if (_isNameValid && _isShortNameValid) {
                if (_isNewMeasure) {
                    requestSender.post(errorPostData, successPostData, MEASURE_URL, _addingOrEditingMeasure);
                    // _addingOrEditingMeasure.id = 999;
                    {/*_measureList.push(_addingOrEditingMeasure);*/
                    }
                    _addMeasureDialogOpen = false;
                } else {
                    //_updateMeasure();
                    requestSender.put(errorPutData, successPutData, MEASURE_URL, _addingOrEditingMeasure);

                    _editMeasureDialogOpen = false;
                }
                _clearStates();
            }


            AdminMeasureStores.emitChange();
            break;
    }
    return true;
});

module.exports = AdminMeasureStores;
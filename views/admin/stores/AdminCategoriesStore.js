var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminURL = require('./../../../url/AdminURL'),
    AdminPropertiesStore = require('../stores/AdminPropertiesStore'),
    AdminCategoriesConstants = require('../constants/AdminCategoriesConstants'),

    GoodsUtils = require("./../../utils/GoodsUtils"),
    requestSender = require('./../../utils/RequesSender'),
    StoreConstants = require("./StoreConstants");
var _addingOrEditingCategory = {
        id: '',
        name: "",
        propertyIds: []
    },
    _columnMetadata = [
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
            "displayName": "КАТЕГОРIЯ",
            "style": {
                width: 150,
                padding: 0
            }
        },
        {
            "displayName": "КIЛЬК. ХАРАКТЕРИСТИК",
            "style": {
                width: 110,
                padding: 0,
                textAlign: 'center'
            }
        },
        {
            "displayName": "КIЛЬК. ТОВАРIВ",
            "style": {
                width: 100,
                padding: 0,
                textAlign: 'center'
            }
        }
    ],
    _categoryList = {
        categories: [],
        propertiesMap: {}
    },
    _selectedCategoriesList = [],
    _selectedProperties = [],
    _dropDownProperties = [],
    _editCategoriesDialogOpen = StoreConstants.CLOSE,
    _isAllDataValid = StoreConstants.VALID,
    _isNewCategories = StoreConstants.VALID,
    _errorMessagesName = "",
    _errorMessagesProperty = "",
    _addCategoriesDialogOpen = StoreConstants.CLOSE;

function _clearStates() {
    _addingOrEditingCategory = {
        id: '',
        name: "",
        propertyIds: []
    };
    _errorMessagesName = '';
    _errorMessagesProperty = "";
    _isAllDataValid = StoreConstants.INVALID;
    _selectedProperties = [];
    _dropDownProperties = [];
}
function _validateCategoriesName(value) {
    _errorMessagesName = "";
    if (value.length == 0) {
        _errorMessagesName = "Обов'язкове поле";
        _isAllDataValid = StoreConstants.INVALID;
    } else if ((value.length > 0 && value.length < 3) || value.length > 64) {
        _errorMessagesName = "Довжина тексту повинна бути в діапазоні віз 3 до 64 символів";
        _isAllDataValid = StoreConstants.INVALID;
    } else _isAllDataValid = StoreConstants.VALID;
}
function setDefaultValues() {
    _addingOrEditingCategory.propertyIds = [];
}
function propertyToArray() {
    for (var key in _categoryList.propertiesMap) {
        _dropDownProperties.push(_categoryList.propertiesMap[key]);
    }
}
function _updateCategories() {
    let id = _addingOrEditingCategory.id;
    let temp = GoodsUtils.getObjectById(id, _categoryList);
    temp.name = _addingOrEditingCategory.name;
    temp.property = _addingOrEditingCategory.propertyIds;
}
function successLoadData(data) {
    _categoryList = data;
    AdminCategoriesStore.emitChange();
}
function errorLoadData(xhr, status, err) {
    _categoryList = {
        categories: []
    };
}
function successPostData(data) {
    ///TODO ...
}
function errorPostData(xhr, status, err) {
    ///TODO ...
}
function successPutData(data) {
    //TODO ...
}
function errorPutData(xhr, status, err) {
    //TODO ...
}
var AdminCategoriesStore = _.extend({}, EventEmitter.prototype, {
    loadData: function () {
        requestSender.get(errorLoadData, successLoadData, AdminURL.ADMIN_CATEGORY_URL);
    },
    getColumnMetaData: function () {
        return _columnMetadata;
    },
    getCategoryList: function () {
        return _categoryList;
    },
    getDropDownProperties: function () {
        return _dropDownProperties;
    },
    getSelectedCategoriesList: function () {
        return _selectedCategoriesList;
    },
    getSelectedProperties: function () {
        return _selectedProperties;
    },
    getErrorMessagesName: function () {
        return _errorMessagesName;
    },
    getErrorMessagesProperty: function () {
        return _errorMessagesProperty;
    },
    isAddCategoriesDialogOpen: function () {
        return _addCategoriesDialogOpen;
    },
    isEditCategoriesDialogOpen: function () {
        return _editCategoriesDialogOpen;
    },
    getAddingOrEditingCategories: function () {
        return _addingOrEditingCategory;
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
        case AdminCategoriesConstants.ADMIN_CATEGORIES_SELECT_FOR_DELETE:
            _selectedCategoriesList = action.selectedRows;
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_DELETE_SELECTED:
            _selectedCategoriesList.map(function (item) {
                for (var j = 0; j < _selectedCategoriesList.length; j++) {
                    for (var i = _categoryList.categories.length - 1; i >= 0; i--) {
                        if (i == _selectedCategoriesList[j]) _categoryList.categories.splice(i, 1);
                    }
                }
            })
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_ADD_DIALOG_OPEN:
            setDefaultValues();
            propertyToArray();
            _addCategoriesDialogOpen = StoreConstants.OPEN;
            _isNewCategories = StoreConstants.NEW_ITEM;
            AdminPropertiesStore.loadData();
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_ADD_DIALOG_CLOSE:
            _addCategoriesDialogOpen = StoreConstants.CLOSE;
            _clearStates();
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_EDIT_DIALOG_OPEN:
            AdminPropertiesStore.loadData();
            _isNewCategories = StoreConstants.EDITED_ITEM;
            let selectedRowObject = _categoryList.categories[action.rowNumber];
            _addingOrEditingCategory = selectedRowObject;
            _editCategoriesDialogOpen = StoreConstants.OPEN;
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_STORE_DIALOG_NAME:
            _validateCategoriesName(action.value);
            _addingOrEditingCategory.name = action.value;
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_STORE_DIALOG_PROPERTY:
            var type = typeof (_addingOrEditingCategory.propertyIds);
            console.log(type);
            _addingOrEditingCategory.propertyIds.push(action.value);
            console.log(_addingOrEditingCategory);
            _selectedProperties.push(GoodsUtils.getObjectById(action.value, _dropDownProperties));
            for (var i = 0; i < _dropDownProperties.length; i++) {
                if (_dropDownProperties[i].id == action.value) {
                    _dropDownProperties.splice(i, 1);
                    console.log(_dropDownProperties.length)
                }
            }
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORY_ADD_OR_UPDATE:
            _validateCategoriesName(_addingOrEditingCategory.name);
            if (_isAllDataValid) {
                if (_isNewCategories) {
                    requestSender.post(errorPostData, successPostData, AdminURL.ADMIN_CATEGORY_URL, _addingOrEditingCategory);
                    _addCategoriesDialogOpen = StoreConstants.CLOSE;
                } else {
                    requestSender.put(errorPutData, successPutData, AdminURL.ADMIN_CATEGORY_URL, _addingOrEditingCategory);
                }
                _clearStates();
            }
            AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_EDIT_DIALOG_CLOSE:
            _clearStates();
            _editCategoriesDialogOpen = false,
                AdminCategoriesStore.emitChange();
            break;

        case AdminCategoriesConstants.ADMIN_CATEGORIES_CLEAR_DIALOG_DATA:
            _clearStates();
            AdminCategoriesStore.emitChange();
            break;
        case AdminCategoriesConstants.ADMIN_CATEGORIES_DELETE_SELECTED_PROPERTY: /*delete property*/
            let id = action.value;
            var propertyItem = {};
            for (var i = 0; i < _selectedProperties.length; i++) {
                if (_selectedProperties[i].id == id) {
                    propertyItem = _selectedProperties[i];
                    _selectedProperties.splice(i, 1);
                    break;
                }
            }
            _dropDownProperties.push(propertyItem);
            AdminCategoriesStore.emitChange();
            break;
    }
    return true;
});

module.exports = AdminCategoriesStore;
const GOODS_URL = "/admin/goods-tab";

var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminGoodsConstants = require('../constants/AdminGoodsConstants'),
    AdminCategoriesStore = require('../stores/AdminCategoriesStore'),
    AdminPropertiesStore = require('../stores/AdminPropertiesStore'),

    GoodsUtils = require("./../../utils/GoodsUtils"),
    AdminURL = require("./../../../url/AdminURL"),
    requestSender = require('./../../utils/RequesSender'),
    StoreConstants = require("./StoreConstants");

var _addingOrEditingGoods = {
        "id": '',
        "title": '',
        "price": '',
        "quantity": '',
        "measureId": '',
        "description": '',
        "categoryId": '',
        "propertyValues": []
    },
    _addingOrEditingGoodsPpropertiesMap = {},
    _isAllDataValid = StoreConstants.VALID,
    _isNewGoods = '',
    _errorMessagesName = '',
    _errorMessagesPrice = '',
    _errorMessagesQuantity = '',
    _errorMessagesDescription = '',
    _errorMessagesCategory = '',

    _categoryDDL = {"categories": []},
    _measuresDDL = {"measures": []},
    _propertyList = {"properties": []};

function _validateGoodsName (value) {
    _errorMessagesName = "";

    if (value.length == 0) {
        _errorMessagesName = "Обов'язкове поле";
        _isAllDataValid = false;
    }
    if (value.length > 64) {
        _errorMessagesName = "Максимум 64 символи";
        _isAllDataValid = false;
    }
}
function _validateGoodsPrice (value) {
    _errorMessagesPrice = "";
    if (value.length == 0) {
        _errorMessagesPrice = "Обов'язкове поле";
        _isAllDataValid = false;
    }
};
function _validateGoodsQuantity (value) {
    _errorMessagesQuantity = ""
    if (value.length == 0) {
        _errorMessagesQuantity = "Обов'язкове поле";
        _isAllDataValid = false;
    }
};
function _validateGoodsDescription (value) {
    _errorMessagesDescription = ""
    if (value > 512) {
        _errorMessagesDescription = "Максимум 512 символiв";
        _isAllDataValid = false;
    }
};
function _validateGoodsCategory (value) {
};
function _updateGoods () {
    let id = _addingOrEditingGoods.id;
    let temp = GoodsUtils.getObjectById(id, _goodsList.goods);
    temp.name = _addingOrEditingGoods.title;
    temp.price = _addingOrEditingGoods.price;
    temp.quantity = _addingOrEditingGoods.quantity;
    temp.measureId = _addingOrEditingGoods.measureId;
    temp.description = _addingOrEditingGoods.description;
    temp.categoryId = _addingOrEditingGoods.categoryId;
    temp.properties = _addingOrEditingGoods.properties;
};
function _saveProps () {
    //Save all propertiesValueMap from  _addingOrEditingGoodsProps to _goodsList:
    for (var key in _addingOrEditingGoodsProps.propertiesValueMap) {
        _goodsList.propertiesValueMap[key] = _addingOrEditingGoodsProps.propertiesValueMap[key];
    }

    //If property not exist in propertiesMap, we should add it to the propertiesMap in _goodsList:
    for (var keyInEddingOrEditingGoods in _addingOrEditingGoodsProps.propertiesMap) {

        let isPresent = false;
        for (var keyInGoodsList in _goodsList.propertiesMap) {
            if (keyInGoodsList == keyInEddingOrEditingGoods) {
                isPresent = true;
                break;
            }
        }
        if (!isPresent) {
            _goodsList.propertiesMap[keyInEddingOrEditingGoods] = _addingOrEditingGoodsProps.propertiesMap[keyInEddingOrEditingGoods];
        }
    }
};
function _clearStates () {
    _addingOrEditingGoods = {
        "id": '',
        "name": '',
        "price": '',
        "quantity": '',
        "measureId": '',
        "description": '',
        "categoryId": '',
        "propertyValues": []
    },
        _addingOrEditingGoodsPpropertiesMap = {};
    _errorMessagesName = '';
    _errorMessagesPrice = '';
    _errorMessagesQuantity = '';
    _errorMessagesDescription = '';
    _errorMessagesCategory = '';
    _isAllDataValid = false;
};

function successPostData(data) {
 //TODO ...
}
function errorPostData(xhr, status, err) {
    //TODO ...
}
function successPutData(data) {
    //TODO ...
}
function errorPutData(xhr, status, err) {
    //TODO ...
}
function successLoadMeasureData(data) {
    _measuresDDL = data;
    AdminGoodsDialogStore.emitChange();
}
function errorLoadMeasureData(xhr, status, err) {
    _measuresDDL = {
        "measures": []
    }
    AdminGoodsDialogStore.emitChange();
}
function successLoadPropertyData(data) {
    _propertyList = data;
    AdminGoodsDialogStore.emitChange();
}
function errorLoadPropertyData(xhr, status, err) {
    _propertyList = {
        "properties": []
    }
    AdminGoodsDialogStore.emitChange();
}
function successLoadCategoryData(data) {
    _categoryDDL = data;
    AdminGoodsDialogStore.emitChange();
}
function errorLoadCategoryData(xhr, status, err) {
    _categoryDDL = {
        "categories": []
    }
    AdminGoodsDialogStore.emitChange();
}

var AdminGoodsDialogStore = _.extend({}, EventEmitter.prototype, {
    loadData: function () {
        requestSender.get(errorLoadMeasureData, successLoadMeasureData, AdminURL.ADMIN_MEASURE_URL);
        requestSender.get(errorLoadCategoryData, successLoadCategoryData, AdminURL.ADMIN_CATEGORY_URL);
        requestSender.get(errorLoadCategoryData, successLoadPropertyData, AdminURL.ADMIN_PROPERTY_URL);
    },
    getMeasureDDL: function () {
        return _measuresDDL;
    },
    getCategoryDDL: function () {
        return _categoryDDL;
    },
    getAddingOrEditingGoods: function () {
        return _addingOrEditingGoods;
    },
    setAddingOrEditingGoods: function (goods, propertiesMap) {
        _addingOrEditingGoods = goods;
        _addingOrEditingGoodsPpropertiesMap = propertiesMap;
    },
    setIsNewGoods: function (isNewGoods) {
        _isNewGoods = isNewGoods;
    },
    getAddingOrEditingGoodsPpropertiesMap: function () {
        return _addingOrEditingGoodsPpropertiesMap;
    },
    getErrorMessagesName: function () {
        return _errorMessagesName;
    },
    getErrorMessagesPrice: function () {
        return _errorMessagesPrice;
    },
    getErrorMessagesQuantity: function () {
        return _errorMessagesQuantity;
    },
    getErrorMessagesDescription: function () {
        return _errorMessagesDescription;
    },
    getErrorMessagesCategory: function () {
        return _errorMessagesCategory;
    },
    clearStates: function () {
        _clearStates();
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
        case AdminGoodsConstants.ADMIN_GOODS_CLEAR_DIALOG_DATA:
            _clearStates();
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_NAME:
            _validateGoodsName(action.value);
            _addingOrEditingGoods.name = action.value;
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_PRICE:
            _validateGoodsPrice(action.value);
            _addingOrEditingGoods.price = action.value;
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_QUANTITY:
            _validateGoodsQuantity(action.value);
            _addingOrEditingGoods.quantity = action.value;
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_MEASUREMENT:
            _addingOrEditingGoods.measureId = action.value;
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_DESCRIPTION:
            _validateGoodsDescription(action.value);
            _addingOrEditingGoods.description = action.value;
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_CATEGORY:
            _validateGoodsCategory(action.value);
            _addingOrEditingGoodsPpropertiesMap = null;
            _addingOrEditingGoods.propertyValues = [];
            _addingOrEditingGoods.categoryId = action.value;
            let selectedCategory = GoodsUtils.getObjectById(_addingOrEditingGoods.categoryId, _categoryDDL.categories);
            if (selectedCategory.propertyIds.length > 0) {
                selectedCategory.propertyIds.forEach(function (propertyId, i) {
                    let property = GoodsUtils.getObjectById(propertyId, _propertyList.properties);
                    let blankPropertyValue = {"id": 0, "value": "", "propertyId": propertyId};
                    _addingOrEditingGoods.propertyValues.push(blankPropertyValue);
                    _addingOrEditingGoodsPpropertiesMap = {};
                    _addingOrEditingGoodsPpropertiesMap[propertyId] = property;
                });
            }
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_PROPERTY:
            GoodsUtils.getObjectById(action.propertyId, _addingOrEditingGoods.properties).propertyValue = action.value;
            AdminGoodsDialogStore.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_ADD_OR_UPDATE:
            _isAllDataValid = StoreConstants.VALID;
            _validateGoodsName(_addingOrEditingGoods.name);
            _validateGoodsPrice(_addingOrEditingGoods.price);
            _validateGoodsQuantity(_addingOrEditingGoods.quantity);
            _validateGoodsDescription(_addingOrEditingGoods.description);
            _validateGoodsCategory(_addingOrEditingGoods.categoryId);
            if (_isAllDataValid) {
                if (_isNewGoods) {
                    requestSender.post(errorPostData, successPostData, GOODS_URL, _addingOrEditingGoods);
                } else {
                    requestSender.put(errorPutData, successPutData, GOODS_URL, _addingOrEditingGoods);
                }
                _clearStates();
            }
            AdminGoodsDialogStore.emitChange();
            break;
    }
    return true;
});

module.exports = AdminGoodsDialogStore;
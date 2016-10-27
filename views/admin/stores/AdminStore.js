var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminGoodsStores = require('./AdminGoodsStore'),
    AdminCategoriesStore = require('./AdminCategoriesStore'),
    AdminMeasureStores = require('./AdminMeasureStore'),
    AdminPropertiesStores = require('./AdminPropertiesStore'),
    AdminConstants = require('../constants/AdminConstants'),

    StoreConstants = require("./StoreConstants");

var _viewType = AdminConstants.ADMIN_GOODS_TAB;
var _goodsList;
var _categoryList;
var _propertyList;
var _dropDownProperties = [
    {
        id: 1,
        name: "color",
        dataType: "text",
        measurement: ""
    },
    {
        id: 2,
        name: "mass",
        dataType: "number",
        measurement: "kg"
    },
    {
        id: 3,
        name: "flow",
        dataType: "number",
        measurement: "m3/s"
    },
    {
        id: 4,
        name: "current",
        dataType: "number",
        measurement: "A"
    }
];

var AdminStore = _.extend({}, EventEmitter.prototype, {
    getViewType: function () {
        return _viewType;
    },
    getGoodsList: function () {
        return _goodsList;
    },
    getCategoryList: function () {
        return _categoryList;
    },
    getPropertyList: function () {
        return _propertyList;
    },
    getDropDownProperties: function () {
        return _dropDownProperties;
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
        case AdminConstants.ADMIN_GOODS_TAB:
            _viewType = AdminConstants.ADMIN_GOODS_TAB;
            AdminGoodsStores.loadData();
            AdminStore.emitChange();
            break;
        case AdminConstants.ADMIN_CATEGORY_TAB:
            _viewType = AdminConstants.ADMIN_CATEGORY_TAB;
            AdminCategoriesStore.loadData();
            AdminStore.emitChange();
            break;
        case AdminConstants.ADMIN_PROPERTY_TAB:
            _viewType = AdminConstants.ADMIN_PROPERTY_TAB;
            AdminPropertiesStores.loadData();
            AdminStore.emitChange();
            break;
        case AdminConstants.ADMIN_MEASURE_TAB:
            _viewType = AdminConstants.ADMIN_MEASURE_TAB;
            AdminMeasureStores.loadData();
            AdminStore.emitChange();
            break;
    }
    return true;
});

module.exports = AdminStore;
var AdminDispatcher = require('../dispatcher/AdminDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),

    AdminGoodsConstants = require('../constants/AdminGoodsConstants'),
    AdminCategoriesStore = require('../stores/AdminCategoriesStore'),
    AdminGoodsDialogStore = require('../stores/AdminGoodsDialogStore'),
    AdminPropertiesStore = require('../stores/AdminPropertiesStore'),

    AdminURL = require('./../../../url/AdminURL'),
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
            "displayName": "IД",
            "style": {
                width: 80,
                padding: 0
            }
        },
        {
            "displayName": "КАТЕГОРIЯ",
            "style": {
                width: 120,
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
            "displayName": "ЦIНА",
            "style": {
                width: 80,
                padding: 0
            }
        },
        {
            "displayName": "КIЛЬК.",
            "style": {
                width: 80,
                padding: 0
            }
        }
    ],
    _goodsList = {
        "goods": [],
        "categoriesMap": {}
    },
    _addGoodsDialogOpen = StoreConstants.CLOSE,
    _editGoodsDialogOpen = StoreConstants.CLOSE,
    _selectedGoodsList = [];

function successLoadData(data) {
    _goodsList = data;
    AdminGoodsStores.emitChange();
}
function errorLoadData(xhr, status, err) {
    _goodsList = {
        goods: []
    };
    AdminGoodsStores.emitChange();
}
var AdminGoodsStores = _.extend({}, EventEmitter.prototype, {
    loadData: function () {
        requestSender.get(errorLoadData, successLoadData, AdminURL.ADMIN_GOODS_URL);
    },
    getColumnMetadata: function () {
        return _columnMetadata;
    },
    getGoodsList: function () {
        return _goodsList;
    },
    getSelectedGoodsList: function () {
        return _selectedGoodsList;
    },
    isAddGoodsDialogOpen: function () {
        return _addGoodsDialogOpen;
    },
    isEditGoodsDialogOpen: function () {
        return _editGoodsDialogOpen;
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
        case AdminGoodsConstants.ADMIN_GOODS_SELECT_FOR_DELETE:
            _selectedGoodsList = action.selectedRows;
            break;

        case AdminGoodsConstants.ADMIN_GOODS_DELETE_SELECTED:
            _selectedGoodsList.map(function (item) {
                for (var j = 0; j < _selectedGoodsList.length; j++) {
                    for (var i = _goodsList.goods.length - 1; i >= 0; i--) {
                        if (i == _selectedGoodsList[j]) _goodsList.goods.splice(i, 1);
                    }
                }
            })
            AdminGoodsStores.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_ADD_DIALOG_OPEN:
            AdminGoodsDialogStore.loadData();
            AdminGoodsDialogStore.setIsNewGoods(StoreConstants.NEW_ITEM);
            _addGoodsDialogOpen = StoreConstants.OPEN;
            AdminGoodsStores.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_ADD_DIALOG_CLOSE:
            AdminGoodsDialogStore.clearStates();
            _addGoodsDialogOpen = StoreConstants.CLOSE;
            AdminGoodsStores.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_EDIT_DIALOG_OPEN:
            AdminGoodsDialogStore.loadData();
            AdminGoodsDialogStore.setIsNewGoods(StoreConstants.EDITED_ITEM);
            var goods = _goodsList.goods[action.rowNumber];
            var propertiesMap = {};
            var selectedCategory = _goodsList.categoriesMap[goods.categoryId];
            if (selectedCategory.propertyIds.length > 0) {
                selectedCategory.propertyIds.forEach(function (propertyId, i) {
                    let property = _goodsList.categoriesMap[propertyId];
                    propertiesMap[propertyId] = property;
                });
            }
            AdminGoodsDialogStore.setAddingOrEditingGoods(goods, propertiesMap);
            _editGoodsDialogOpen = StoreConstants.OPEN;
            AdminGoodsStores.emitChange();
            break;

        case AdminGoodsConstants.ADMIN_GOODS_EDIT_DIALOG_CLOSE:
            _editGoodsDialogOpen = StoreConstants.CLOSE;
            AdminGoodsDialogStore.clearStates();
            AdminGoodsStores.emitChange();
            break;
    }
    return true;
});

module.exports = AdminGoodsStores;
var AdminDispatcher = require('../dispatcher/AdminDispatcher'),

    AdminGoodsConstants = require('../constants/AdminGoodsConstants');

var AdminGoodsActions = {
    openDialogAddNewGoods: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_ADD_DIALOG_OPEN
        });
    },
    closeDialogAddNewGoods: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_ADD_DIALOG_CLOSE
        });
    },
    openDialogEditGoods: function(rowNumber){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_EDIT_DIALOG_OPEN,
            rowNumber: rowNumber
        });
    },
    closeDialogEditGoods: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_EDIT_DIALOG_CLOSE
        });
    },
    clearDialogInfo: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_CLEAR_DIALOG_DATA
        });
    },
    storeDialogName: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_NAME,
            value: value
        });
    },
    storeDialogPrice: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_PRICE,
            value: value
        });
    },
    storeDialogQuantity: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_QUANTITY,
            value: value
        });
    },
    storeDialogMeasure: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_MEASUREMENT,
            value: value
        });
    },
    storeDialogDescription: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_DESCRIPTION,
            value: value
        });
    },

    storeDialogCategory: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_CATEGORY,
            value: value
        });
    },
    storeDialogProperty: function(value, propertyId){
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_STORE_DIALOG_PROPERTY,
            value: value,
            propertyId: propertyId
        });
    },
    saveOrUpdateGoodsData: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_ADD_OR_UPDATE
        });
    },
    selectGoodsForDelete: function (selectedRows) {
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_SELECT_FOR_DELETE,
            selectedRows: selectedRows
        });
    },
    deleteSelectedGoods: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminGoodsConstants.ADMIN_GOODS_DELETE_SELECTED
        });
    }
};

module.exports = AdminGoodsActions;
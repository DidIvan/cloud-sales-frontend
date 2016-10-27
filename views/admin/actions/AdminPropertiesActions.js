var AdminDispatcher = require('../dispatcher/AdminDispatcher'),

    AdminPropertiesConstants = require('../constants/AdminPropertiesConstants');

var AdminPropertiesActions = {
    openDialogAddNewProperties: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_ADD_DIALOG_OPEN
        });
    },
    closeDialogAddNewProperties: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_ADD_DIALOG_CLOSE
        });
    },
    closeDialogEditProperties: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_EDIT_DIALOG_CLOSE
        });
    },
    openDialogEditProperties: function(rowNumber){
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_EDIT_DIALOG_OPEN,
            rowNumber: rowNumber
        });
    },
    clearDialogInfo: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_CLEAR_DIALOG_DATA
        });
    },
    storeDialogName: function (value) {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_STORE_DIALOG_NAME,
            value: value
        });
    },
    storeDialogMeasurement: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_STORE_DIALOG_MEASUREMENT,
            value: value
        });
    },
    storeDialogType: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_STORE_DIALOG_TYPE,
            value: value
        });
    },
    saveOrUpdatePropertyData: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTY_ADD_OR_UPDATE,
        });
    },
    selectPropertiesForDelete: function (selectedRows) {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_SELECT_FOR_DELETE,
            selectedRows: selectedRows
        });
    },
    deleteSelectedProperties: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminPropertiesConstants.ADMIN_PROPERTIES_DELETE_SELECTED
        });
    }
};

module.exports = AdminPropertiesActions;
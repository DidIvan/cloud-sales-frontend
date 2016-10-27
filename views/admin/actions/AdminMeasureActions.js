var AdminDispatcher = require('../dispatcher/AdminDispatcher'),

    AdminMeasureConstants = require('../constants/AdminMeasureConstants');

var AdminMeasureActions = {
    openDialogAddNewMeasure: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_ADD_DIALOG_OPEN
        });
    },
    closeDialogAddNewMeasure: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_ADD_DIALOG_CLOSE
        });
    },
    openDialogEditMeasure: function(rowNumber){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_EDIT_DIALOG_OPEN,
            rowNumber: rowNumber
        });
    },
    closeDialogEditMeasure: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_EDIT_DIALOG_CLOSE
        });
    },
    clearDialogInfo: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_CLEAR_DIALOG_DATA
        });
    },
    storeDialogName: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_STORE_DIALOG_NAME,
            value: value
        });
    },
    storeDialogMeasure: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_STORE_DIALOG_MEASURE,
            value: value
        });
    },
    storeDialogType: function(value){
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_STORE_DIALOG_TYPE,
            value: value
        });
    },
    saveOrUpdateMeasureData: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_ADD_OR_UPDATE
        });
    },
    selectMeasureForDelete: function (selectedRows) {
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_SELECT_FOR_DELETE,
            selectedRows: selectedRows
        });
    },
    deleteSelectedMeasure: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminMeasureConstants.ADMIN_MEASURE_DELETE_SELECTED
        });
    }
};

module.exports = AdminMeasureActions;
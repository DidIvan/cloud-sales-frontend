var AdminDispatcher = require('../dispatcher/AdminDispatcher'),

    AdminCategoriesConstants = require('../constants/AdminCategoriesConstants');

var AdminCategoriesActions = {
    openDialogAddNewCategories: function () {
        {/*кнопка добавить категорию вспливающее модальное окно*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_ADD_DIALOG_OPEN
        });
    },
    closeDialogAddNewCategories: function () {
        {/*закрытие модального окна*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_ADD_DIALOG_CLOSE
        });
    },
    closeDialogEditCategories: function(){
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_EDIT_DIALOG_CLOSE
        });
    },
    openDialogEditCategories: function(rowNumber){
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_EDIT_DIALOG_OPEN,
            rowNumber: rowNumber
        });
    },
    clearDialogInfo: function () {
        {/*очистить содержимое модального окна*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_CLEAR_DIALOG_DATA
        });
    },
    storeDialogName: function (value) {
        {/*передача значения инпута* - название категорит*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_STORE_DIALOG_NAME,
            value: value
        });
    },
    storeDialogProperty: function(value){
        {/*выбор свойства в дропдауне*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_STORE_DIALOG_PROPERTY,
            value: value
        });
    },

    saveOrUpdateCategoryData: function () {
        {/*сохранить новую категорию*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORY_ADD_OR_UPDATE,
        });
    },
    selectCategoriesForDelete: function (selectedRows) {
        {/*checkbox выбор ряда таблицы для удаления*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_SELECT_FOR_DELETE,
            selectedRows: selectedRows
        });
    },
    deleteSelectedCategories: function () {
        {/*кнопка удалить категорию*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_DELETE_SELECTED
        });
    },
    deleteSelectedProperty: function (id) {
        {/*button delete selected property*/}
        AdminDispatcher.handleViewAction({
            actionType: AdminCategoriesConstants.ADMIN_CATEGORIES_DELETE_SELECTED_PROPERTY,
            value: id
        });
    }
};

module.exports = AdminCategoriesActions;
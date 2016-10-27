var AdminDispatcher = require('../dispatcher/AdminDispatcher'),

    AdminConstants = require('../constants/AdminConstants');

var AdminActions = {
    selectGoodsListView: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminConstants.ADMIN_GOODS_TAB
        });
    },
    selectCategoryListView: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminConstants.ADMIN_CATEGORY_TAB
        });
    },
    selectPropertyListView: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminConstants.ADMIN_PROPERTY_TAB
        });
    },
    selectMeasureListView: function () {
        AdminDispatcher.handleViewAction({
            actionType: AdminConstants.ADMIN_MEASURE_TAB
        });
    }

};

module.exports = AdminActions;
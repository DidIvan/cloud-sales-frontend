var AppDispatcher = require('../dispatcher/AppDispatcher'),
    GoodsConstants = require('../constants/GoodsConstant');

var GoodsActions = {
    selectGoodsDetailView: function (id) {
        AppDispatcher.handleAction({
            actionType: GoodsConstants.GOODS_DETAIL_VIEW,
            id: id
        });
    },
    selectGoodsListlView: function () {
        AppDispatcher.handleAction({
            actionType: GoodsConstants.GOODS_LIST_VIEW
        });
    }
};

module.exports = GoodsActions;
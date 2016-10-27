const GOODS_URL = "/rest/v1/goods ";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    GoodsConstants = require('../constants/GoodsConstant'),
    requestSender = require('./../utils/RequesSender'),
    GoodsUtils = require("./../utils/GoodsUtils"),
    AdminURL = require('./../../url/AdminURL'),
    _ = require('underscore');

const CHANGE_EVENT = 'change';

var _goodsList = {
        "goods": []
    },
    _goodsDetail = {
        "id": '1',
        "title": 'Pump',
        "picture": 'img/default/no_photo.png',
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur cum cumque' +
        ' deserunt enim exercitationem explicabo minima molestiae nam neque nisi perspiciatis praesentium,' +
        ' quae quos similique sint sit sunt tempore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur cum cumque' +
        ' deserunt enim exercitationem explicabo minima molestiae nam neque nisi perspiciatis praesentium,' +
        ' quae quos similique sint sit sunt tempore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur cum cumque' +
        ' deserunt enim exercitationem explicabo minima molestiae nam neque nisi perspiciatis praesentium,' +
        ' quae quos similique sint sit sunt tempore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur cum cumque' +
        ' deserunt enim exercitationem explicabo minima molestiae nam neque nisi perspiciatis praesentium,' +
        ' quae quos similique sint sit sunt tempore.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur cum cumque' +
        ' deserunt enim exercitationem explicabo minima molestiae nam neque nisi perspiciatis praesentium,' +
        ' quae quos similique sint sit sunt tempore.',
        "price": '150',
        "propertyValues": [
            {
                "id": '1',
                "name": "supply",
                "value": 220,
                "measureName": 'volts',
                "measureCon": 'VAC'
            }, {
                "id": '2',
                "name": "pressure",
                "value": 10,
                "measureName": 'bar',
                "measureCon": 'bar'
            }, {
                "id": '3',
                "name": "power",
                "value": 0.06,
                "measureName": 'Watt',
                "measureCon": 'kW'
            }
        ]
    },

/*    _goodsDetail = {},*/
    _viewType = GoodsConstants.GOODS_LIST_VIEW;

/*function setDetailGoods(id) {
 _.map(_goodsList.goods, function (item, key) {
 if (item.id == id) {
 _goodsDetail = item;
 }
 });
 }*/

function successLoadGoodsList(data) {
    _goodsList = data;
    _viewType = GoodsConstants.GOODS_LIST_VIEW;
    GoodsStore.emitChange();
}

function errorLoadGoodsList(xhr, status, err) {
    _goodsList = {
        goods: []
    };
}
function loadGoodsList() {
    requestSender.get(errorLoadGoodsList, successLoadGoodsList, AdminURL.ADMIN_GOODS_URL);
}

var GoodsStore = _.extend({}, EventEmitter.prototype, {
    loadData: function () {
        requestSender.get(errorLoadGoodsList, successLoadGoodsList, AdminURL.ADMIN_GOODS_URL);
    },
    getViewType: function () {
        return _viewType;
    },
    getGoodsList: function () {
        return _goodsList;
    },
    getGoodsDetail: function () {
        return _goodsDetail;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (payload) {

    var action = payload.action;
    switch (action.actionType) {
        case GoodsConstants.GOODS_LIST_VIEW:
            _viewType = GoodsConstants.GOODS_LIST_VIEW;
            //TODO add REST request
            GoodsStore.loadData();
            GoodsStore.emitChange();
            break;
        case GoodsConstants.GOODS_DETAIL_VIEW:
            _viewType = GoodsConstants.GOODS_DETAIL_VIEW;
        { /* _goodsDetail = GoodsUtils.getObjectById(action.id, _goodsList.goods);*/
        }

            GoodsStore.emitChange();
            break;
    }
    return true;
});

var server = new EventEmitter;
server.on('error', function (err) {

});
server.emit('error', new Error('Server fault'));


module.exports = GoodsStore;

const GOODS_URL = "/rest/v1/goods ";

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    GoodsConstants = require('../constants/GoodsConstant'),
    requestSender = require('./../utils/RequesSender'),
    GoodsUtils = require("./../utils/GoodsUtils"),
    AdminURL = require('./../../url/AdminURL'),
    _ = require('underscore');

const CHANGE_EVENT = 'change';

/*TODO request 
var _goodsList = {
        "goods": []
    },*/
var  _goodsList = {
        "goods": [
            {
                "id": 0,
                "name": "Kapowsin",
                "price": "7866",
                "quantity": 3,
                "measurementId": 1,
                "description": 'Description0',
                "categoryId": 1,
                "properties": [
                    {
                        "propertyId": 1,
                        "propertyValueId": 5
                    },
                    {
                        "propertyId": 2,
                        "propertyValueId": 6
                    }
                ]
            },
            {
                "id": 1,
                "name": "Kapowsin",
                "price": "6900",
                "quantity": 5,
                "measurementId": 2,
                "description": 'Description1',
                "categoryId": 1,
                "properties": [
                    {
                        "propertyId": 1,
                        "propertyValueId": 5
                    },
                    {
                        "propertyId": 2,
                        "propertyValueId": 6
                    }
                ]
            }, {
                "id": 2,
                "name": "Kapowsin",
                "price": "3580",
                "quantity": 7,
                "measurementId": 3,
                "description": 'Description2',
                "categoryId": 1,
                "properties": [
                    {
                        "propertyId": 1,
                        "propertyValueId": 5
                    },
                    {
                        "propertyId": 2,
                        "propertyValueId": 6
                    }
                ]
            }
        ],
        "categoriesMap": {
            "1": {
                id: 1,
                name: "Category1",
                propertiesId: [1, 3, 4]
            },
            "2": {
                id: 2,
                name: "Category2",
                propertiesId: [1, 2]
            },
            "3": {
                id: 3,
                name: "Category3",
                propertiesId: [2]
            },
            "4": {
                id: 4,
                name: "Category4",
                propertiesId: [1]
            }
        },
        "measuresMap": {
            "1": {
                "id": 1, "name": "Штуки", "abbreviation": "Шт"
            },
            "2": {
                "id": 2, "name": "Метри", "abbreviation": "м"
            },
            "3": {
                "id": 3, "name": "Літри", "abbreviation": "л"
            }
        },
        "propertiesMap": {
            "1": {
                "id": 1,
                "name": "Колір",
                "measurementId": 1,
                "useForFilter": true,
                "type": "TEXT",
                "unit": null,

            },
            "2": {
                "id": 2,
                "name": "Діаметр",
                "measurementId": 2,
                "useForFilter": true,
                "type": "INTEGER",
                "unit": "\""
            }
        },
        "propertyValueTypesMap": {
            "TEXT": "Text",
            "INTEGER": "Integer"
        },
        "propertiesValueMap": {
            "1": {
                "id": 1,
                "value": "Червоний",
                "type": "TEXT"
            },
            "2": {
                "id": 2,
                "value": "567",
                "type": "INTEGER"
            }
        }
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
         /*   GoodsStore.loadData();*/
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

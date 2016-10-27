/**
 * Created by opasichnyk on 3/25/2016.
 */
var React = require("react"),
    GoodsActions = require("../../../actions/GoodsActions"),
    GoodsStore = require('../../../stores/GoodsStore');

const DEFAULT_PICTURE1 = "img/default/nasos1.jpg";
const CURRENCY_UAH = "₴"; //Ukrainian hrivna

var pictureConverter1 = function (picture) {
    if (picture) {
        return picture;
    }
    return DEFAULT_PICTURE1;
}
var priceConverter = function (price, currency) {
    return (price / 100).toFixed(2) + currency;
}

var GoodsDetail = React.createClass({
    getInitialState: function () {
        return {
            data: GoodsStore.getGoodsDetail().propertyValues
        }
    },
    componentDidMount: function () {
        GoodsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        GoodsStore.removeChangeListener(this._onChange);
    },

    render() {
        var properties = this.state.data.map(function (item) {
                return (
                    <li>{item.name} : {item.value} {item.measureCon}</li>
                );
            }
        );
        return (
            <div className="goods-detail">
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">

                            <div className="title-detail">
                                <h5 className="truncate">{this.props.data.title}</h5>
                            </div>

                            <div className="row">
                                <div className="card-image left">
                                    <a href="#">
                                        <img src={pictureConverter1(this.props.data.picture)}/></a>
                                </div>
                                { /*  <a href="#" onClick={this._selectGoodsListView}> TODO.. back to GOODS list</a>*/}
                                <div className="description">
                                    {this.props.data.description}
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="rating">
                                </div>
                                { /* <a className="waves-effect waves-light btn right">Добавить отзыв</a>
                                 <a className="waves-effect waves-light btn right">Отложить</a>*/}
                                <a className="waves-effect waves-light btn green right">Заказать</a>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <div className="detail-property left">
                                    <h5>Характеристики</h5>
                                    <ul>{properties}</ul>
                                </div>
                                {/*<div className="detail-feedback left">Отзывы</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    },
    _selectGoodsListView: function () {
        GoodsActions.selectGoodsListlView();
    },
    _onChange: function () {
        this.setState({
            data: GoodsStore.getGoodsDetail().propertyValues
        });
    }
});

module.exports = GoodsDetail;
var React = require("react");
var GoodsActions = require("../../../actions/GoodsActions");
//var lang = require("middlewares/localization");

const DEFAULT_PICTURE = "img/default/no_photo.png";
const CURRENCY_UAH = "₴"; //Ukrainian hrivna

var pictureConverter = function (picture) {
    if (picture) {
        return picture;
    }
    return DEFAULT_PICTURE;
};
var priceConverter = function (price, currency) {
    return (price / 100).toFixed(2) + currency;
};

var GoodsPreview = React.createClass({
    render() {
        return (
            <div className="goods-item">
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel">

                                <div className="card-image left">
                                    <a href="#">
                                        <img src={pictureConverter(this.props.data.picture)}/></a>
                                </div>

                                <div className="">
                                    <div>
                                        <h5 className="truncate">{this.props.data.title}</h5>
                                    </div>

                                    <div className="description">
                                        {this.props.data.description}
                                    </div>
                                    <div className="to_detail">
                                        <a href="#" onClick={this._selectGoodsDetailView}>Детальнiше</a>
                                    </div>
                                </div>
                                <div className="price-label">{priceConverter(this.props.data.price, CURRENCY_UAH)}</div>

                        </div>
                    </div>
                </div>
            </div>

        );
    },
    _selectGoodsDetailView: function() {
        GoodsActions.selectGoodsDetailView(this.props.data.id);
    }
});

module.exports = GoodsPreview;
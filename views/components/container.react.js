var React = require("react"),
    Header = require("./header/header.react"),
    Footer = require("./footer/footer.react"),
    GoodsList = require("./content/goods/GoodsList.react"),
    GoodsDetail = require("./content/goods/GoodsDetail.react"),
    GoodsStore = require('../stores/GoodsStore'),
    GoodsConstants = require('../constants/GoodsConstant'),
    GoodsActions = require("../actions/GoodsActions");

var Container = React.createClass({
        getInitialState: function () {
            return {
                viewType: GoodsStore.getViewType(),
                goodsDetail: GoodsStore.getGoodsDetail()
            }
        },
        componentDidMount: function () {
            GoodsStore.addChangeListener(this._onChange);
            GoodsActions.selectGoodsListlView();

        },
        componentWillUnmount: function () {
            GoodsStore.removeChangeListener(this._onChange);
        },
        render: function () {
            var goodsView = '';
            switch (this.state.viewType) {
                case GoodsConstants.GOODS_DETAIL_VIEW :
                    goodsView = <GoodsDetail data={this.state.goodsDetail}/>;
                    break;
                case GoodsConstants.GOODS_LIST_VIEW :
                    goodsView = <GoodsList/>;
                    break;
            }
            
            return (
                <div>
                    <div className="container container1">
                        <Header/>
                        {goodsView}
                    </div>
                    <Footer/>
                </div>
            )
        },
        _onChange: function () {
            this.setState({
                viewType: GoodsStore.getViewType(),
                goodsDetail: GoodsStore.getGoodsDetail()
            });
        }
    })
    ;

module.exports = Container;
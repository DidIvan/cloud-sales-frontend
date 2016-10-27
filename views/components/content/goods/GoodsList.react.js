var React = require("react"),
    GoodsPreview = require("./GoodsPreview.react"),
    GoodsStore = require('../../../stores/GoodsStore');

var GoodsList = React.createClass({

    getInitialState: function () {
        return {
            data: GoodsStore.getGoodsList()
        }
    },
    componentDidMount: function () {
        GoodsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        GoodsStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <div className="goods-list">
                {this.state.data.goods.map(function (goods) {
                    return (
                        <div key={goods.id}>
                            <GoodsPreview data={goods}/>
                        </div>
                    );
                })}
            </div>
        );
    },
    _onChange: function () {
        this.setState({
            data: GoodsStore.getGoodsList()
        });
    }    
    
});

module.exports = GoodsList;
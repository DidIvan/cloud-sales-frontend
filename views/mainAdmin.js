var React = require('react'),
    ReactDOM = require('react-dom'),

    Router = require('react-router').Router,
    Route = require('react-router').Route,

    hashHistory = require('react-router').hashHistory,

    Container = require('./admin/container.react'),
    AdminGoodsTab = require("./admin/components/admin-goods/AdminGoodsTab.react"),
    AdminMeasureTab = require("./admin/components/admin-measure/AdminMeasureTab.react"),
    AdminCategoryTab = require("./admin/components/admin-categories/AdminCategoriesTab.react"),
    AdminPropertyTab = require("./admin/components/admin-properties/AdminPropertiesTab.react");

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

module.exports = function (data) {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={Container}>
                <Route path="goods" component={AdminGoodsTab}/>
                <Route path="categories" component={AdminMeasureTab}/>
                <Route path="properties" component={AdminCategoryTab}/>
                <Route path="measures" component={AdminPropertyTab}/>
            </Route>
        </Router>,
        document.getElementById('content')
    );
};

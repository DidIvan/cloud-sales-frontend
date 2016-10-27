var React = require("react"),

    ThemeManager = require('material-ui/lib/styles/theme-manager'),
    CustomTheme = require('./../themes/custom-theme'),
    Colors = require('material-ui/lib/styles/colors'),

    AdminStore = require("./stores/AdminStore"),
    AdminLoginStore = require("../admin/stores/AdminLoginStore"),
    AdminConstants = require("./constants/AdminConstants"),

    Header = require("./components/header.react"),
    AdminGoodsTab = require("./components/admin-goods/AdminGoodsTab.react"),
    AdminMeasureTab = require("./components/admin-measure/AdminMeasureTab.react"),
    AdminCategoryTab = require("./components/admin-categories/AdminCategoriesTab.react"),
    AdminPropertyTab = require("./components/admin-properties/AdminPropertiesTab.react"),

    AdminLogin = require("./components/admin-log-in/AdminLogin.react");

var Container = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    contextTypes: {
        muiTheme: React.PropTypes.object
    },
    componentWillMount () {
        let customTheme = this.state.muiTheme;
        customTheme.raisedButton.primaryColor = Colors.lightGreen500;
        this.setState({
            muiTheme: customTheme
        })
    },
    getChildContext () {
        return {
            muiTheme: this.state.muiTheme
        }
    },
    getInitialState: function () {
        return {
            viewType: AdminStore.getViewType(),
            muiTheme: ThemeManager.getMuiTheme(CustomTheme),
            isAuthorized: AdminLoginStore.isAuthorized()
        }
    },
    componentDidMount: function () {
        AdminStore.addChangeListener(this._onChange);
        AdminLoginStore.addChangeListener(this._onChangeAuthorized);

    },
    componentWillUnmount: function () {
        AdminStore.removeChangeListener(this._onChange);
        AdminLoginStore.removeChangeListener(this._onChangeAuthorized);
    },
    render: function () {
        var contentView = '';
        var generalContentView = '';
        switch (this.state.viewType) {
            case AdminConstants.ADMIN_GOODS_TAB :
                contentView = <AdminGoodsTab/>;
                break;
            case AdminConstants.ADMIN_CATEGORY_TAB :
                contentView = <AdminCategoryTab/>;
                break;
            case AdminConstants.ADMIN_PROPERTY_TAB :
                contentView = <AdminPropertyTab/>;
                break;
            case AdminConstants.ADMIN_MEASURE_TAB :
                contentView = <AdminMeasureTab/>;
                break;
        }

        /*if (!this.state.isAuthorized) {  */
        if (this.state.isAuthorized) {
            generalContentView = <AdminLogin/>
        } else {
            generalContentView =
                <div>
                    <Header/>
                    {contentView}
                </div>
        }
        return (
            <div>{generalContentView}</div>

        )
    },

    _onChange: function () {
        this.setState({
            viewType: AdminStore.getViewType()
        });
    },
    _onChangeAuthorized: function () {
        this.setState({
            isAuthorized: AdminLoginStore.isAuthorized()
        });
    }
});

module.exports = Container;
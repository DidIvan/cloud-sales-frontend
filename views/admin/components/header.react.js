var React = require("react"),

    Link = require('react-router').Link,

    AdminActions = require("../../admin/actions/AdminActions");

var Header = React.createClass({
    componentDidMount: function () {
        $(document).ready(function () {
            $(".button-collapse").sideNav();
        });
    },
    render: function () {
        return (
            <nav className="grey darken-3">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo main-logo" onClick={this._selectGoodsListView}><img
                        src="img/logo.png" className="valign"
                        alt="logo"/></a>
                    <a href="#" data-activates="slide-out" className="button-collapse"><i
                        className="material-icons">menu</i></a>
                    <ul id="slide-out" className="side-nav fixed">
                        <div className="side-header">
                            <h6>Консоль Адміністратора</h6>
                        </div>
                        <div className="no-padding">
                            <ul className="collapsible" data-collapsible="accordion">
                                <li>
                                    <Link to='/goods' className="collapsible-header"
                                          onClick={this._selectGoodsListView}><span>Товари</span><i
                                        className="material-icons">shopping_basket</i></Link>
                                </li>
                                <li>
                                    <Link to='/categories' className="collapsible-header"
                                          onClick={this._selectCategoryListView}><span>Категорії</span><i
                                        className="material-icons">view_module</i></Link>
                                </li>
                                <li>
                                    <Link to='/properties' className="collapsible-header"
                                          onClick={this._selectPropertyListView}><span>Характеристики</span><i
                                        className="material-icons">view_headline</i></Link>
                                </li>
                                { /* <li>
                                    <Link to='/measures' className="collapsible-header"
                                          onClick={this._selectMeasureListView}><span className="truncate">Од. вим.</span><i
                                        className="material-icons">settings_overscan</i></Link>
                                </li>*/}
                            </ul>
                        </div>
                    </ul>
                    <div className="header-right"></div>
                </div>
            </nav>
        )
    },
    _selectGoodsListView: function () {
        AdminActions.selectGoodsListView()
    },
    _selectCategoryListView: function () {
        AdminActions.selectCategoryListView()
    },
    _selectPropertyListView: function () {
        AdminActions.selectPropertyListView()
    },
    _selectMeasureListView: function () {
        AdminActions.selectMeasureListView()
    }
});

module.exports = Header;
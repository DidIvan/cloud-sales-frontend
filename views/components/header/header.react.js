var React = require("react"),
    GoodsActions = require("../../actions/GoodsActions");

var Header = React.createClass({
    componentDidMount: function () {
        $(document).ready(function () {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $(".button-collapse").sideNav();
        });
    },
    render: function () {
        return (

            <nav className="grey darken-3">
                <div className="container">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo main-logo" onClick={this._selectGoodsListView}><img src="img/logo.png" className="valign"
                                                                          alt="logo"/></a>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><i
                            className="material-icons">menu</i></a>

                        <ul className="side-nav" id="mobile-demo">
                            <div className="side-header grey darken-3"><a href="#" className="brand-logo"><img
                                src="img/logo.png"
                                className="valign"
                                alt="logo"/></a></div>
                        </ul>
                    </div>
                </div>
                <div className="header-right"></div>
            </nav>

        )
    },
    _selectGoodsListView: function() {
        GoodsActions.selectGoodsListlView();
    }
});

module.exports = Header;
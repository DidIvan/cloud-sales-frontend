var React = require("react");
var Footer = React.createClass({
    render: function () {
        return (
            <footer className="grey darken-3">
                <div className="container">
                    <div className="row">
                        <div className="content-footer-up">
                            <div className="logo-footer col l3 s12">
                                <a href="#" className="brand-logo"><img src="img/logo.png" alt="logo"/></a>
                            </div>

                            <div className="contacts-footer col l4 s12 right">
                                <h4>Контакти</h4>

                                <p>
                                    вул.Хрещатик, 1, м.Київ, 04114, Україна<br/>
                                    <a href="mailto:mail@lagoda.com.ua">mail@lagoda.com.ua</a><br/>
                                    тел.: +380 44 400-00-00<br/>
                                    факс: +380 44 400-00-01
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="copyright">
                        <div className="row">
                            <div className="col l5 m5 s12">
                                <p>© 2016 PP LAGODA. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
});
module.exports = Footer;
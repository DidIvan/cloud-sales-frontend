var React = require("react"),
    TextField = require('material-ui/lib/text-field'),
    MenuItem = require('material-ui/lib/menus/menu-item'),
    Link = require('react-router').Link;

var AdminLoginActions = require("../../actions/AdminLoginActions"),
    AdminLoginStore = require("../../stores/AdminLoginStore");

var AdminLogin = React.createClass({
    getInitialState: function () {
        return {
            userName: AdminLoginStore.getLoginData().name,
            password: AdminLoginStore.getLoginData().password,
            errorMessagesUsername: AdminLoginStore.getErrorMessagesUsername(),
            errorMessagesPassword: AdminLoginStore.getErrorMessagesPassword()
        }
    },
    componentDidMount: function () {
        AdminLoginStore.addChangeListener(this._onChangeLogin);
    },
    componentWillUnmount: function () {
        AdminLoginStore.removeChangeListener(this._onChangeLogin);
    },
    render: function () {
        return (
            <div className="wrapper">
                <form className="login-form" onSubmit={this._storeLoginSubmit}>
                    <div className="row">
                        <div className="input-field col s12 center">
                            <img src="img/logo.png" alt="logo" className="responsive-img valign profile-image-login"/>
                        </div>
                    </div>
                    <div className="row margin">
                        <div className="input-field inputHeight col s12">
                            <i className="material-icons prefix left">perm_identity</i>
                            <input id="username" type="text" value={this.state.userName}
                                   onChange={this._storeInputName} onBlur={this._storeInputName}/>
                            <label htmlFor="username" className="center-align">Username</label>
                            <div className="row margin">
                                <p className="errorMessage">{this.state.errorMessagesUsername}</p></div>
                        </div>
                    </div>
                    <div className="row margin">
                        <div className="input-field inputHeight col s12">
                            <i className="material-icons prefix">lock_outline</i>
                            <input id="password" type="password" value={this.state.password}
                                   onChange={this._storeInputPassword} onBlur={this._storeInputPassword}/>
                            <label htmlFor="password">Password</label>
                            <div className="row margin">
                                <p className="errorMessage">{this.state.errorMessagesPassword}</p></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m12 l12">
                            <input type="checkbox" id="remember-me"/>
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn waves-effect waves-light col s12" type="submit" name="action">
                                Login
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        )
    },
    _storeInputName: function (event) {
        AdminLoginActions.storeInputName(event.target.value);
    },
    _storeInputPassword: function (event) {
        AdminLoginActions.storeInputPassword(event.target.value);
    }
    ,
    _storeLoginSubmit: function (e) {
        e.preventDefault();
        AdminLoginActions.storeLoginSubmit();
    },
    _onChangeLogin: function () {
        this.setState({
            userName: AdminLoginStore.getLoginData().name,
            password: AdminLoginStore.getLoginData().password,
            errorMessagesUsername: AdminLoginStore.getErrorMessagesUsername(),
            errorMessagesPassword: AdminLoginStore.getErrorMessagesPassword()
        });
    }

});

module.exports = AdminLogin;
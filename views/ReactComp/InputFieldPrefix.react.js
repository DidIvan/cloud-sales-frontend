var React = require("react");


var InputFieldPrefix = React.createClass({
    render: function () {
        return (
            <div>
                <div className="row margin">
                    <div className="input-field inputHeight col s12">
                        <i className="material-icons prefix left">perm_identity</i>
                        <input id={this.props.id} type={this.props.type} value={this.props.value}
                               onChange={this.props.onChange} onBlur={this.props.onBlur}/>
                        <label htmlFor="username" className="center-align">Username</label>
                        <div className="row margin">
                            <p className="errorMessage">{this.props.errorMessage}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = InputFieldPrefix;
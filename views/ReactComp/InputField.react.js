var React = require("react");


var InputField = React.createClass({
    render: function () {
        return (
            <div>
                <div className={this.props.className}>
                    <input id={this.props.id} style={this.props.style}
                           type={this.props.type} value={this.props.value}
                           onChange={this.props.onChange} onBlur={this.props.onBlur}/>
                    <label htmlFor={this.props.id} className="center-align"
                           style={this.props.labelStyle}>{this.props.labelText}</label>
                    <div className="row margin">
                        <p className="errorMessage" style={this.props.errorStyle}>{this.props.errorMessage}</p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = InputField;
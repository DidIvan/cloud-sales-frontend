var React = require("react");
var AdminPropertiesActions = require('./../../views/admin/actions/AdminPropertiesActions');

var SelectField = React.createClass({
    componentDidMount: function () {
        $(document).ready(function () {
            $('select').material_select();
        });
    },
    render: function () {
        debugger;
        var items = this.props.items.map(function (item) {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>)
        });
        return (
            <div>
                <div className={this.props.className}>
                    <label style={this.props.labelStyle}>{this.props.labelText}</label>
                    <select
                        onChange={this.props.onChange}
                        value={this.props.value}
                        style={this.props.selectStyle}
                    >
                        {items}
                    </select>
                    <div className="row">
                        <p className="errorMessage" style={this.props.errorStyle}>{this.props.errorMessage}</p>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = SelectField;
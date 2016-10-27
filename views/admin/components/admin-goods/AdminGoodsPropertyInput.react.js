/**
 * Created by olegls2000 on 5/10/2016.
 */
var React = require("react"),

    TextField = require('material-ui/lib/text-field'),

    AdminGoodsActions = require("./../../actions/AdminGoodsActions"),
    AdminGoodsStore = require('./../../stores/AdminGoodsStore'),

    GoodsUtils = require("./../../../utils/GoodsUtils");

var PropertyInput = React.createClass({
    getInitialState: function () {
        let inputType = '';
        switch (this.props.dataType) {
            case 'TEXT':
                inputType = 'text';
                break;
            case 'INTEGER':
                inputType = 'number';
                break;
        }
        return ({
            value: this.props.propertyValue,
            errorMessage: '',
            inputType: inputType

        });
    },
    componentDidMount: function () {
        AdminGoodsStore.addChangeListener(this._onChangeProperty);
    },
    componentWillUnmount: function () {
        AdminGoodsStore.removeChangeListener(this._onChangeProperty);
    },
    getInputType: function () {

    },
    render: function () {
        return (
            <div>
                <div style={{"width" : "35%",
                    'margin-top' : '40px',
                    'margin-left': '50px',
                    'float': 'left'}}>
                    {this.props.name}
                </div>
                <div style={{"width" : "20%",
                    'margin-top' : '40px',
                    'margin-left': '20px',
                    'float': 'left' }}>
                    {this.props.measurement}
                </div>
                <TextField
                    value={this.state.value}
                    onChange={this._storeDialogProperty}
                    errorText={this.state.errorMessage}
                    type={this.state.inputType}
                    hintText="Значення ..."
                    floatingLabelText="Значення"
                    multiLine={false}
                    fullWidth={true}
                    style={{ 'margin-left': '20px', 'width': '25%'}}/>
            </div>
        )
    },
    _storeDialogProperty: function (event) {
        AdminGoodsActions.storeDialogProperty(event.target.value, this.props.propertyId);
    },
    _onChangeProperty: function () {
        this.setState({
            value: this.props.propertyValue
        });
    }
});

module.exports = PropertyInput;
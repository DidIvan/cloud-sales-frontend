var React = require("react"),
    InputField = require('../../../ReactComp/InputField.react'),
    SelectField = require('../../../ReactComp/SelectField.react'),

    AdminMeasureStore = require('./../../stores/AdminMeasureStore'),
    AdminMeasureActions = require("./../../actions/AdminMeasureActions");

var AdminMeasureDialogContent = React.createClass({
    getInitialState: function () {
        return ({
            measureName: AdminMeasureStore.getAddingOrEditingMeasure().name,           
            measureList: AdminMeasureStore.getMeasureList().measures,

            selectedMeasurementItems: AdminMeasureStore.getAddingOrEditingMeasure().abbreviation,
            errorMessagesName: AdminMeasureStore.getErrorMessagesName(),
            errorMessagesShortName: AdminMeasureStore.getErrorMessagesShortName()
        });
    },
    componentDidMount: function () {
        AdminMeasureStore.addChangeListener(this._onChangeDialog);
    },
    componentWillUnmount: function () {
        AdminMeasureStore.removeChangeListener(this._onChangeDialog);
    },
    render: function () {
        return (
            <div className="row">
                <InputField id="measureName"/*id necessary for using label with input*/
                            className="input-field inputHeight col s12"
                            type="text"
                            value={this.state.measureName}
                            onChange={this._storeDialogName}
                            onBlur={this._storeDialogName}
                            labelText="Назва одиниці вимірювання"
                            labelStyle={{color: '#9e9e9e'}}
                            errorMessage={this.state.errorMessagesName}
                />
                <InputField id="propertyName"
                            className="input-field inputHeight col s12"
                            type="text"
                            value={this.state.selectedMeasurementItems}
                            onChange={this._storeDialogMeasurement}
                            onBlur={this._storeDialogMeasurement}
                            labelText="Скорочене позначення"
                            labelStyle={{color: '#9e9e9e'}}
                            errorMessage={this.state.errorMessagesShortName}
                />
            </div>
        )
    },
    _storeDialogName: function (event) {
        AdminMeasureActions.storeDialogName(event.target.value);
    },
    _storeDialogMeasurement: function (event) {
        AdminMeasureActions.storeDialogMeasure(event.target.value);
    },
    _onChangeDialog: function () {
        this.setState({
            measureName:AdminMeasureStore.getAddingOrEditingMeasure().name,
            selectedMeasurementItems: AdminMeasureStore.getAddingOrEditingMeasure().abbreviation,
          //  measurmentDropDownList: AdminMeasureStore.getMeasurementDropDownList(),            
            
            errorMessagesName: AdminMeasureStore.getErrorMessagesName(),
            errorMessagesShortName: AdminMeasureStore.getErrorMessagesShortName(),
        });
    }
});

module.exports = AdminMeasureDialogContent;

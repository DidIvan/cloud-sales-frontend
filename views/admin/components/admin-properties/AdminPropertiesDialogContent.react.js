var React = require("react"),
    InputField = require('../../../ReactComp/InputField.react'),
    SelectField = require('../../../ReactComp/SelectField.react'),

    AdminStore = require('./../../stores/AdminStore'),
    AdminPropertiesStore = require('./../../stores/AdminPropertiesStore'),
    AdminPropertiesActions = require('./../../actions/AdminPropertiesActions');

var AdminPropertiesDialogContent = React.createClass({
    getInitialState: function () {
        return ({
            measurementList: AdminPropertiesStore.getMeasurementList().measures,
            dataTypeList: AdminPropertiesStore.getDataTypeList(),
            propertyName: AdminPropertiesStore.getAddingOrEditingProperties().name,
            selectedMeasurementItems: AdminPropertiesStore.getAddingOrEditingProperties().measureId,
            selectedDataTypeItems: AdminPropertiesStore.getAddingOrEditingProperties().valueType,

            errorMessagesName: AdminPropertiesStore.getErrorMessagesName(),
            errorMessagesMeasurement: AdminPropertiesStore.getErrorMessagesMeasurement(),
            errorMessagesDataType: AdminPropertiesStore.getErrorMessagesDataType()
        });
    },
    componentDidMount: function () {
        AdminPropertiesStore.addChangeListener(this._onChangeDialog);
    },
    componentWillUnmount: function () {
        AdminPropertiesStore.removeChangeListener(this._onChangeDialog);
    },
    getDataTypeItems: function (name) {
        let result = '-';
        switch (name) {
            case 'TEXT':
                result = 'Текст';
                break;
            case 'INTEGER':
                result = 'Цiле число';
                break;
            case 'FLOAT':
                result = 'Дрiбне число';
                break;
        }
        return result;
    },

    render: function () {
        var getDataTypeItems = function (name) {
            let result = '-';
            switch (name) {
                case 'TEXT':
                    result = 'Текст';
                    break;
                case 'INTEGER':
                    result = 'Цiле число';
                    break;
                case 'FLOAT':
                    result = 'Дрiбне число';
                    break;
            }
            return result;
        };

        return (
            <div className="row">
                <InputField id="propertyName"/*id necessary for using label with input*/
                            className="input-field inputHeight col s12"
                            type="text"
                            value={this.state.propertyName}
                            onChange={this._storeDialogName}
                            onBlur={this._storeDialogName}
                            labelText="Назва характеристики"
                            labelStyle={{color: '#9e9e9e'}}
                            errorMessage={this.state.errorMessagesName}
                />

                <SelectField className="col s12"
                             value={this.state.selectedMeasurementItems}
                             onChange={this._storeDialogMeasurement}
                             labelText="Одиниці вимірювання"
                             errorMessage={this.state.errorMessagesMeasurement}
                             errorStyle={{color: 'red'}}
                             labelStyle={{}}
                             items={this.state.measurementList}
                >
                </SelectField>

                <SelectField className="col s12"
                             value={this.state.selectedDataTypeItems}
                             onChange={this._storeDialogType}
                             labelText="Тип данних"
                             errorMessage={this.state.errorMessagesDataType}
                             errorStyle={{color: 'red'}}
                             labelStyle={{}}
                             items={this.state.dataTypeList}
                >
                </SelectField>

            </div>
        )
    },
    _storeDialogName: function (event) {
        AdminPropertiesActions.storeDialogName(event.target.value);
    },
    _storeDialogMeasurement: function (event) {
        debugger;
        AdminPropertiesActions.storeDialogMeasurement(event.target.value);
    },
    _storeDialogType: function (event) {
        AdminPropertiesActions.storeDialogType(event.target.value);
    },
    _onChangeDialog: function () {
        this.setState({
            propertyName: AdminPropertiesStore.getAddingOrEditingProperties().name,
            selectedMeasurementItems: AdminPropertiesStore.getAddingOrEditingProperties().measureId,
            selectedDataTypeItems: AdminPropertiesStore.getAddingOrEditingProperties().valueType,

            errorMessagesName: AdminPropertiesStore.getErrorMessagesName(),
            errorMessagesMeasurement: AdminPropertiesStore.getErrorMessagesMeasurement(),
            errorMessagesDataType: AdminPropertiesStore.getErrorMessagesDataType()
        });
    }
})

module.exports = AdminPropertiesDialogContent;

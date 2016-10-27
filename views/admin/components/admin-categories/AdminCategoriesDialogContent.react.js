var React = require("react"),

    InputField = require('../../../ReactComp/InputField.react'),
    SelectField = require('../../../ReactComp/SelectField.react'),

    CategoryProperty = require("./AdminCategoriesProperty.react"),
    AdminCategoriesStore = require('./../../stores/AdminCategoriesStore'),
    AdminCategoriesActions = require('./../../actions/AdminCategoriesActions');

var AdminCategoriesDialogContent = React.createClass({
    getInitialState: function () {
        return {
            dropDownCategories: AdminCategoriesStore.getCategoryList().categories,
            dropDownProperties: AdminCategoriesStore.getDropDownProperties(),
            selectedProperties: AdminCategoriesStore.getSelectedProperties(),

            selectedPropertiesItem: AdminCategoriesStore.getAddingOrEditingCategories().propertyIds,
            categoryName: AdminCategoriesStore.getAddingOrEditingCategories().name,
            errorMessagesName: AdminCategoriesStore.getErrorMessagesName(),
            errorMessagesProperty: AdminCategoriesStore.getErrorMessagesProperty()
        }
    },
    componentDidMount: function () {
        AdminCategoriesStore.addChangeListener(this._onChangeDialog);
    },
    componentWillUnmount: function () {
        AdminCategoriesStore.removeChangeListener(this._onChangeDialog);
    },
    render: function () {
        return (
            <div className="row">
                <InputField id="categoryName"/*id necessary for using label with input*/
                            className="input-field col s12"
                            type="text"
                            value={this.state.categoryName}
                            onChange={this._storeDialogName}
                            onBlur={this._storeDialogName}
                            labelText="Назва категорії"
                            labelStyle={{color: '#9e9e9e'}}
                            errorMessage={this.state.errorMessagesName}
                />
                {/*   <div className="col s12">
                    {selectedProperties}
                </div>*/}
                <SelectField className="col s12"
                             value={this.state.selectedPropertiesItem}
                             onChange={this._storeDialogProperty}
                             labelText="Вибiр характеристики..."
                             errorMessage={this.state.errorMessagesMeasurement}
                             labelStyle={{}}
                             items={this.state.dropDownProperties}
                >
                </SelectField>
            </div>
        )
    },
    _storeDialogName: function (event) {
        AdminCategoriesActions.storeDialogName(event.target.value);
    },
    _storeDialogProperty: function (event) {
        AdminCategoriesActions.storeDialogProperty(event.target.value);
    },
    _onChangeDialog: function () {
        this.setState({
            selectedPropertiesItem: AdminCategoriesStore.getAddingOrEditingCategories().propertyIds,
            selectedProperties: AdminCategoriesStore.getSelectedProperties(),
            dropDownProperties: AdminCategoriesStore.getDropDownProperties(),
            categoryName: AdminCategoriesStore.getAddingOrEditingCategories().name,
            errorMessagesName: AdminCategoriesStore.getErrorMessagesName(),
            errorMessagesProperty: AdminCategoriesStore.getErrorMessagesProperty()
        });
    }
});

module.exports = AdminCategoriesDialogContent;
var React = require("react"),

    InputField = require('../../../ReactComp/InputField.react'),
    SelectField = require('../../../ReactComp/SelectField.react'),
    Textarea = require('../../../ReactComp/TextArea'),


    AdminCategoriesStore = require('./../../stores/AdminCategoriesStore'),
    AdminGoodsStore = require('./../../stores/AdminGoodsStore'),
    AdminGoodsDialogStore = require('./../../stores/AdminGoodsDialogStore'),
    AdminPropertiesStore = require('./../../stores/AdminPropertiesStore'),
    AdminMeasureStores = require('./../../stores/AdminMeasureStore'),
    AdminGoodsActions = require("./../../actions/AdminGoodsActions"),

    AdminGoodsPropertyInput = require("./AdminGoodsPropertyInput.react"),
    GoodsUtils = require("./../../../utils/GoodsUtils");


var AdminGoodsDialogContent = React.createClass({

    getInitialState: function () {
        return ({
            goodsName: AdminGoodsDialogStore.getAddingOrEditingGoods().title,
            goodsPrice: AdminGoodsDialogStore.getAddingOrEditingGoods().price,
            goodsQuantity: AdminGoodsDialogStore.getAddingOrEditingGoods().quantity,
            selectedMeasureId: AdminGoodsDialogStore.getAddingOrEditingGoods().measureId,
            selectedCategoryId: AdminGoodsDialogStore.getAddingOrEditingGoods().categoryId,
            goodsDescription: AdminGoodsDialogStore.getAddingOrEditingGoods().description,
            propertyValueObjects: AdminGoodsDialogStore.getAddingOrEditingGoods().propertyValues,

            measureList: AdminGoodsDialogStore.getMeasureDDL().measures,
            categoryList: AdminGoodsDialogStore.getCategoryDDL().categories,

            errorMessagesName: AdminGoodsDialogStore.getErrorMessagesName(),
            errorMessagesPrice: AdminGoodsDialogStore.getErrorMessagesPrice(),
            errorMessagesQuantity: AdminGoodsDialogStore.getErrorMessagesQuantity(),
            errorMessagesDescription: AdminGoodsDialogStore.getErrorMessagesDescription(),
            errorMessagesCategory: AdminGoodsDialogStore.getErrorMessagesCategory()
        });
    },
    componentDidMount: function () {
        AdminGoodsDialogStore.addChangeListener(this._onChangeDialog);
    },

    componentWillUnmount: function () {
        AdminGoodsDialogStore.removeChangeListener(this._onChangeDialog);
    },

    render: function () {

        var propertyValueFromStore = AdminGoodsDialogStore.getAddingOrEditingGoods().propertyValues;
        var addingOrEditingGoodsPpropertiesMap = AdminGoodsDialogStore.getAddingOrEditingGoodsPpropertiesMap();

        var propertiesInput = propertyValueFromStore.map(function (propertyValueObject) {
            if (addingOrEditingGoodsPpropertiesMap) {
                var property = addingOrEditingGoodsPpropertiesMap[propertyValueObject.propertyId];
                var measureName = '';
                if (property && property.measureId) {
                    let propertyMeasure = AdminGoodsStore.getGoodsList().measuresMap[property.measureId];
                    measureName = propertyMeasure.name;
                }

                var propertyValue = '';
                AdminGoodsDialogStore.getAddingOrEditingGoods().propertyValues.forEach(function (propertyValueObject, i) {
                    if (propertyValueObject.propertyId == property.id) {
                        propertyValue = propertyValueObject.value;
                    }
                });

                return <AdminGoodsPropertyInput name={property.name}
                                                measureName={measureName}
                                                dataType={property.type}
                                                propertyId={property.id}
                                                propertyValueId={propertyValue}/>
            }
        })
        return (
            <div className="row">
                <InputField id="goodName"/*id necessary for using label with input*/
                            className="input-field inputHeight col s12"
                            type="text"
                            value={this.state.goodsName}
                            onChange={this._storeDialogName}
                            onBlur={this._storeDialogName}
                            labelText="Назва товару"
                            labelStyle={{color: '#9e9e9e'}}
                            errorMessage={this.state.errorMessagesName}
                            errorStyle={{}}
                />
                    <InputField id="goodsPrice"/*id necessary for using label with input*/
                                className="input-field inputHeight col s4"
                                type="text"
                                value={this.state.goodsPrice}
                                onChange={this._storeDialogPrice}
                                onBlur={this._storeDialogPrice}
                                labelText="Цiна"
                                labelStyle={{color: '#9e9e9e'}}
                                errorMessage={this.state.errorMessagesPrice}
                                errorStyle={{}}
                    />
                    <InputField id="goodsQuantity"/*id necessary for using label with input*/
                                className="input-field inputHeight col s4"
                                type="number"
                                value={this.state.goodsQuantity}
                                onChange={this._storeDialogQuantity}
                                onBlur={this._storeDialogQuantity}
                                labelText="Кiлькiсть"
                                labelStyle={{color: '#9e9e9e'}}
                                errorMessage={this.state.errorMessagesQuantity}
                                errorStyle={{}}
                    />
                    <SelectField className="col s4"
                                 value={this.state.selectedMeasureId}
                                 onChange={this._storeDialogMeasure}
                                 labelText="Од. вим."
                                 errorStyle={{}}
                                 labelStyle={{}}
                                 selectStyle={{height: 'inherit'}}
                                 items={this.state.measureList}

                    >
                    </SelectField>
                
                <Textarea id="goodsDescription"/*id necessary for using label with input*/
                          className="input-field col s12"
                          maxlength="120"
                          value={this.state.goodsDescription}
                          onChange={this._storeDialogDescription}
                          onBlur={this._storeDialogDescription}
                          labelText="Опис товару"
                          labelStyle={{color: '#9e9e9e'}}
                          errorMessage={this.state.errorMessagesDescription}
                          errorStyle={{}}
                />
                <SelectField className="col s12"
                             value={this.state.selectedCategoryId}
                             onChange={this._storeDialogCategory}
                             labelText="Категорiя"
                             errorStyle={{}}
                             labelStyle={{}}
                             items={this.state.categoryList}
                >
                </SelectField>
                {propertiesInput}

            </div>
        )
    },

    _storeDialogName: function (event) {
        AdminGoodsActions.storeDialogName(event.target.value);
    },
    _storeDialogPrice: function (event) {
        AdminGoodsActions.storeDialogPrice(event.target.value);
    },
    _storeDialogQuantity: function (event) {
        AdminGoodsActions.storeDialogQuantity(event.target.value);
    },
    _storeDialogMeasure: function (event, index, value) {
        AdminGoodsActions.storeDialogMeasure(value);
    },
    _storeDialogDescription: function (event) {
        AdminGoodsActions.storeDialogDescription(event.target.value);
    },
    _storeDialogCategory: function (event, index, value) {
        AdminGoodsActions.storeDialogCategory(value);
        this.setState({selectedCategoryId: value});
        var selectedCategory = GoodsUtils.getObjectById(value, this.state.categoryList);
        var tempPropertiesObjects = [];
        selectedCategory.propertyIds.forEach(function (propertyId, i, propertiesIdArray) {
            tempPropertiesObjects.push(GoodsUtils.getObjectById(propertyId, AdminPropertiesStore.getPropertyList()));
        });
        this.setState({propertyValueObjects: tempPropertiesObjects});
    },
    _onChangeDialog: function () {
        this.setState({
            goodsName: AdminGoodsDialogStore.getAddingOrEditingGoods().name,
            goodsPrice: AdminGoodsDialogStore.getAddingOrEditingGoods().price,
            goodsQuantity: AdminGoodsDialogStore.getAddingOrEditingGoods().quantity,
            selectedMeasureId: AdminGoodsDialogStore.getAddingOrEditingGoods().measureId,
            selectedCategoryId: AdminGoodsDialogStore.getAddingOrEditingGoods().categoryId,
            goodsDescription: AdminGoodsDialogStore.getAddingOrEditingGoods().description,
            propertyValueObjects: AdminGoodsDialogStore.getAddingOrEditingGoods().properties,

            measureList: AdminGoodsDialogStore.getMeasureDDL().measures,
            categoryList: AdminGoodsDialogStore.getCategoryDDL().categories,

            errorMessagesName: AdminGoodsDialogStore.getErrorMessagesName(),
            errorMessagesPrice: AdminGoodsDialogStore.getErrorMessagesPrice(),
            errorMessagesQuantity: AdminGoodsDialogStore.getErrorMessagesQuantity(),
            errorMessagesDescription: AdminGoodsDialogStore.getErrorMessagesDescription(),
            errorMessagesCategory: AdminGoodsDialogStore.getErrorMessagesCategory()
        });
    }
});

module.exports = AdminGoodsDialogContent;
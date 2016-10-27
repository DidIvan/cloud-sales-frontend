var React = require("react"),

    ContentAdd = require('material-ui/lib/svg-icons/content/add'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    ActionDelete = require('material-ui/lib/svg-icons/action/delete'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),
    FlatButton = require('material-ui/lib/flat-button'),

    ModalWindow = require('../../../ReactComp/ModalWindow.react'),

    AdminCategoriesActions = require("./../../actions/AdminCategoriesActions"),
    AdminCategoriesStore = require("./../../stores/AdminCategoriesStore"),
    AdminCategoriesTable = require("./../../components/admin-categories/AdminCategoriesTable.react"),
    AdminCategoriesDialogContent = require("./AdminCategoriesDialogContent.react");


var AdminCategoryList = React.createClass({
        getInitialState: function () {
            return ({
                addCategoriesDialogOpen: AdminCategoriesStore.isAddCategoriesDialogOpen()
            });
        },
        componentDidMount: function () {
            AdminCategoriesStore.addChangeListener(this._onChange);

        },
        componentWillUnmount: function () {
            AdminCategoriesStore.removeChangeListener(this._onChange);
        },
        render: function () {
            const dialogActions = [
                <FlatButton label="Очистити"
                            onTouchTap={this._onClearDialogInfo}/>,
                <RaisedButton label="Зберегти"
                              primary={true}
                              onTouchTap={this._saveOrUpdate}
                              labelPosition="after"
                              icon={<ContentSave/>}
                              style={{'margin': '20'}}/>
            ]
            return (
                <div className="admin-content">
                    <div className="row">
                        <form className="col s12" action="#">
                            <div className="row row-head">
                                <h4>Список категорій</h4>
                            </div>
                            
                            <div className="row rowForButtons">
                                <a className="waves-effect waves-light btn modal-trigger" href="#modal1"
                                   onClick={this._openAddNewCategoriesDialog}>Додати категорію</a>
                                <a className="waves-effect waves-light btn modal-trigger" href="#modal1"
                                   onClick={this._deleteSelectedCategories}>Видалити категорію</a>
                            </div>
                            
                            <div className="divider"></div>

                            <div className="row">
                                <AdminCategoriesTable/>
                            </div>
                            <ModalWindow
                                title="Нова категорія"
                                content={<AdminCategoriesDialogContent/>}
                                buttonSave={this._saveOrUpdate}
                                buttonClear={this._onClearDialogInfo}
                                onRequestClose={this._closeAddNewCategoriesDialog}
                            >
                            </ModalWindow>
                        </form>
                    </div>
                </div>
            )
        },
        _deleteSelectedCategories: function () {
            AdminCategoriesActions.deleteSelectedCategories();
        },
        _openAddNewCategoriesDialog: function () {
            AdminCategoriesActions.openDialogAddNewCategories();
        },
        _closeAddNewCategoriesDialog: function () {
            AdminCategoriesActions.closeDialogAddNewCategories();
        },
        _saveOrUpdate: function () {
            AdminCategoriesActions.saveOrUpdateCategoryData();
        },
        _onClearDialogInfo: function () {
            AdminCategoriesActions.clearDialogInfo();
        },
        _onChange: function () {
            this.setState({
                addCategoriesDialogOpen: AdminCategoriesStore.isAddCategoriesDialogOpen()
            });
        }
    }
);
module.exports = AdminCategoryList;
var React = require("react"),

    ContentAdd = require('material-ui/lib/svg-icons/content/add'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    ActionDelete = require('material-ui/lib/svg-icons/action/delete'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),
    FlatButton = require('material-ui/lib/flat-button'),

    AdminPropertiesActions = require("./../../actions/AdminPropertiesActions"),
    AdminPropertiesStore = require("./../../stores/AdminPropertiesStore"),
    AdminPropertiesTable = require("./../admin-properties/AdminPropertiesTable.react"),
    AdminPropertiesDialogContent = require("./AdminPropertiesDialogContent.react");

var AdminPropertyList = React.createClass({
        getInitialState: function () {
            return ({
                addPropertiesDialogOpen: AdminPropertiesStore.isAddPropertiesDialogOpen()
            });
        },
        componentDidMount: function () {
            AdminPropertiesStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
            AdminPropertiesStore.removeChangeListener(this._onChange);
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
                                <h4>Список характеристик</h4>
                            </div>
                            <div className="row rowForButtons">
                                <RaisedButton
                                    label="Додати характеристику"
                                    onTouchTap={this._openAddNewPropertiesDialog}
                                    labelPosition="after"
                                    primary={true}
                                    icon={<ContentAdd/>}
                                    style={{'margin': '20'}}/>
                                <FlatButton
                                    label="Видалити характеристику"
                                    labelPosition="after"
                                    primary={true}
                                    style={{'margin': '20'}}
                                    icon={<ActionDelete />}
                                    onTouchTap={this._deleteSelectedProperties}/>
                            </div>
                            <div className="divider"></div>
                            <div className="row">
                                <AdminPropertiesTable/>
                            </div>
                            <Dialog
                                title="Нова характеристика"
                                actions={dialogActions}
                                modal={false}
                                open={this.state.addPropertiesDialogOpen}
                                onRequestClose={this._closeAddNewPropertiesDialog}
                                autoScrollBodyContent={true}
                                autoDetectWindowHeight={true}>
                                <AdminPropertiesDialogContent/>
                            </Dialog>
                        </form>
                    </div>
                </div>
            )
        },
        _deleteSelectedProperties: function () {
            AdminPropertiesActions.deleteSelectedProperties();
        },
        _openAddNewPropertiesDialog: function () {
            AdminPropertiesActions.openDialogAddNewProperties();
        },
        _closeAddNewPropertiesDialog: function () {
            AdminPropertiesActions.closeDialogAddNewProperties();
        },
        _saveOrUpdate: function () {
            AdminPropertiesActions.saveOrUpdatePropertyData();
        },
        _onClearDialogInfo: function () {
            AdminPropertiesActions.clearDialogInfo();
        },
        _onChange: function () {
            this.setState({
                addPropertiesDialogOpen: AdminPropertiesStore.isAddPropertiesDialogOpen()
            });
        }
    }
);
module.exports = AdminPropertyList;
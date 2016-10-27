var React = require("react"),

    ContentAdd = require('material-ui/lib/svg-icons/content/add'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    ActionDelete = require('material-ui/lib/svg-icons/action/delete'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),
    FlatButton = require('material-ui/lib/flat-button'),

    AdminMeasureTable = require("./../admin-measure/AdminMeasureTable.react"),
    AdminMeasureDialogContent = require("./AdminMeasureDialogContent.react"),

    AdminMeasureStore = require("./../../stores/AdminMeasureStore"),
    AdminMeasureActions = require("./../../actions/AdminMeasureActions");

var AdminMeasureList = React.createClass({
    getInitialState: function () {
        return ({
            addMeasureDialogOpen: AdminMeasureStore.isAddMeasureDialogOpen()
        });
    },
    componentDidMount: function () {
        AdminMeasureStore.addChangeListener(this._onChange);

    },
    componentWillUnmount: function () {
        AdminMeasureStore.removeChangeListener(this._onChange);
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
                            <h4>Список одиниць вимірювання</h4>
                        </div>
                        <RaisedButton
                            label="Додати одиницю вимірювання"
                            onTouchTap={this._openAddNewMeasureDialog}
                            labelPosition="after"
                            primary={true}
                            icon={<ContentAdd/>}
                            style={{'margin': '20'}}/>
                        <FlatButton
                            label="Видалити одиницю вимірювання"
                            labelPosition="after"
                            primary={true}
                            style={{'margin': '20'}}
                            icon={<ActionDelete />}
                            onTouchTap={this._deleteSelectedMeasure}/>
                        <div className="divider"/>
                        <div className="row">
                            <AdminMeasureTable/>
                        </div>
                        <Dialog
                            title="Нова одиниця вимірювання"
                            actions={dialogActions}
                            modal={false}
                            open={this.state.addMeasureDialogOpen}
                            onRequestClose={this._closeAddNewMeasureDialog}
                            autoScrollBodyContent={true}
                            autoDetectWindowHeight={true}>
                            <AdminMeasureDialogContent/>
                        </Dialog>
                    </form>
                </div>
            </div>
        )
    },
    _deleteSelectedMeasure: function () {
        AdminMeasureActions.deleteSelectedMeasure();
    },
    _openAddNewMeasureDialog: function () {
        AdminMeasureActions.openDialogAddNewMeasure();
    },
    _closeAddNewMeasureDialog: function () {
        AdminMeasureActions.closeDialogAddNewMeasure();
    },
    _saveOrUpdate: function () {
        AdminMeasureActions.saveOrUpdateMeasureData();
    },
    _onClearDialogInfo: function () {
        AdminMeasureActions.clearDialogInfo();
    },
    _onChange: function () {
        this.setState({
            addMeasureDialogOpen: AdminMeasureStore.isAddMeasureDialogOpen()
        });
    }
});

module.exports = AdminMeasureList;
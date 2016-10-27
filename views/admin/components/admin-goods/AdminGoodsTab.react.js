var React = require("react"),

    ContentAdd = require('material-ui/lib/svg-icons/content/add'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    ActionDelete = require('material-ui/lib/svg-icons/action/delete'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),
    FlatButton = require('material-ui/lib/flat-button'),

    AdminGoodsStore = require("./../../stores/AdminGoodsStore"),
    AdminGoodsActions = require("./../../actions/AdminGoodsActions"),

    AdminGoodsTable = require("./../admin-goods/AdminGoodsTable.react"),
    AdminGoodsDialogContent = require("./AdminGoodsDialogContent.react");

var AdminGoodsList = React.createClass({
    getInitialState: function () {
        return ({
            addGoodsDialogOpen: AdminGoodsStore.isAddGoodsDialogOpen()
        });
    },
    componentDidMount: function () {
        AdminGoodsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        AdminGoodsStore.removeChangeListener(this._onChange);
    },
    render: function () {
        const dialogActions = [
            <FlatButton label="Очистити"
                        onTouchTap={this._onClearDialogInfo}/>,
            <RaisedButton label="Зберегти"
                          primary={true}
                          onTouchTap={this._save}
                          labelPosition="after"
                          icon={<ContentSave/>}
                          style={{'margin': '20'}}/>
        ]
        return (
            <div className="admin-content">
                <div className="row">
                    <form className="col s12" action="#">
                        <div className="row row-head">
                            <h4>Список товарів</h4>
                        </div>
                        <RaisedButton
                            label="Додати товар"
                            onTouchTap={this._openAddNewGoodsDialog}
                            labelPosition="after"
                            primary={true}
                            icon={<ContentAdd/>}
                            style={{'margin': '20'}}/>
                        <FlatButton
                            label="Видалити"
                            labelPosition="after"
                            primary={true}
                            style={{'margin': '20'}}
                            icon={<ActionDelete />}
                            onTouchTap={this._deleteSelectedGoods}/>
                        <div className="divider"/>
                        <div className="row">
                            <AdminGoodsTable/>
                        </div>
                        <Dialog
                            title="ДОДАТИ ТОВАР"
                            actions={dialogActions}
                            modal={false}
                            open={this.state.addGoodsDialogOpen}
                            onRequestClose={this._closeAddNewGoodsDialog}
                            autoScrollBodyContent={true}
                            autoDetectWindowHeight={true}>
                            <AdminGoodsDialogContent/>
                        </Dialog>
                    </form>
                </div>
            </div>
        )
    },
    _deleteSelectedGoods: function () {
        AdminGoodsActions.deleteSelectedGoods();
    },
    _openAddNewGoodsDialog: function () {
        AdminGoodsActions.openDialogAddNewGoods();
    },
    _closeAddNewGoodsDialog: function () {
        AdminGoodsActions.closeDialogAddNewGoods();
    },
    _save: function () {
        AdminGoodsActions.saveOrUpdateGoodsData();
        AdminGoodsActions.closeDialogAddNewGoods();
    },
    _onClearDialogInfo: function () {
        AdminGoodsActions.clearDialogInfo();
    },
    _onChange: function () {
        this.setState({
            addGoodsDialogOpen: AdminGoodsStore.isAddGoodsDialogOpen()
        });
    }
});

module.exports = AdminGoodsList;
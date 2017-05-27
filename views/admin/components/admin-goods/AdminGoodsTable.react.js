var React = require('react'),

    Table = require('material-ui/lib/table/table'),
    TableHeaderColumn = require('material-ui/lib/table/table-header-column'),
    TableRow = require('material-ui/lib/table/table-row'),
    TableHeader = require('material-ui/lib/table/table-header'),
    TableRowColumn = require('material-ui/lib/table/table-row-column'),
    TableBody = require('material-ui/lib/table/table-body'),
    IconButton = require('material-ui/lib/icon-button'),
    RaisedButton = require('material-ui/lib/raised-button'),
    FlatButton = require('material-ui/lib/flat-button'),
    Dialog = require('material-ui/lib/dialog'),
    EditorModeEdit = require('material-ui/lib/svg-icons/editor/mode-edit'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    Colors = require('material-ui/lib/styles/colors'),

    AdminGoodsStore = require("./../../stores/AdminGoodsStore"),
    AdminGoodsActions = require("./../../actions/AdminGoodsActions"),

    GoodsUtils = require("./../../../utils/GoodsUtils"),
    AdminGoodsDialogContent = require("./AdminGoodsDialogContent.react");

const CURRENCY_UAH = "₴"; //Ukrainian hrivna

var GoodsDataTable = React.createClass({
        getInitialState: function () {
            return ({
                columnMetadata: AdminGoodsStore.getColumnMetadata(),
                dataTable: AdminGoodsStore.getGoodsList().goods,
                editGoodsDialogOpen: AdminGoodsStore.isEditGoodsDialogOpen()
            });
        },
        componentDidMount: function () {
            AdminGoodsStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
            AdminGoodsStore.removeChangeListener(this._onChange);
        },
        render: function () {
            var headers = this.state.columnMetadata.map(function (columnMeta) {
                return <TableHeaderColumn style={columnMeta.style}>{columnMeta.displayName}</TableHeaderColumn>;
            });
            var dataRows = this.state.dataTable.map((row, index) => (
                <TableRow key={index}>
                    <TableRowColumn style={this.state.columnMetadata[0].style}>
                        <IconButton>
                            <EditorModeEdit color={Colors.grey800} hoverColor={Colors.lightBlue500}/>
                        </IconButton>
                    </TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[1].style}>{row.id}</TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[2].style}>
                        {(AdminGoodsStore.getGoodsList().categoriesMap[row.categoryId]).name}
                    </TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[3].style}>{row.name}</TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[4].style}>
                        {GoodsUtils.convertPriceForDisplay(row.price, CURRENCY_UAH)}
                    </TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[5].style}>{row.quantity}</TableRowColumn>
                </TableRow>
            ));
            const dialogActions = [
                <FlatButton label="Очистити"
                            onTouchTap={this._onClearDialogInfo}/>,
                <RaisedButton label="Зберегти"
                              onTouchTap={this._saveEditedGoods}
                              primary={true}
                              labelPosition="after"
                              icon={<ContentSave/>}
                              style={{'margin': '20'}}/>
            ];
            return (
                <div>
                    <Table multiSelectable={true}
                           fixedHeader={true}
                           onRowSelection={this._onRowSelection}
                           onCellClick={this._onEditGoods}
                           height={'500px'}>
                        <TableHeader enableSelectAll={true}>
                            <TableRow>
                                {headers}
                            </TableRow>
                        </TableHeader>
                        <TableBody deselectOnClickaway={false} showRowHover={true}>
                            {dataRows}
                        </TableBody>
                    </Table>
                    <Dialog
                        title="РЕДАГУВАТИ ТОВАР"
                        actions={dialogActions}
                        modal={false}
                        open={this.state.editGoodsDialogOpen}
                        onRequestClose={this._closeEditGoodsDialog}
                        autoScrollBodyContent={true}
                        autoDetectWindowHeight={true}>
                        <AdminGoodsDialogContent/>
                    </Dialog>
                </div>
            )
        },
        _saveEditedGoods: function () {
            AdminGoodsActions.saveOrUpdateGoodsData();
            AdminGoodsActions.closeDialogEditGoods();
        },
        _closeEditGoodsDialog: function () {
            AdminGoodsActions.closeDialogEditGoods();
        },
        _onClearDialogInfo: function () {
            AdminGoodsActions.clearDialogInfo();
        },
        _onRowSelection: function (selectedRows) {
            AdminGoodsActions.selectGoodsForDelete(selectedRows);
        },
        _onEditGoods: function (rowNumber, columnNumber) {
            if (columnNumber == 1) {
                AdminGoodsActions.openDialogEditGoods(rowNumber)
            }
        },
        _onChange: function () {
            this.setState({
                editGoodsDialogOpen: AdminGoodsStore.isEditGoodsDialogOpen(),
                dataTable: AdminGoodsStore.getGoodsList().goods
            });
        }
    }
);
module.exports = GoodsDataTable;
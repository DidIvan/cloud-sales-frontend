/**
 * Created by opasichnyk on 4/26/2016.
 */
var React = require("react"),

    Table = require('material-ui/lib/table/table'),
    TableHeaderColumn = require('material-ui/lib/table/table-header-column'),
    TableRow = require('material-ui/lib/table/table-row'),
    TableHeader = require('material-ui/lib/table/table-header'),
    TableRowColumn = require('material-ui/lib/table/table-row-column'),
    TableBody = require('material-ui/lib/table/table-body'),
    EditorModeEdit = require('material-ui/lib/svg-icons/editor/mode-edit'),
    IconButton = require('material-ui/lib/icon-button'),
    Colors = require('material-ui/lib/styles/colors'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    FlatButton = require('material-ui/lib/flat-button'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),
    GoodsUtils = require("./../../../utils/GoodsUtils"),

    AdminCategoriesStore = require("./../../stores/AdminCategoriesStore"),
    AdminCategoriesActions = require("./../../actions/AdminCategoriesActions"),
    AdminCategoriesDialogContent = require("./AdminCategoriesDialogContent.react");

var CategoryDataTable = React.createClass({
    getInitialState: function () {
        return ({
            columnMetadata: AdminCategoriesStore.getColumnMetaData(),
            dataTable: AdminCategoriesStore.getCategoryList().categories,
            editCategoriesDialogOpen: AdminCategoriesStore.isEditCategoriesDialogOpen()
        });
    },
    componentDidMount: function () {
        AdminCategoriesStore.addChangeListener(this._onChangeCategoriesData);
    },
    componentWillUnmount: function () {
        AdminCategoriesStore.removeChangeListener(this._onChangeCategoriesData);
    },
    render: function () {
        var headers = this.state.columnMetadata.map(function (columnMeta) {
            return <TableHeaderColumn key={columnMeta.id} style={columnMeta.style}>{columnMeta.displayName}</TableHeaderColumn>;
        });
        var dataRows = this.state.dataTable.map((row, index) => (
                <TableRow key={index}>
                    <TableRowColumn style={this.state.columnMetadata[0].style}>
                        <IconButton>
                            <EditorModeEdit color={Colors.grey800} hoverColor={Colors.lightBlue500}/>
                        </IconButton>
                    </TableRowColumn>
                    <TableRowColumn
                        style={this.state.columnMetadata[1].style}>{row.id}</TableRowColumn>
                    <TableRowColumn
                        style={this.state.columnMetadata[2].style}>{row.name}</TableRowColumn>
                    <TableRowColumn
                        style={this.state.columnMetadata[3].style}>{row.property}</TableRowColumn>
                    <TableRowColumn
                        style={this.state.columnMetadata[4].style}>{AdminCategoriesStore.getCategoryList().categories.length}</TableRowColumn>
                </TableRow>
            )
        );
        const dialogActions = [
            <FlatButton label="Очистити"
                        onTouchTap={this._onClearDialogInfo}/>,
            <RaisedButton label="Зберегти"
                          onTouchTap={this._saveCategories}
                          primary={true}
                          labelPosition="after"
                          icon={<ContentSave/>}
                          style={{'margin': '20'}}/>
        ]
        return (
            <div>
                <Table multiSelectable={true}
                       fixedHeader={true}
                       onRowSelection={this._onRowSelection}
                       onCellClick={this._onEditCategories}
                       height={'500px'}>
                    <TableHeader enableSelectAll={true}>
                        <TableRow>
                            {headers}
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false}>
                        {dataRows}
                    </TableBody>
                </Table>
                <Dialog
                    title="РЕДАГУВАТИ КАТЕГОРІЮ"
                    actions={dialogActions}
                    modal={false}
                    open={this.state.editCategoriesDialogOpen}
                    onRequestClose={this._handleClose}
                    autoScrollBodyContent={true}>
                    <AdminCategoriesDialogContent/>
                </Dialog>
            </div>
        );
    },
    _onRowSelection: function (selectedRows) {
        AdminCategoriesActions.selectCategoriesForDelete(selectedRows);
    },
    _onEditCategories: function (rowNumber, columnNumber) {
        if (columnNumber == 1) {
            AdminCategoriesActions.openDialogEditCategories(rowNumber)
        }
    },
    _onClearDialogInfo: function () {
        AdminCategoriesActions.clearDialogInfo();
    },
    _saveCategories: function () {
        AdminCategoriesActions.saveOrUpdateCategoryData();
    },
    _handleClose: function () {
        AdminCategoriesActions.closeDialogEditCategories();
    },
    _onChangeCategoriesData: function () {
        this.setState({
            editCategoriesDialogOpen: AdminCategoriesStore.isEditCategoriesDialogOpen(),
            dataTable: AdminCategoriesStore.getCategoryList().categories
        });
    }
});

module.exports = CategoryDataTable;
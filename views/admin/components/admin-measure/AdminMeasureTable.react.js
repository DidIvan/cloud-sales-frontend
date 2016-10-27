/**
 * Created by opasichnyk on 5/4/2016.
 */
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

    AdminMeasureStore = require("./../../stores/AdminMeasureStore"),
    AdminMeasureActions = require("./../../actions/AdminMeasureActions"),
    GoodsUtils = require("./../../../utils/GoodsUtils"),

    AdminMeasureDialogContent = require("./AdminMeasureDialogContent.react");

const CURRENCY_UAH = "₴"; //Ukrainian hrivna

var MeasureDataTable = React.createClass({
        getInitialState: function () {
            return ({
                columnMetadata: AdminMeasureStore.getColumnMetadata(),
                dataTable: AdminMeasureStore.getMeasureList().measures,
                editMeasureDialogOpen: AdminMeasureStore.isEditMeasureDialogOpen()
            });
        },
        componentDidMount: function () {
            AdminMeasureStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
            AdminMeasureStore.removeChangeListener(this._onChange);
        },
        render: function () {
            var headers = this.state.columnMetadata.map(function (columnMeta) {
                return <TableHeaderColumn style={columnMeta.style}>{columnMeta.displayName}</TableHeaderColumn>;
            });
            var dataRows = this.state.dataTable.map((row, index) => (
                <TableRow key={index}>
                    <TableRowColumn style={this.state.columnMetadata[0].style}>
                        <IconButton onTouchTap={this.handleOpen}>
                            <EditorModeEdit color={Colors.grey800} hoverColor={Colors.lightBlue500}/>
                        </IconButton>
                    </TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[1].style}>{row.id}</TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[2].style}>{row.name}</TableRowColumn>
                    <TableRowColumn style={this.state.columnMetadata[3].style}>{row.abbreviation}</TableRowColumn>                  
                </TableRow>
            ));
            const dialogActions = [
                <FlatButton label="Очистити"
                            onTouchTap={this._onClearDialogInfo}/>,
                <RaisedButton label="Зберегти"
                              onTouchTap={this._saveMeasure}
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
                           onCellClick={this._onEditMeasure}
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
                        title="РЕДАГУВАТИ ОДИНИЦЮ ВИМІРЮВАННЯ"
                        actions={dialogActions}
                        modal={false}
                        open={this.state.editMeasureDialogOpen}
                        onRequestClose={this._handleClose}
                        autoScrollBodyContent={true}>
                        <AdminMeasureDialogContent/>
                    </Dialog>
                </div>
            )
        },
        _saveMeasure: function () {
            AdminMeasureActions.saveOrUpdateMeasureData();
            AdminMeasureActions.closeDialogEditMeasure();
        },
        _handleClose: function () {
            AdminMeasureActions.closeDialogEditMeasure();
        },
        _onClearDialogInfo: function () {
            AdminMeasureActions.clearDialogInfo();
        },
        _onRowSelection: function (selectedRows) {
            AdminMeasureActions.selectMeasureForDelete(selectedRows);
        },
        _onEditMeasure: function (rowNumber, columnNumber) {
            if (columnNumber == 1) {
                AdminMeasureActions.openDialogEditMeasure(rowNumber)
            }
        },
        _onChange: function () {
            this.setState({
                editMeasureDialogOpen: AdminMeasureStore.isEditMeasureDialogOpen(),
                dataTable: AdminMeasureStore.getMeasureList().measures
            });
        }
    }
);
module.exports = MeasureDataTable;
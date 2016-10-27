/**
 * Created by opasichnyk on 4/26/2016.
 */
var React = require('react'),

    Table = require('material-ui/lib/table/table'),
    TableHeaderColumn = require('material-ui/lib/table/table-header-column'),
    TableRow = require('material-ui/lib/table/table-row'),
    TableHeader = require('material-ui/lib/table/table-header'),
    TableRowColumn = require('material-ui/lib/table/table-row-column'),
    TableBody = require('material-ui/lib/table/table-body'),
    AdminMeasureStores = require("./../../stores/AdminMeasureStore"),
    AdminPropertiesStore = require("./../../stores/AdminPropertiesStore"),
    AdminPropertiesActions = require("./../../actions/AdminPropertiesActions"),
    EditorModeEdit = require('material-ui/lib/svg-icons/editor/mode-edit'),
    IconButton = require('material-ui/lib/icon-button'),
    Colors = require('material-ui/lib/styles/colors'),
    ContentSave = require('material-ui/lib/svg-icons/content/save'),
    FlatButton = require('material-ui/lib/flat-button'),
    RaisedButton = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),

    GoodsUtils = require("./../../../utils/GoodsUtils"),

    AdminPropertiesDialogContent = require("./AdminPropertiesDialogContent.react");

var PropertyDataTable = React.createClass({
        getInitialState: function () {
            return ({
                columnMetadata: AdminPropertiesStore.getColumnMetaData(),
                dataTable: AdminPropertiesStore.getPropertyList().properties,
                editPropertiesDialogOpen: AdminPropertiesStore.isEditPropertiesDialogOpen()
            });
        },
        componentDidMount: function () {
            AdminPropertiesStore.addChangeListener(this._onChangePropertiesData);
        },
        componentWillUnmount: function () {
            AdminPropertiesStore.removeChangeListener(this._onChangePropertiesData);
        },
        getValueTypeText: function (valueType) {
            let result = '-';
            switch (valueType) {
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
        getMeasureNameById: function (measureId) {
            let result = '-';
            if (measureId) {
                result = GoodsUtils.getObjectById(measureId, AdminPropertiesStore.getMeasurementList())
            }
            return result;
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
                    <TableRowColumn style={this.state.columnMetadata[2].style}>{row.name}</TableRowColumn>
                    <TableRowColumn
                        style={this.state.columnMetadata[3].style}>{this.getMeasureNameById(row.measurementId)}</TableRowColumn>
                    <TableRowColumn
                        style={this.state.columnMetadata[4].style}>{this.getValueTypeText(row.valueType)}</TableRowColumn>
                    {/*<TableRowColumn
                     style={this.state.columnMetadata[3].style}>{GoodsUtils.getObjectById(row.measurementId, AdminPropertiesStore.getMeasurementList()).name}</TableRowColumn>
                     <TableRowColumn
                     style={this.state.columnMetadata[4].style}>{GoodsUtils.getObjectById(row.valueType, AdminPropertiesStore.getDataTypeList()).name}</TableRowColumn>*/}
                </TableRow>
            ));
            const dialogActions = [
                <FlatButton label="Очистити"
                            onTouchTap={this._onClearDialogInfo}/>,
                <RaisedButton label="Зберегти"
                              onTouchTap={this._saveProperties}
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
                           onCellClick={this._onEditProperties}
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
                        title="РЕДАГУВАТИ ХАРАКТЕРИСТИКУ"
                        actions={dialogActions}
                        modal={false}
                        open={this.state.editPropertiesDialogOpen}
                        onRequestClose={this._handleClose}
                        autoScrollBodyContent={true}>
                        <AdminPropertiesDialogContent/>
                    </Dialog>
                </div>
            )
        },
        _onRowSelection: function (selectedRows) {
            AdminPropertiesActions.selectPropertiesForDelete(selectedRows);
        },
        _onEditProperties: function (rowNumber, columnNumber) {
            if (columnNumber == 1) {
                AdminPropertiesActions.openDialogEditProperties(rowNumber)
            }
        },
        _onClearDialogInfo: function () {
            AdminPropertiesActions.clearDialogInfo();
        },
        _saveProperties: function () {
            AdminPropertiesActions.saveOrUpdatePropertyData();
        },
        _handleClose: function () {
            AdminPropertiesActions.closeDialogEditProperties();
        },
        _onChangePropertiesData: function () {
            this.setState({
                editPropertiesDialogOpen: AdminPropertiesStore.isEditPropertiesDialogOpen(),
                dataTable: AdminPropertiesStore.getPropertyList().properties
            });
        }
    }
);

module.exports = PropertyDataTable;
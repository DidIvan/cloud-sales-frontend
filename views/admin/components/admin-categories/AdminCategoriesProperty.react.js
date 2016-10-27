var React = require("react"),

    AdminCategoriesActions = require("./../../actions/AdminCategoriesActions"),
    AdminCategoriesStore = require('./../../stores/AdminCategoriesStore');

var styles = {
    selectedItem: {
        background: 'rgba(153,153,153,0.2)',
        borderRadius: '5px',
        color: '#000000',
        margin: '15px 5px 15px 0',
        padding: '0 5px',
        cursor: 'pointer'

    }
}
var CategoryProperty = React.createClass({
    render: function () {
        return (
            <a className="waves-effect waves-light"
               onClick={this._deleteSelectedProperty}
               style={styles.selectedItem}
            >{this.props.name}</a>
        )
    },
    _deleteSelectedProperty: function () {
        AdminCategoriesActions.deleteSelectedProperty(this.props.id);
    },
});

module.exports = CategoryProperty;

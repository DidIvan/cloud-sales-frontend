var React = require("react");


var Textarea = React.createClass({
    render: function () {
        return (
            <div>
                <div className={this.props.className}>
                    <textarea id={this.props.id}
                              className="materialize-textarea"
                              style={this.props.style}
                              maxlength={this.props.maxlength}
                              value={this.props.value}
                              onChange={this.props.onChange}
                              onBlur={this.props.onBlur}>
                        
                    </textarea>
                    <label for={this.props.id}
                           style={this.props.labelStyle}
                    >{this.props.labelText}</label>
                </div>
            </div>
        )
    }
});

module.exports = Textarea;
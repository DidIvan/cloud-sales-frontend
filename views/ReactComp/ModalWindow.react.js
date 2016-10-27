var React = require("react");

var Modal = React.createClass({
        getInitialState: function () {
            return {}
        },
        componentDidMount: function () {
            var that = this;
            $(document).ready(function () {
                $('.modal-trigger').leanModal({
                        dismissible: true, // Modal can be dismissed by clicking outside of the modal
                        opacity: .5, // Opacity of modal background
                        in_duration: 300, // Transition in duration
                        out_duration: 200, // Transition out duration
                        starting_top: '4%', // Starting top style attribute
                        ending_top: '20%', // Ending top style attribute
                        ready: function () {
                        }, // Callback for Modal open
                        complete: function () {
                            that.props.onRequestClose();
                        } // Callback for Modal close
                    }
                );

            });
        },
        render: function () {
            return (
                <div>
                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>{this.props.title}</h4>
                            {this.props.content} {/*ex:  content={<AdminCategoriesDialogContent/>}*/}
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="waves-effect waves-green btn-flat"
                               onclick={this.props.buttonSave}>Зберегти</a>
                            <a href="#!" className="waves-effect waves-green btn-flat"
                               onclick={this.props.buttonClear}>Очистити</a>
                        </div>
                    </div>
                </div>
            )
        }
    })
    ;

module.exports = Modal;
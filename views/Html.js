var React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    Container = require('./components/container.react');

var Html = React.createClass({
    render: function () {

        var data = this.props.data;
        var contentHtml = ReactDOMServer.renderToString(<Container {...data}/>);
        var initScript = 'bundle(' + JSON.stringify(data).replace(/script/g, 'scr"+"ipt') + ')';

        return (
            <html lang="en">
            <head>
                <title>Cloud Sales</title>
                <meta charset="utf-8"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
                <link rel="icon" href="favicon.ico" type="image/x-icon"/>
                {/*Materialize*/}
                <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link href="css/libs/materialize.css" rel="stylesheet" media="screen"/>

                <script type="text/javascript" src="js/libs/jquery.js"></script>
                <script type="text/javascript" src="js/libs/materialize.min.js"></script>

                {/*Custom styles*/}
                <link href="css/components-style/style.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/goods-list.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/header.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/footer.css" rel="stylesheet" media="screen"/>

            </head>
            <body className="element">
            <div id="content" dangerouslySetInnerHTML={{__html: contentHtml}}/>
            <script src="/js/bundle.js"></script>
            <script dangerouslySetInnerHTML={{__html: initScript}}/>
            </body>
            </html>
        );
    }
});

module.exports = Html;

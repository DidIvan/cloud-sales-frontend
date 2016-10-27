var React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    Container = require('./admin/container.react');

var HtmlAdmin = React.createClass({

    render: function () {

        var data = this.props.data;
        var contentHtml = ReactDOMServer.renderToString(<Container {...data}/>);
        var initScript = 'bundle1(' + JSON.stringify(data).replace(/script/g, 'scr"+"ipt') + ')';

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
                <link type="text/css" rel="stylesheet" href="css/libs/materialize.css" media="screen,projection"/>

                <script type="text/javascript" src="js/libs/jquery.js"></script>
                <script type="text/javascript" src="js/libs/materialize.min.js"></script>

                {/*Custom styles*/}
                <link href="css/components-style/style.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/admin-content.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/header.admin1.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/footer.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/admin-login.css" rel="stylesheet" media="screen"/>
                <link href="css/components-style/input.css" rel="stylesheet" media="screen"/>

                {/*<!-- THEMES (default, bootstrap3, material) -->*/}
                <link rel="stylesheet" href="https://npmcdn.com/react-selectize@2.0.1/dist/index.min.css"/>
                <link
                    href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,100italic,300italic,400italic,500italic'
                    rel='stylesheet' type='text/css'/>

            </head>
            <body className="element">
            <div id="content" dangerouslySetInnerHTML={{__html: contentHtml}}/>
            <script src="/js/bundle1.js"></script>
            <script dangerouslySetInnerHTML={{__html: initScript}}/>
            </body>
            </html>
        );
    }
});

module.exports = HtmlAdmin;

'use strict';

var Config = require('./config/configuration');
var Routes = require('./routes');
const Hapi = require('hapi');
const Good = require('good');
var Path = require('path');
	 
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
	host: Config.server.host,
	port: Config.server.port
});

server.route(Routes.endpoints);
 
server.register(require('vision'), (err) => {

    server.views({	
        engines: { html: require('handlebars') },
        layout : true,
        path: __dirname + '/views',
        layoutPath : Path.join(__dirname, './views/layouts')//, //setting Global Layout,
        //partialsPath : Path.join(__dirname,'./views/layouts/partial') //partial Views
    });
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
    
    server.start(() => {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

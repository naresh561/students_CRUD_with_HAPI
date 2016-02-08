'use strict';

var Config = require('./config/configuration');
var Routes = require('./routes');
const Hapi = require('hapi');
const Good = require('good');
var Path = require('path');
var Inert = require('inert');
	 
// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../public')
            }
        }
    }
});
server.connection({ 
	host: Config.server.host,
	port: Config.server.port
});

server.route(Routes.endpoints);

//server.route({
//    method: 'GET',
//    path: '/public/js/jquery-1.10.2.min.js',
//    handler: function(rs,rp){
//        try{
//    rp.file("./public/js/jquery-1.10.2.min.js");
//        }
//        catch(e){
//            console.log(e);
//        }
//  }
//});

server.register(Inert, () =>{
    server.route( {    // Other assets If you have
        method: 'GET',
        path: '/public/js/{filename}',
        handler: {
            file: function (request) {
                return __dirname+'/public/js/'+request.params.filename;
            }
        }
    });
});

//server.route({
//    method: 'GET',
//    path: '/public/js/{filename}',
//    handler: function (request,reply){
//             reply.view('./public/js/'+request.params.filename);
//    }
//});

//server.route({
//        method: 'GET',
//        path: '/public/js/{filename}',
//        handler: function (request, reply) {
//         try{
//            console.log(request.params);
//            reply.file(Path.normalize(__dirname, '/public/js/'+request.params.filename));
//        }
//        catch(e){
//             console.log(e);
//            reply.file( Path.normalize(__dirname,'/public/js/'+request.params.filename));
//        }
//        }
//    });
//server.route({
//method: 'GET',
//path: '/public',
//handler: {
//    directory: {
//      path: './public/js',
//      index: false
//    } 
//  }
//             });

//server.register(Inert, () => {
//    // ..
//    // routing
//
//    server.route({
//        method: 'GET',
//        path: '/public/js/{filename}',
//        handler: function (request, reply) {
//            reply.file('./public/js/' + request.params.filename);
//        }
//    });
//});

 
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

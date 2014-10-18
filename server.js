/**
 * File: server.js
 * Description: This file sets up my backend
 * Dependencies: Express v4, Mongoose, body-parser, morgan
 *
 * @package gamma
 */

/* === Base Setup === */
// define all the things
var express         = require('express');               // rope in express
var app             = express();                        // create my app w/ express
var morgan          = require('morgan');                // log requests to the console (express4)
var bodyParser      = require('body-parser');           // pull information from HTML POST (express4)
var methodOverride  = require('method-override');       // simulate DELETE and PUT (express4)
var http            = require('http');                  // for starting the server
var mongoose        = require('mongoose');              // for the backend
var routes          = require('./backend/routes');      // for routing

// feeling POSTal
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port definition
var port            = process.env.PORT || 8080;

// sets where static files live
app.use(express.static(__dirname + '/app/'));


/* === Routing === */
// index page
app.get('/', routes.index);

// should all else fail
app.get('*', routes.index);


/* === Start the Engines === */
http.createServer(app).listen(port, function() {
    console.log('firing on port ' + port);
});

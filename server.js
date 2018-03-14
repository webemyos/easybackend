/**
*  Easybackend
*  Devellop your app, Easybackend do fait le rest
*  Webemyos
*/

'use strict';

// Modules Nodes Js
var http = require('http');

// Application Easybackend
var app = require("./easybackend");

//Start serveur 
var server = http.createServer(app);
server.listen(process.env.PORT || 8080);

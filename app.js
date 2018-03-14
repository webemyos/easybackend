/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
*/

'use strict';

// Modules Nodes Js
var http = require('http');

// Application GapWeb
var app = require("./easybackend");

//Démarrage du serveur sur le port 8080
var server = http.createServer(app);
server.listen(process.env.PORT || 8080);

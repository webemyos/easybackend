/**
*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaires des applications
*/

//Librairie node.js
var fs = require('fs');

//Inclusion des fonction de base
var config = require('./config');

var app = function()
{
	this.config = "";
	
	/*
	* V�rifie qu'une application existe 
	*/
	this.exist = function(gapp)
	{
            appFile = config.directoryApp + gapp + ".json";
            return fs.existsSync(appFile);
	};
	
	/*
	* Lit la configuration de l'application
	*/
	this.readConfig = function(gapp)
	{
            appFile = config.directoryApp + gapp + ".json";
            var obj = JSON.parse(fs.readFileSync(appFile, 'utf8'));
            this.config = obj;
	};
};

module.exports = app;
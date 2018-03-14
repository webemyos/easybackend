/**
*  Projet GabWeb
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Surcouche de la console
*/

gconsole = function(){};

/*
* Affiche un message dans la console
*/ 
gconsole.log = function(message)
{
	console.log(new Date().getTime() + " : "+ message);
};

/*
* Affiche un message d'erreur
* Ajouter des logs sur fichiers
*/
gconsole.error = function(message)
{
	console.error(new Date().getTime() + " : "+ message);
};
/**
*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaire des donn�es post
*/

var post = function(){};

post.params = "";
post.loaded = "false";

/*
* 
*/
post.init = function(data)
{
	gconsole.log("Donn�e recue en post :  " + data);
	post.params += data;
};

post.end = function(core)
{
	gconsole.log("fin du post");
	post.loaded = "true";
	
	gconsole.log(post.loaded);
	
};

module.exports = post;
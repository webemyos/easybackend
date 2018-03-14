/**
*  Projet EasybackEnd
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Gestionnaire des ressources
*/
var fs = require('fs');

var getressource = function()
{
    	this.process = function()
	{
            console.log("Récuperation d'une ressource");
            
            file = core.postParam.getParameter("params");
            
            url = "apps/"+  core.token.getParameter("app") +"/ressource/" + file;
            gconsole.log(url);  
            
           // return;
           // gconsole.log(core.reponse);
            fs.exists(url, function(result) { getFile(result, core.reponse, url)});
        }
}

/*
 * lit le fichier
 */
getFile = function(exists, reponse, localpath)
{
  if(!exists) return console.log(404, '404 Not Found', reponse);
  fs.readFile(localpath, "binary",
    function(err, file){ sendFile(err, file, reponse);});
}
 
 /*
  * Envoi le fichier 
  */
sendFile= function(err, file, reponse)
{
    if(err)
    {
       console.log("Erreur" +  err);
    }
     
    reponse.writeHead(200);
    reponse.write(file, "binary");
    reponse.end();
} 

module.exports = getressource;
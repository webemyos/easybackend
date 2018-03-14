/**
*  Projet EasybackEnd
*  Web serveur d'application global
*  Jérôme Oliva
* 02/03/2018
*
* Gestionnaire des ressources
*/
var fs = require('fs');

var setressource = function()
{
     /*
     * Verify the token and parameters
     * @returns {undefined}
     */
    this.isValid = function ()
    {
        //Verification du token
   /*     if(!core.token.verify())
        {
            return false;
        }
        
        //Verification des parametres passé
        if(!core.postParam.verify())
        {
            return false;
        }
*/
        return true;
    }

    this.process = function()
	{
        console.log("Sauvegarde d'une ressource");
      
        files = core.postParam.getParameter("file[]"); 
        
        console.log(files);


        //fs.writeFileSync()
        core.writeFormat("50", "RessourcesAdded");
        
    }
}

module.exports = setressource;
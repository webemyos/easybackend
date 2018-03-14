/**
*  Projet GabWeb
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Gestionnaire d'obtient des donn�es
*/


var getinfo = function()
{
   /*
     * Verify the token and parameters
     * @returns {undefined}
     */
    this.isValid = function ()
    {
        //Verification du token
        if(!core.token.verify())
        {
            return false;
        }
       
        return true;
    }
    
    this.process = function()
    {
        console.log("Get info off the app");
        
        gapp = core.token.getParameter("app");
            
        //Lit la configuration de l'application
        core.app.readConfig(gapp);

       //Return the info 
        switch(core.postParam.getParameter("data"))
        {
            case "entities":
                core.writeFormat("060", "getInfoOk", {entities: core.app.config.entities});
                break;
            case "ressources":
                core.writeFormat("060", "getInfoOk", {ressources: core.app.config.ressources});
                break;
            case "ressource":
                core.writeFormat("060", "getInfoOk", {ressource : this.findRessource(core.postParam.getParameter("params"))});
            break;
            case "functions":
                core.writeFormat("060", "getInfoOk", {functions : core.app.config.functions});
            break;
            case "function":
                core.writeFormat("060", "getInfoOk", {function : this.findFunction(core.postParam.getParameter("params"))});
            break;
        }
        core.writeEnd();
    };
    
    /*
     * Find à ressource
     */
    this.findRessource = function(name)
    {
        gconsole.log(name);
        
        for(i = 0; i < core.app.config.ressources.length; i++)
        {
            if(core.app.config.ressources[i].name == name)
            {
                return core.app.config.ressources[i];
            }
        }
    };
    
    /*
     * Find à function
     */
    this.findFunction = function(name)
    {
        gconsole.log(name);
        
        for(i = 0; i < core.app.config.functions.length; i++)
        {
            if(core.app.config.functions[i].name == name)
            {
                return core.app.config.functions[i];
            }
        }
    };
}

module.exports = getinfo;


/**
*  Projet GabWeb
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Gestionnaire de la connection applicative
*/

/*
* Connect l'utilisateur à l'application
*/
var connect = function()
{
    /*
     * Verify the token and the parameter
     * @returns {undefined}
     */
    this.isValid = function()
    {
        //Recuperation du token
        gtoken = core.token.get();

        if(gtoken != undefined && gtoken != "")
        {
            gconsole.log("Connection de l'utilisateur a l'application");
            apiToken = this.connect (core) ;

            if(apiToken == false)
            {
                 core.writeFormat("003", "unknowApp");
                 return false;
            }
        }
        else
        {
            core.writeFormat("099","undefinedToken");
            return false;
        }

       return true;
    }
    
    /*
    * Lance le processsus
    */
    this.process = function()
    {
        gconsole.log("Initialise la connection");
        core.writeFormat("002", "connectOk", {token:core.token.enrich("apiToken", core.app.config.apiToken)});

        core.writeEnd();
    };

    /*
    * Connect l'utilisateur a l'app
    */
    this.connect = function(core)
    {
        //Recuperation de l'application
       gapp = core.token.getParameter("app");

        if(gapp != "" && core.app.exist(gapp) == true)
        {
           //Lit la configuration de l'application
           core.app.readConfig(gapp);

           return core.app.config.apiToken;
        }
        else
        {
           gconsole.error("Application inconnue");
           return false;
        }
    };
};

module.exports = connect;
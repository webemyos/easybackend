/**
*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaire d'obtient des donn�es
*/
var jsonDb = require('../../mod/jsonDb/jsonDb');
var gmysql = require('../../mod/gmysql/gmysql');

var setdata = function()
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
        
        //Verification des parametres passé
        if(!core.postParam.verify())
        {
            return false;
        }

        return true;
    }
    
   /*
   * Obtentions des donn�es
   */
    this.process = function()
    {
        gconsole.log("Recuperation des parametres post : " + core.postParam.get());
        this.setData();
    }

    /*
     * Obtient les données
     */
    this.setData = function(entity, params, writeMessage)
    {
        gapp = core.token.getParameter("app");

        //Lit la configuration de l'application
        core.app.readConfig(gapp);

        gconsole.log( " Serveur de données : " + core.app.config.dataServerType);

        switch(core.app.config.dataServerType)
        {
            case "jsonDb":
                dataServer = new jsonDb(core.app.config.bdd.dataDirectory);
                  break;
            case "mysql":
                dataServer = new gmysql(core.app.config.bdd.server, core.app.config.bdd.database, core.app.config.bdd.user, core.app.config.bdd.password);
            break;
        }

        //Obtient les données
        dataServer.setData(entity, params, writeMessage);
    }
};

/*
 * Termine l'eciture des données dans le flux
 */
setdata.end = function(){
    
    //fin de lecture de données 
    
    //affiche les données
    core.reponse.end();
    
};

module.exports = setdata;
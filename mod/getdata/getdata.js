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
var mongoDb = require('../../mod/mongoDb/mongoDb');

var getdata = function ()
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
    this.process = function ()
    {
        console.log("Obtiention des donnees");
        this.getData();
    }

    /*
     * Obtient les données
     */
    this.getData = function (callBack, data, params)
    {
        gapp = core.token.getParameter("app");

        //Lit la configuration de l'application
        core.app.readConfig(gapp);

        switch (core.app.config.dataServerType)
        {
            case "jsonDb":
                dataServer = new jsonDb(core.app.config.bdd.dataDirectory);
                break;
            case "mysql":
                dataServer = new gmysql(core.app.config.bdd.server, core.app.config.bdd.database, core.app.config.bdd.user, core.app.config.bdd.password);
                break;
                case "mongoDb" :
                dataServer = new mongoDb(core.app.config.bdd.url);
                break;
        }

        //Obtient les données
        dataServer.getData(callBack, data, params);
    }
};

/*
 * Termine l'eciture des données dans le flux
 */
getdata.end = function () {

    //affiche les données
    core.reponse.end();
};

module.exports = getdata;
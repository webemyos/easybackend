/**
*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaire d'appel de fonction
*/

//Librairie node.js
var gmysql = require('../../mod/gmysql/gmysql');
var jql = require('../../mod/jql/jql');
var fs = require('fs');

var call = function()
{
     /* Verify the token and parameters
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
      /*  if(!core.postParam.verify())
        {
            return false;
        }*/

        return true;
    }


   /*
   * Obtentions des donn�es
   */
	this.process = function()
	{
		gconsole.log("Appel d'une fonction");
		
		//Recuperation du token
		gtoken = core.token.get();
		
		apiToken = core.token.getParameter("apiToken");
		
		if(apiToken != null )
		{
                    if(core.postParam != "undefined")
                    {
                        gconsole.log("Recuperation des parametres post : " + core.postParam.get());
                        this.executeCall();
                    }
		}
		else
		{
			gconsole.error("No Api Token");
		}
	}
        
        /*
         * Obtient les données
         */
        this.executeCall = function(data, params)
        {
            gapp = core.token.getParameter("app");
            
            
            if(data == undefined)
            {
                data = core.postParam.getParameter("data");
                params = core.postParam.getParameter("params");        
            }
            
	    //Lit la configuration de l'application
            core.app.readConfig(gapp);
            var func = "";
            
            //Recherche de la fonction
            for(i=0; i < core.app.config.functions.length; i++)
            {
                if(core.app.config.functions[i].name == data)
                {
                    func = core.app.config.functions[i];
                }
            }
            
            //Execution des méthodes
            if(func != "")
            {
                this.executAllCalls(func);
            }
            else
            {
                core.writeFormat("31", "unknowFunction");
                core.writeEnd();
            }
        }
        
        /*
         * Execute les appels au différents fonction
         */
        this.executAllCalls = function(func)
        {
            //Appele de methode
            if( func.calls  != undefined)
            {
              for(j=0 ; j < func.calls.length; j++)
              {
                  cal = func.calls[j];
                  gconsole.log("Lancement de :" + cal.mod + ":" + cal.data + ":" + cal.params);
                  
                  switch(cal.mod)
                  { 
                      case "getdata" :
                         mod = new getdata();
                         mod.getData(call, cal.data, cal.params);
                      break;
                  }
             }   
            }
            
            //Requete sql directe
            if(func.sql != undefined)
            {
              gconsole.log("Requete sql"); 
              params = core.postParam.getParameter("params");        
           
              dataServer = new gmysql(core.app.config.bdd.server, core.app.config.bdd.database, core.app.config.bdd.user, core.app.config.bdd.password);
            
              dataServer.getRequest(func.sql, params); 
            }
            
            if(func.json != undefined)
            {
               params = core.postParam.getParameter("params");        
               entities =  jql.getByJql(func.json, params);
           
           console.log(entities);
           
               core.writeFormat("30", "callOk", {entities: entities});
             
               core.writeEnd()
            }
        };
};

call.result = function(row)
{
    gconsole.log("Resultat : " + JSON.stringify(row));
};

call.end = function()
{
    gconsole.log("Fin appel");
    //gmysql.mySqlClient.end();
    
    getdata.end();
};

call.error = function(error)
{
    gconsole.log("Erreur :" + error);
};

module.exports = call;

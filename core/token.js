/**
*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaire du token
*/


var token = function()
{
	this.strToken = "";
	this.parameters = new Array();
	
	/*
	* Initialise le token
	*/
	this.set = function(strToken)
	{
		this.strToken = strToken;
	};
	
	/*
	* R�cup�re le token complet
	*/
	this.get = function()
	{
		return this.strToken;
	};
	
	/*
	* Retrouve un parametre dans le token
	*/
	this.getParameter = function(search)
	{
		if(this.parameters.length ==0)
		{
			this.deserialise();
		}
	
	    //Parcour les parametres et retourne la valeur
		for(i = 0; i< this.parameters.length ; i++)
		{
                    if(this.parameters[i][0] == search)
                    {
                            return this.parameters[i][1];
                    }
		}
		
		return null;
	};
	
	/*
	* deserialise le token en tableau de parametre
	*/
	this.deserialise = function()
	{
            if(this.strToken != undefined)
            {
                var params = this.strToken.split("!");

                for(i = 0; i< params.length ; i++)
                {
                        this.parameters.push(params[i].split(":"));
                }
            }
	};
	
	/*
	* Enrichie le token
	*/
	this.enrich = function(key, value)
	{
		return this.strToken + "!"+key + ":" +value;
	};
        
        /*
         * Vérifie si le token est valide
         */
        this.verify =function()
        {
            if(this.strToken == undefined || this.get("ApiToken") == "") 
            {
               core.writeFormat("099", "invalidToken");
                return false;
            }
            
            //Recuperation de l'application
            gapp = core.token.getParameter("app");

            if(gapp == "" || gapp == null)
            {
                core.writeFormat("097", "notAppDefinedInToken");
               return false;
            }

            if(core.app.exist(gapp) == false)
            {
               core.writeFormat("095", "unknowApp");
               return false;
            }
           
            apiToken = core.token.getParameter("apiToken");
             
            if (apiToken == null)
            {
                core.writeFormat("098", "noApiToken");
                return false;
            }
            
          return true;
        };
};

module.exports = token;
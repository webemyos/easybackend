/*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaire des parametres post / get ou autres
*/

var ent = require('ent');

var parameters = function()
{
    this.strParameter = "";
    this.parameters = new Array();
        
    this.set = function(strParameter)
    {
        this.strParameter = strParameter;
    };
    
    /*
     * Ajout un parameters
     * @param {type} strParameter
     * @returns {undefined}
     */
    this.add = function(strParameter)
    {
        this.strParameter += strParameter;
    };
    
    /*
    * R�cup�re le token complet
    */
    this.get = function()
    {
        return this.strParameter;
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
            console.log(this.parameters[i][0]);

            
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
      //  gconsole.log(this.strParameter);
        var params = this.strParameter.split("&");

        for(i = 0; i< params.length ; i++)
        {
            data = params[i].split("=");
            
            if(data[1] != undefined)
            {
                //UTILISER DES EXPRESSSION REGULIERES POUR TOUT REMPLACER
                value = data[1].replace(/%3D/g, "=")
                                .replace(/[+]/g," ")
                                .replace(/%22/g, "\"")
                                .replace(/%25/g, "%")
                                .replace(/%27/g, "'")
                                .replace(/%28/g, "(")
                                .replace(/%29/g, ")")
                                .replace(/%2C/g, ",")
                                .replace(/%3A/g, ":")
                                .replace(/%7B/g, "{")
                                .replace(/%7D/g, "}")
                ;  

                this.parameters.push(new Array(data[0], value));
            }
        }
    };
    
    /*
     * Verify if Data And params exist
     */
    this.verify = function()
    {
        if(this.strParameter == "" )
        {
            core.writeFormat("095", "notParams");
            return false;
        }
        
        if(this.getParameter("data") == "" )
        {
            core.writeFormat("094", "emptyData");
            return false;
        }
        else
        {
            gconsole.log("data :" + this.getParameter("data"));
        }
        
        if(this.getParameter("params") == "" )
        {
            core.writeFormat("093", "emptyParams");
            return false;
        }
        else
        {
          gconsole.log("params :" + this.getParameter("params"));  
        }
        
        //Verify if params il JsonString
        if(!this.isJson(this.getParameter("params")))
        {
            core.writeFormat("089", "paramsMustBeJson");
            return false;
        }
        
        
        return true;
    }
    
     this.isJson =function (str)
     {
        try {
            JSON.parse(str);
        } catch (e) {
        return false;
    }
    return true;
}
}

module.exports = parameters;
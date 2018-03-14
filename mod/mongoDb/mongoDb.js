/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Gestionnaire de la base de donnée type json
*/

//Librairie node.js
var fs = require('fs');

/*
* Connect l'utilisateur à l'application
*/
var mongoDb = function(server)
{
    this.server = server;

 	
var MongoClient = require("mongodb").MongoClient;
    MongoClient.connect( this.server, (error, client) => {
    if (error) throw error;

    console.log("Connecté à la base de données " + this.server);

    db = client.db("spendin");
});
    
    /*
     * Obtient le données
     */
    this.getData = function(callBack, data, params)
    {
            //Get The Parma Object
            if(params == undefined)
            {
                params = JSON.parse(core.postParam.getParameter("params"));
            }
            
            if(params.method == undefined)
            {
                core.writeFormat("023", "missingMethod");
                return false;
            }
            var MongoClient = require("mongodb").MongoClient;

            MongoClient.connect( this.server, (error, client) => {

                db = client.db("spendin");

            if (error) throw error;

                switch(params.method)
                {
                    //Obtient le dernier element inseré
                    case "getAll" : 
                    db.collection("_User").find().toArray(function (error, results) {
                      
                        if (error)
                        {
                            console.log(error);
                        return ;
                        }
                         
                
                        entities = Array();


                        results.forEach(function(i, obj) {
                          console.log(i);
                          console.log(obj);
                          entities.push(i);
                        });

                       // console.log(entities);
                        core.writeFormat("020", "getDataOk", entities);

                        core.writeEnd();
                    });
                      
                    break;
                    case "getLast" : 
                        core.writeFormat("020", "getDataOk", datas.entities[datas.entities.length - 1]);
                    break;
                    case "getFirst" : 
                        core.writeFormat("020", "getDataOk", datas.entities[0]);
                    break;
                    case "getById" :
                        if(params.id == undefined)
                        {
                            core.writeFormat("025", "missingId");
                            return false;
                        }
                        core.writeFormat("020", "getDataOk", this.getById(datas, params.id ));
                                            
                    break;
                    default :
                        core.writeFormat("027", "unknowMethod");
                    break;
                    
            }

            //Appel de la fonction de fin
          //  core.writeEnd();
        }
    );
        
    };
    
    /*
     * Ajout ou modifie une élement
     */
    this.setData = function(entity, params)
    {
        if(entity != undefined)
        {
            dataFile = this.dataDirectory + "/" + entity + ".json";
        } 
        else
        {
            dataFile = this.dataDirectory + "/" + core.postParam.getParameter("data") + ".json";
        }
        
          //TODO VERIFIER QUE le fichier existe
        if(fs.existsSync(dataFile))
        {
            var datas = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            
            if(params == undefined)
            {
                var params = JSON.parse(core.postParam.getParameter("params"));
            }
            else
            {
                var params = JSON.parse(params);
            }
            
            var result = new Array();
            
            keys = Array();
            values = Array();

            for(prop in params)
            {
                keys.push(prop);
                values.push(params[prop]);
            }
        
            find = false;
            lastId = 0;
            nbProp = 0;
            
            //On parcourt pour mettre a jouur
            for(i=0; i < datas.entities.length; i++)
            {
                lastId = datas.entities[i].id;
                
                if(datas.entities[i].id == params.id )
                {
                    //On met à jour les donnée
                    datas.entities[i];
                    
                    for(prop in params)
                    {
                       datas.entities[i][prop] = params[prop];
                       find = true;
                       nbProp +=1;
                    }
                }
                
                gconsole.log(nbProp);
                
                if(nbProp == 1)
                {
                    gconsole.log("Delete");
                  
                }
                else
                {
                    gconsole.log("Update");
                    result.push(JSON.stringify(datas.entities[i]));
                }
            }
            
            if(find == false)
            {
                entite = new Object();
                for(prop in params)
                {
                    console.log("Update");
                   entite["id"] = parseInt(lastId) + 1;
                   entite[prop] = params[prop];
                }
                
                result.push(JSON.stringify(entite));
            }
      

            // TODO RAJOTER LES ENTITE DEJA CREE
            result = "{\"entities\":[" + result.join(",") + "]}";

            //Reecrit le fichier avec les nouvelle donnée
            fs.writeFileSync(dataFile, result);


            core.writeFormat("031","setDataOk");
            core.writeEnd();
        
        }
        else
        {
            core.writeFormat("021","unknowEntite");
        }
    };
    
    /*
     * Obtient une entité par son identifiant
     * dans la collections
     */
    this.getById = function(datas, id)
    {
        for(i=0; i < datas.entities.length; i++)
        {
            if(datas.entities[i].id == id )
            {
                 return datas.entities[i];
            }
        }
        
        return null;
    };

    this.getUser = function(login){

        var MongoClient = require("mongodb").MongoClient;

        MongoClient.connect( this.server, (error, client) => {

            db = client.db("spendin");

        if (error) throw error;

           
                //Obtient le dernier element inseré
                db.collection("_User").find().toArray(function (error, results) {
                  
                    if (error)
                    {
                        console.log(error);
                    return ;
                    }
                     
            
                    entities = Array();
                    var find = false;

                   results.forEach(function(i, obj) {
                     
                    console.log(i.email);
                    

                        if(i.email == login)
                        {
                            core.writeFormat("010","connectOk", i); 
                            find = true;   
                            return;
                        }

                    });
                    if(find == false)
                    {
                        core.writeFormat("015", "UnknowUser");
                    }

                    core.writeEnd();
                });
            });
    
    };
}

module.exports = mongoDb;
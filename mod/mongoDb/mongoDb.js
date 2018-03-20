
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
            
            if(data == undefined)
            {
                data = core.postParam.getParameter("data");
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
                    case "getWhere" :

                    gconsole.log("GET WHERE");
                        this.getWhere(data, params);
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
        if(params == undefined)
        {
            params = JSON.parse(core.postParam.getParameter("params"));
        }
        
        if(data == undefined)
        {
            data = core.postParam.getParameter("data");
        }
        var MongoClient = require("mongodb").MongoClient;

        MongoClient.connect( this.server, (error, client) => {

            db = client.db("spendin");

            console.log("data" + data);
            console.log("params" + JSON.stringify(params));
            console.log(db);;


             if (error) throw error;
               // db.Coupon.insert(params);

              db.collection(data).insert(params);

        });




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

    this.getWhere = function(data, params)
    {
        var prop = Object();

        for (var property1 in params) {
        
            var jsonObject = "{";

            if(property1 != "method")
            {
                prop[property1] = params[property1];
                jsonObject += property1 + ":'"  + params[property1] + "'";
            }

            jsonObject += "}";
          }
     
        db.collection(data).find(JSON.parse(JSON.stringify(prop))).toArray(function (error, results) {
                      
            if (error)
            {
                console.log(error);
            return ;
            }
             
            entities = Array();

            results.forEach(function(i, obj) {
              entities.push(i);
            });

           // console.log(entities);
            core.writeFormat("020", "getDataOk", entities);

            core.writeEnd();
        });
    };
}

module.exports = mongoDb;
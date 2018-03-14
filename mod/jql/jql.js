/**
*  Projet GabWeb
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* langage jql pour lire dans les data json
*/

var fs = require('fs');
var format = require('../../core/format');

var jql = function(){};

/*
 * Récupere les données json 
 * Via Json query Language
 */
jql.getByJql = function(jsonReq, params)
{
    gconsole.log(" 1) From " + jsonReq.from + " join " + jsonReq.join + " where " + jsonReq.where + " params :" + params);

    gapp = core.token.getParameter("app");
    core.app.readConfig(gapp);
    
    //Elements de la requete
    var from = jsonReq.from.split(",");
    
    if(jsonReq.join != undefined)
    {
        var join = jsonReq.join.split(",");
    }
    
    var where = jsonReq.where.split(" ");
    
    var condition = Array();
    var properties = Array(); 
    var entities = Array(); 
  
    
    //Extractions des conditins et des propriétés dans le where
    jql.extractConditionProperty(where, condition, properties);
    
    //Ouvre le fichier enrichie
    var data = JSON.parse(jql.loadFile(jsonReq));
    
    //Parcour des entités
    for(j=0; j < data.entities.length; j++  )
    {
        var result = Array();
         
        for( p=0; p < properties.length; p++ )
        {
            prop = properties[p].split("=");
            key = prop[0];
            
            gconsole.log("2 : " + params);
            if(params != undefined && params != '')
            {
                datas = JSON.parse(params);
                console.log("3 ) PARAMS : ");
                console.log(datas);
                console.log(key + ":" + prop[1]);
                console.log("4) Property : " + properties[p]);
    
               //Valeur passé en paramettre
                value = datas[prop[1]];
            }
            else
            {
               result.push(true);
            }

            //Entité principale
            if(key.indexOf(".") == -1 && data.entities[j][key] != null)
            {
                gconsole.log("Saarch "  + data.entities[j][key] + ":" + value) ;
            
               if(data.entities[j][key].indexOf(value) > -1)
               {
                   result.push(true);
                   gconsole.log("EQUAL");
               }
               else
               {
                   result.push(false);
                   gconsole.log("NOTEQUAL");
               }
               
            }
            else
            {
              keys = key.split(".");
              
              console.log("SEArch  :" + data.entities[j][keys[0]]  + "" + value) ;

              //On a pas passé de parametre
              if(value == undefined)
              {
                 result.push(true);
              }
              if(data.entities[j][keys[0]] != undefined /*&& data.entities[j][keys[0]][keys[1]] != undefined*/ 
                 && data.entities[j][keys[0]][keys[1]] ==  value)
              {
                  result.push(true);
              }
              else
              {
                  result.push(false);
              }
            }
        }
        
       
        //Verification des conditions
        //LE valide est un tableau il faut alors vérifier toutes les valeurs du tableau
        if(jql.isValid(condition, result) == true)
        {
            entities.push(data.entities[j]);
        }
    }
   
   return entities ;
};

/*
 * Extrait les conditions et les popriété 
 * d'un chaine de caractère 
 * @returns {undefined}
 */
jql.extractConditionProperty =function(where, condition, properties)
{
    for(w=0; w < where.length; w++)
    {
        if(where[w] == "or" || where[w] == "and")
        {
            condition.push(where[w]);
        }
        //on recherche sur les propriétés de l'entité de base
        else
        {
            properties.push(where[w]);
        }
    }
};

/*
 * Vérifie si toutes les conditions sont remplis
 * @param {type} valide
 * @param {type} condition
 * @param {type} result
 * @returns {undefined}
 */
jql.isValid = function( condition, result)
{
    var valide = '';
          

    console.log("Conditions:");
    console.log(condition);
    console.log(result);

    if(condition.length  == 0)
    {
       valide = result[0];
    }
            
    //On verifie chaque condition
    for(c=0; c < condition.length; c++)
    {
        if(condition.indexOf("or") > -1)
        {
            for(r =0; r < result.length; r++)
            {
                valide |= result[r]  ;
            }
            
        }
        else if(condition.indexOf("and") > -1)
        {
            if(valide == '')
            {
                valide = true;
            }

            for(r =0; r < result.length; r++)
            {
                valide &= result[r]  ;
            }
        }
    }
        
    return valide;
};

/*
 * Charge le fichiers enrichie de toutes les tables liés
 */
jql.loadFile = function(jsonReq)
{
    //1) On ouvre les fichiers json
    var from = jsonReq.from.split(",");
    
    if(jsonReq.join != undefined)
    {
      var join = jsonReq.join.split(",");
    }
     
    var datas = Array();

    for(i=0; i < from.length ; i++)
    {
       dataFile = core.app.config.bdd.dataDirectory + "/" + from[i] + ".json";
       datas.push(JSON.parse(fs.readFileSync(dataFile, 'utf8')));   
    }
    
    var result = new Array();
    
     //Parcours de la premiere entite pour l'enrichir
    for(j=0; j < datas[0].entities.length; j++  )
    {
        var entities = new Array();
        
        for(prop in datas[0].entities[j])
        {
            entities.push( '"' + prop + '"' + ":" +  '"' + datas[0].entities[j][prop]+ '"');
        }
        
        if(join != undefined && join != "")
        {
            //On l'enrichit avec es jointure
            for(k= 0; k < join.length; k++)
            {
                var joins = join[k].split("=");
                var liaisonBase = joins[0].split(".");
                var liasionSearch = joins[1].split(".");
      
                entities.push( "\""+ liasionSearch[0] + "\"" + ": " + jql.find(datas[k + 1], liasionSearch[1], datas[0].entities[j][liaisonBase[1]]) );
            }
         }
            
        gconsole.log(entities);
        result.push("{" + entities + "}");
    }
    
    //gconsole.log(JSON.stringify(result));
    
    dataFile = core.app.config.bdd.dataDirectory + "/" + from[0] + "_tmp.json";
    
    result = "{\"entities\":[" + result.join(",") + "]}";
    
         
    //Sauvegarde dans un fichier temporaire
    //fs.writeFileSync(dataFile, result);
    
    return result;
};

/**
 * Recherche un element dans un fichier
 * @param {type} file
 * @param {type} key
 * @param {type} value
 * @returns {undefined}
 */
jql.find =function (file, key, value)
{
    for(i=0; i < file.entities.length; i++  )
    {
        gconsole.log("Find : " + file.entities[i][key] + ":"+ value );
        if(file.entities[i][key] == value)
        {
            return JSON.stringify(file.entities[i]);
        }
    }
    
    return "null";
};

module.exports = jql;

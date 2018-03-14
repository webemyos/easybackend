/**
*  Projet GabWeb
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Gestionnaire de la base de donnée type mysql
*/
var mysql = require('mysql');
var format = require('../../core/format');

var gmysql = function(server, dataBase, user, password)
{
    this.server = server;
    this.dataBase= dataBase;
    this.user = user;
    this.password = password;
    
    /*
     * Obtient les données
     * @returns {undefined}
     */
    this.getData = function(callBack, data, params)
    {
        gconsole.log(this.server + ":" + this.user + ":" +this.password + ":"+ this.dataBase );
        
        gmysql.mySqlClient = mysql.createConnection({
          host     : this.server ,
          user     : this.user,
          password : this.password ,
          database : this.dataBase
        });
        
        var selectQuery = this.createQuery(data, params);
      
        var sqlQuery = gmysql.mySqlClient.query(selectQuery);
      
        //Evenement de lecture
        //Un call back est appelé pour traiter les appel
        if(callBack != undefined)
        {   
            sqlQuery.on("result", callBack.result);
            sqlQuery.on("end", callBack.end);
            sqlQuery.on("error", callBack.error);  
        }
        else
        {
            //Debut ecriture dans le flux de sortie
            core.write("{\"" + core.postParam.getParameter("data") + "\":[");
            gmysql.firstElement = true;
        
            sqlQuery.on("result", gmysql.result);
            sqlQuery.on("end", gmysql.end);
            sqlQuery.on("error", gmysql.error);
        }
    }
    
    /*
     * Insert ou met à jour une donnée
     * @returns 
     */
    this.setData = function()
    {
        gmysql.mySqlClient = mysql.createConnection({
          host     : this.server ,
          user     : this.user,
          password : "",
          database : this.dataBase
        });
        
        var insertQuery = this.createInsertQuery();
      
        var sqlQuery = gmysql.mySqlClient.query(insertQuery);
        
        sqlQuery.on("end", gmysql.end);
        sqlQuery.on("error", gmysql.error);
    }
    
    /*
     * Execute une requete
     * @param {type} sql
     * @param {type} params
     * @returns {undefined}
     */
    this.getRequest = function(sql, params)
    {
        gmysql.mySqlClient = mysql.createConnection({
          host     : this.server ,
          user     : this.user,
          password : "",
          database : this.dataBase
        });
      
        datas = format.convertFromHttp(params);
        datas = JSON.parse(datas);
      
        for(prop in datas)
        {
           sql =  sql.replace(prop, datas[prop]);
        }
      
        var sqlQuery = gmysql.mySqlClient.query(sql);
        //Remplace les parametres
      
        gconsole.log(sql);
        
        
        core.write("{\"" + core.postParam.getParameter("data") + "\":[");
            gmysql.firstElement = true;
        
            sqlQuery.on("result", gmysql.result);
            sqlQuery.on("end", gmysql.end);
            sqlQuery.on("error", gmysql.error);
        
    };
    
    /*
     * Créer la requete selon les parametres
     * @returns 
     */
    this.createQuery = function(data, params)
    {
        gconsole.log("data :" + data);
        
        //gconsole.log(core.postParam.getParameter("params"));
       if(data != undefined)
       {
            var selectQuery = 'SELECT * FROM ' +  data;
            selectQuery += '  WHERE ' + params;
       }
       else
       {
            var selectQuery = 'SELECT * FROM ' +  core.postParam.getParameter("data");

            params = core.postParam.getParameter("params").split("+");

            switch(params[0])
            {
                //Obtient le dernier element inserer
                 case "getAll" : 
                    selectQuery += " ORDER BY Id asc";
                break;
                case "getLast" : 
                    selectQuery += " ORDER BY Id desc Limit 0,1";
                break;
                case "getFirst" : 
                    selectQuery += " ORDER BY Id asc Limit 0,1";
                break;
                case "getById" :
                     selectQuery += " WHERE Id =" + params[1];
                break;
                default :
                    selectQuery += " WHERE " + params[0];
                break;
            }
        }
        gconsole.log(selectQuery);
         
         return selectQuery;
    };
    
    /*
     * Requete d'insertion en base de données
     * @returns {undefined}
     */
    this.createInsertQuery = function()
    {
        console.log(core.postParam.getParameter("params"));
       
        //Recuperation des parametres passé en json
        var elements  = JSON.parse(core.postParam.getParameter("params"));
        keys = Array();
        values = Array();
        
        for(prop in elements)
        {
            keys.push(prop);
            values.push(elements[prop]);
        }
      
        var insertQuery = 'INSERT INTO ' +  core.postParam.getParameter("data") + '('+keys.join(',')+') VALUES (\''+values.join(',')+'\')';
        
        //gconsole.log(insertQuery);
        
        return insertQuery;
    };
};

/*
 * appeler pour chaque ligne de resultat
 */
gmysql.result = function(row)
{  
    if(!gmysql.firstElement)
    {
      core.write(","); 
    }
    else
    {
      gmysql.firstElement = false;
    }
    
    core.write(JSON.stringify(row)); 
};

/*
 * Termine la connection
 */
gmysql.end = function()
{
    gmysql.mySqlClient.end();
    
    core.write( "]}"); 
    core.writeEnd();
};

/*
 * Erreur
 */
gmysql.error = function(error)
{
    core.write(JSON.stringify(error));
};

module.exports = gmysql;
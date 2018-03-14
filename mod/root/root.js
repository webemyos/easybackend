/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
* Gestionnaire de l'administration
*/

//Librairie node.js
var fs = require('fs');

var root = function()
{
    /*
    * Vérify parameters
    */
    this.isValid = function()
    {
        return true;
    }

    /*
    * Do action
    */
    this.process = function()
    {
        data = core.postParam.getParameter("data");
        console.log("Params : " +  core.postParam.getParameter("params"));
                
        params = JSON.parse(core.postParam.getParameter("params"));
        
        switch(data)
        {
           case "createApp" : 
                this.createApp(params.app, params.key);
                core.writeFormat("90", params.app);
           break;
           case "createEntity" :
               this.createEntity(params.name);
                core.writeFormat("92", params.app);
           break;
           case "saveFunction" :
               this.saveFunction(params);
               console.log(params);
                core.writeFormat("94", "Function Saved");
           break;
        default : 
             core.writeFormat("91", "Unknow Method");
           break;
        }
    }

    /*
    * Create the app
    */
    this.createApp = function(app, key)
    {
        //1 Create the cofig file
        var config = '{"app":"'+ app +'", "apiToken": "'+ key +'", "dataServerType":"jsonDb","bdd":{"dataDirectory":"./apps/'+ app +'/data"},"entities":[]}' ;
        fs.writeFileSync('./apps/' + app+ '.json',  config);

        //2 Create the Folder
        fs.mkdirSync('./apps/' + app);
        fs.mkdirSync('./apps/' + app + '/data');
        fs.mkdirSync('./apps/' + app + '/ressource');
    }

    /*
    * Create Entity
    */
    this.createEntity = function(key)
    {
        app = core.token.getParameter("app");

        console.log("APP : " + app);

        core.app.readConfig(app);

        //Add Entity in the Config File
        core.app.config.entities.push({name:key});
        fs.writeFileSync('./apps/' + app+ '.json',  JSON.stringify(core.app.config));

        //Create File
        fs.writeFileSync('./apps/' + app + '/data/' + key +  '.json',  JSON.stringify({entities:Array()}));

    }

    /*
    * Create/Save a function
    */
    this.saveFunction = function(func)
    {
        app = core.token.getParameter("app");
        core.app.readConfig(app);

        var regex = new RegExp('equal', 'gm');

        //Replace les equal par des = 
        func.json.join = func.json.join.replace(regex, "="); 
        func.json.where = func.json.where.replace(regex, "="); 
        
        let find = false;
        
        for(i= 0; i < core.app.config.functions.length; i++)
        {
            if(core.app.config.functions[i].name == func.name)
            {
                core.app.config.functions[i] = func;
                find = true;
            }
        }

        if(find == false)
        {
            core.app.config.functions.push(func);
        }

        fs.writeFileSync('./apps/' + app+ '.json',  JSON.stringify(core.app.config));
    }

    
};

module.exports = root;
/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jerome Oliva
* 28/10/2016
*
*/
var setdata = require('../../mod/setdata/setdata');
var jql = require('../../mod/jql/jql');
var mongoDb = require('../../mod/mongoDb/mongoDb');
var FB = require('fb');

var auth = function()
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
           // return false;
        }

        return true;
    }
    
    /*
     * Execute Auth Function
     */
    this.process = function()   
    {
        this.execute();
    };
    
    /*
     * Execute auth
     */
    this.execute = function()
    {
        data = core.postParam.getParameter("data");
        params = core.postParam.getParameter("params"); 
        
            
        switch(data)
        {
            case "create":
                this.create();
            break; 
            case "connect" :
                this.connect();
            break;
            case "connectFacebook" :
                this.connectFacebook();
            break;
            default :
                core.writeFormat("011","unknowFunction");
            break;
        }
       
       // core.writeEnd();
            
    };
   
    /*
     * Create the use
     * @returns {undefined}
     */
    this.create = function()
    {
        var search = JSON.parse(params); 
        
        if(search.login == undefined)
        {
            core.writeFormat("013", "missingLogin");
            return false;
        }
        
        if(search.password == undefined)
        {
            core.writeFormat("015", "missingPassword");
            return false;
        }
        
        request =  {"from": "user", "where":"login=1"};
        entities =  jql.getByJql(request, JSON.stringify({"1":search.login}));

       if(entities.length > 0)
       {
            core.writeFormat("019","UserExist");
            core.writeEnd();
       }
       else
       {
        //TODO AJOUTER LA CREATION DE COMPTE SUR MONGODB
        var mod = new setdata();
                mod.setData("user", params, false);
              
            request =  {"from": "user", "where":"login=1"};
            entities =  jql.getByJql(request, JSON.stringify({"1":search.login}));

            core.writeFormat("012","createOk", entities[0]  );
            core.writeEnd();
       }
    };
    
    /*
     * Connect The User
     * @returns {undefined}
     */
    this.connect = function()
    {
        var search = JSON.parse(params); 
        
        if(search.login == undefined)
        {
            core.writeFormat("013", "missingLogin");
            return false;
        }
       
        //Get User And Send Info
       this.getUser(search.login, search.password);
    };
    
    /*
     * Recherche l'utilisateur
     */
    this.getUser = function(login, password)
    {
        gapp = core.token.getParameter("app");

        //Lit la configuration de l'application
        core.app.readConfig(gapp);

        //Recuperation de l'user depuis la base ou mongoDb
        console.log("Type de serveur" + core.app.config.dataServerType);

        switch (core.app.config.dataServerType)
        {
            case "jsonDb":
                request =  {"from": "user", "where":"login=1"};
                entities =  jql.getByJql(request, JSON.stringify({"1":login}));
  
                if(entities.length == 0)
                {
                    core.writeFormat("015", "UnknowUser");
                }
                else
                {
                    var user = entities[0]; 
                   
                    if( user.password != password)
                    {
                        core.writeFormat("017", "IncorrectPasword");
                        
                    }
                    else
                    {
                        core.writeFormat("010","connectOk", user);
                    }
                }
                
                core.writeEnd();

                break;
            case "mongoDb" :
                dataServer = new mongoDb(core.app.config.bdd.url);
                dataServer.getUser(login);

                break;
        }
    }
    
    /*
    * Connecte l'utilisateur à facebook
    */
    this.connectFacebook = function()
    {
        fb = new FB.Facebook();

        console.log("CONNECT OK");
        console.log(fb);

        console.log("ACCESS TOKEN");

        FB.api('oauth/access_token', {
            client_id: '909086052611148',
            client_secret: '351e853a09c2fb81ebeb7ffa3346caf9',
            grant_type: 'client_credentials'
        }, function (res) {
            if(!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }

            console.log(res);
            var accessToken = res.access_token;

            FB.options({appId :'909086052611148', client_secret: '351e853a09c2fb81ebeb7ffa3346caf9'});

            FB.options({timeout: 1, accessToken: accessToken});
 
            
        //Api 4
        FB.api('4', function (res) {
            if(!res || res.error) {
             console.log(!res ? 'error occurred' : res.error);
             return;
            }
            console.log(res.id);
            console.log(res.name);
          });    


        console.log("Login URL");

      
        FB.api('/me', function (res) {
            if(res && res.error) {
                if(res.error.code === 'ETIMEDOUT') {
                    console.log('request timeout');
                }
                else {
                    console.log('error', res.error);
                }
            }
            else {
                console.log(res);
            }
        });


    var loginUrl =   FB.getLoginUrl({
            scope: 'email,user_likes',
            redirect_uri: 'http://example.com/'
        }) ;

        });


        core.writeFormat("010","AFAIRE");
    }
}
module.exports = auth;



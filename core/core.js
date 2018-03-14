/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jérôme Oliva
*
* Coeur principal
*/

/*
* Librairie Node
*/
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var bodyParser = require('body-parser');

//Include base function
var config = require('./config');
var post = require('./post');
var token = require('./token');
var parameters = require('./parameters');
var app = require('./app');
var stat = require('./stat');


//Include easybackend module
var connect = require('../mod/connect/connect');
var auth = require('../mod/auth/auth');
var getdata = require('../mod/getdata/getdata');
var setdata = require('../mod/setdata/setdata');
var call = require('../mod/call/call');
var getressource = require('../mod/getressource/getressource');
var rest = require('../mod/rest/rest');
var html = require('../mod/html/html');
var getinfo = require('../mod/getinfo/getinfo');
var root = require('../mod/root/root');
var setressource = require('../mod/setressource/setressource');

/*
* Core
*/
core = function()
{      
    /*
    * Property
    */
    core.request = "";
    core.reponse = "";
    core.page = "";
    core.params = "";
    core.postParam ="";
    core.headWrited = false;
    core.token = "";
    core.app="";
};
	
/*
* Init the Core
*/
core.init = function(request, reponse)
{       
    //Initil the property
    core.request = request;
    core.reponse = reponse;

    //Get the parameters
    core.page = url.parse(core.request.url).pathname;
    
    //Rest Call
    if(core.page.indexOf("/rest/") > -1)
    {
        core.page = "/rest";
    }
    
    core.params = querystring.parse(url.parse(core.request.url).query);

    //Init the token
    core.token = new token();
    core.token.set(this.params["token"]);

    //Init the Post Parameter
    core.postParam = new parameters();
    
    //Init app
    core.app = new app();

    //Init the stat
    core.stat = new stat();
};

/*
* Traite la requete
*/
core.process = function()
{
  var mod = "";
  
  core.stat.add(core.request.url, core.page, core.postParam.strParameter);
  
  //Pas d'action pour les icones
  if(core.request.url.indexOf("favicon.ico") > -1 )
  {
      return;
  }
  
  switch(core.page)
   {
        case '/connect' : 
            mod = new connect();
        break;
        case '/getdata' :
            mod = new getdata();
        break;
        case '/setdata' :
            mod = new setdata();
        break;
        case '/call' :
            mod = new call();
        break;
        case '/getressource' :
            mod = new getressource();
        break;
        case '/setressource' :
            mod = new setressource();
        break;
        case '/getinfo' :
            mod = new getinfo();
        break;
        case '/auth' :
            mod = new auth();
        break;
        case '/rest' :
            mod = new rest();
        break;
        case '/root' :
             mod = new root();
        break ;
        default :
             mod = new html();
        break ;
        
   }  

   //Lancement du processus du module
   if(mod.isValid())
   {
        mod.process();
   }
   else
   { 
       core.writeFormat("11", "IncorrectCall");
   }
   
   // core.writeEnd();
};

/*
* Ecrit dans flux de sortie standard
*/
core.write = function(text)
{
    if(!core.headWrited)
    {
        core.reponse.writeHead(200, {'Access-Control-Allow-Origin':'*'});
        core.headWrited = true;
    }
    core.reponse.write(text);
};
	
/*
* Ecrit dans flux de sortie standard
*/
core.writeFormat = function(code, message, params)
{
    if(!core.headWrited)
    {
        core.reponse.writeHead(200, {'Access-Control-Allow-Origin':'*'});
        core.headWrited = true;
    }
    
    if(params != undefined)
    {
        core.reponse.write('{"code":"'+ code + '","message":"'+ message+'","data":'+JSON.stringify(params)+'}');
    }
    else
    {
        core.reponse.write('{"code":"'+ code + '","message":"'+ message+'"}');
    }
};

/*
* Envoie la fin de la r�sponse
*/
core.writeEnd= function()
{
    core.headWrited = false;
    core.reponse.end();
};

/*
 * Récupere les données envoyés en post
 */
core.data = function(data)
{ 
    if(data != "" && data != "undefined")
    {
        core.postParam.add(data);

        gconsole.log("Parseur");
       // gconsole.log(bodyParser.;
    }
};

/*
 * Appelé lorsque toutes les données on été reçues
 */
core.end = function()
{
    core.process();

    //core.writeEnd();
};
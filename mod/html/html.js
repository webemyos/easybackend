/**
*  Projet EasyBackEnd
*  Serveur de page html, css, script and img
*  Jérôme Oliva
*
* Coeur principal
*/


var fs = require('fs');

/*
* Connect l'utilisateur à l'application
*/
var html = function()
{
    /*
     * Verify the token and the parameter
     * @returns {undefined}
     */
    this.isValid = function()
    {
        return true;
    }
    
    this.process = function()
    {
        path = core.page.split("/");
        appName = path[1];
        controller = path[path.length - 2];
        file = path[path.length - 1];
        fileType = file.split(".")[1];

        gconsole.log("Serveur html");
        gconsole.log("Page : " + core.page);
        gconsole.log("App : " + core.page);
        gconsole.log("File Type : " + fileType);

        switch(fileType)
        {
            case "jpg":
            case "ico":
            case "png":
                if(fs.existsSync("./apps/"+  appName + "/site/web/img/" +  file) )
                {
                    core.reponse.setHeader('content-type', 'image/' + fileType);

                    file = fs.readFileSync("./apps/"+  appName + "/site/web/img/" +  file);

                    core.write(file);
                }

                break;
            case "eot":
            case "woff":
            case "ttf":
            case "svg":
           
                if(fs.existsSync("./apps/"+  appName + "/site/web/fonts/" +  file) )
                {
                    core.reponse.setHeader('content-type', 'fonts/' + fileType);

                    file = fs.readFileSync("./apps/"+  appName + "/site/web/fonts/" +  file);

                    core.write(file);
                }

                break;

            case "css" :
                if(fs.existsSync("./apps/"+  appName + "/site/web/css/" +  file) )
                {
                    core.reponse.setHeader('content-type', 'text/css');

                    file = fs.readFileSync("./apps/"+  appName + "/site/web/css/" +  file);

                    core.write(file);
                }

                break;
            case "js" :
                //Js at the racine
                if(fs.existsSync("./apps/"+  appName + "/site/web/js/" +  file) )
                {
                    core.reponse.setHeader('content-type', 'text/javascrit');

                    file = fs.readFileSync("./apps/"+  appName + "/site/web/js/" +  file);

                    core.write(file);
                }
                //Find the Js ine the controller module
                if(fs.existsSync("./apps/"+  appName + "/site/web/js/"+ controller + "/"  +  file) )
                {
                    core.reponse.setHeader('content-type', 'text/javascrit');

                    file = fs.readFileSync("./apps/"+  appName + "/site/web/js/"+ controller + "/"  +  file);

                    core.write(file);
                }

                break;
            case "html":
            case undefined:

                //Verification de l'app
                if(fs.existsSync("./apps/"+  appName + "/site/" +  appName + ".js") )
                {
                    gconsole.log("Lancement de l'app" + appName);
                    var app = require("../../apps/" +  appName + "/site/" + appName);
                    var site = new app();

                    site.execute(path);
                }
                else
                {
                    gconsole.log("Non Trouve");
                    core.write("<h1>Bienvenue sur EasyBackEnd</h1>");
                    core.writeEnd();
                }

            break;

        }

        return ;
    }
};

module.exports = html;

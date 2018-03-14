/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jérôme Oliva
* 28/10/2016
*
*/

// Include the Core
require("./core/core");
require("./core/gconsole");

var easyBackEnd = function(request, reponse)
{
    //Init
    core.init(request, reponse);
    
    if (request.method != 'POST') 
    {
       core.process();
    }  
    else
    {
        //Listener for POST data
        core.request.addListener("data", core.data);
        core.request.addListener("end", core.end);
    }
};

module.exports = easyBackEnd;
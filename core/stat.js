/**
*  Projet EasyBackEnd
*  Web serveur d'application global
*  Jerome Oliva
* 28/10/2016
*
* Gestionnaire des stats utilisateurs
*/

var fs = require('fs');


var stat = function()
{

    this.add = function(request, module, params )
    {
        app = core.token.getParameter("app");
        file = '/apps/stats' + app + "log" ;

      
    };

};



module.exports = stat;
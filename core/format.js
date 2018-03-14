/**
*  Projet GabWeb
*  Web serveur d'application global
*  J�r�me Oliva
* 28/10/2016
*
* Gestionnaire des données des fomrmatage de donnée
*/

var format = function(){};

/*
 * Nettoie les donnée Http
 */
format.convertFromHttp = function(data)
{
   var data = data.replace(/%3D/g, "=")
                         .replace(/[+]/g," ")
                         .replace(/%22/g, "\"")
                         .replace(/%25/g, "%")
                         .replace(/%27/g, "'")
                         .replace(/%28/g, "(")
                         .replace(/%29/g, ")")
                         .replace(/%2C/g, ",")
                         .replace(/%3A/g, ":")
                         .replace(/%7B/g, "{")
                         .replace(/%7D/g, "}");  
    return data;     
};


module.exports = format;




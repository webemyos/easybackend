
var jql = require('../../mod/jql/jql');

var process = function(){


    this.exec = function(params)
    {
        switch(params.method)
        {
            case "annonce":
                this.annonce();
            break;
            case "groupUserByService":
                this.groupUserByService();
            break;
        }
    }
      
    /*
    * Groupe les utilisateurs par ville
    */
    this.groupUserByService = function()
    {
        console.log("Groupe By Service");
        //Crée un nouveau fichier en regroupant les utilisateurs par catégorie
        //1) Parcours les services 
        request = {"from":"category", "where":"code=1"}; 
        services = jql.getByJql(request, JSON.stringify({"1":1}));

        console.log(services);

        requests = {"from": "userService"};
        userService = jql.getByJql(request);

        var userByService = Array();

        for(i= 0; i < services.length; i++ )
        {
            console.log(services[i]);
            userByService[services[i].id]  = Array();


        }

        console.log("Result");
        console.log(userByService);
        //OU Créer un fichier par catégorie afin d'avoir des fichiers super allégé
        //Afin d'optimiser les temps de traitements

        //Ce fichier sera utilisé pour trouver rapidement les utilisateurs correspondant aux annonces
        core.write("Ok");
        core.writeEnd();
    }

    this.annonce = function()
    {
        core.write('SendAnnonce');

        //Recuperation des annonces
        request =  {"from": "searchUser", "where":"state=1"};
        entities =  jql.getByJql(request, JSON.stringify({"1":1}));

        //Parcours des annonces
        for(i = 0; i < entities.length; i++)
        {
            //Recherche des utilisateurs via le fichier de regroupement par services

            //Enregistre un nouveau candidat pour une annonce et envoi les notifications
        }

        console.log("Recuperation des annonces : " + entities.length);
        console.log(entities);

        core.writeEnd();
    }
 }


module.exports = process;
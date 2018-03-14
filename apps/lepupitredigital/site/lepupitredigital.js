/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fs = require('fs');
var masterController = require("./controller/masterController");
var masterModele = require("./modele/master/masterModele");

var lepupitredigital = function()
{
    /*
     * Execute the selected page
     */
    this.execute = function(path)
    {
        core.reponse.setHeader('content-type', 'text/html');

        //Master Controller
        var mController = new masterController();
            mController.modele = new masterModele();
            mController.view = "./apps/lepupitredigital/site/view/master/master.html";

        //Add the title
        mController.modele.add("{{title}}", "Accueil");

        gconsole.log(" Number path : " + path.length);

        if(path.length == 3)
        {
          //Default controller
          var controllerName = "index";
          var action = "index";
          var path = "./apps/lepupitredigital/site/controller/indexController.js";
        }
        else
        {
            //Selected controller
            var controllerName = path[2];
            var action = path[3].replace(".html", "");
            var path = "./apps/lepupitredigital/site/controller/" + controllerName + "Controller.js";
        }

        if(fs.existsSync(path))
        {
            var controller = require("./controller/" +  controllerName + "Controller");
            var controler = new controller();

             //Add the selected controller to the master
             mController.modele.add("{{content}}", controler.execute(action));

            gconsole.log("controller : " + controller + " : Action : " + action );
        }
        else
        {
          gconsole.log("Incorrect controller");
           //Add the selected controller to the master
           mController.modele.add("{{content}}", "Incorrect controller");
        }


       //Render all controller
       var html = mController.render();

       core.write(html);
       core.writeEnd();
    }


}

module.exports = lepupitredigital;

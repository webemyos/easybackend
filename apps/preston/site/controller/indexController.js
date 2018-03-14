/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fs = require('fs');
var controller = require("../core/controller");
var indexModele = require("../modele/index/indexModele");
var contactModele = require("../modele/index/contactModele");

class indexController extends controller
{

    /*
     * Execute an action
     * @param {type} action
     * @returns {undefined}
     */
    execute(action)
    {
        switch(action)
        {
            case "index" :
                return this.index();
            break;
             case "contact" :
                return this.contact();
            break;
        }

        return "incorrect action";
    }

    /*
     * Home page
     */
    index()
    {
        this.view = "./apps/preston/site/view/index/index.html";
        this.modele = new indexModele();

        this.modele.add("{{title}}", "Contactez nous");

        return this.render();
    }

    /*
     * contact page
     */
    contact()
    {
      this.view = "./apps/preston/site/view/index/contact.html";
      this.modele = new indexModele();

      this.modele.add("{{title}}", "Test");

      return this.render();
    }
}

module.exports = indexController;

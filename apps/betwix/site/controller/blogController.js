/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fs = require('fs');
var controller = require("../core/controller");
var indexModele = require("../modele/blog/indexModele");

class blogController extends controller
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
        }

        return "incorrect action";
    }

    /*
     * Home page
     */
    index()
    {
        this.view = "./apps/lepupitredigital/site/view/blog/index.html";
        this.modele = new indexModele();

        this.modele.add("{{title}}", "Le blog");

        return this.render();
    }

}

module.exports = blogController;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fs = require('fs');


var masterController = function()
{
   /*
    * Render the view
    */
   this.render = function()
   {
       gconsole.log("Repertoire courant : "  + fs.realpathSync(this.view));
       gconsole.log(" Render " + this.view);

      // var view
      if(fs.existsSync(this.view))
      {
        html = String(fs.readFileSync(this.view));
        html = this.modele.replace(html);

        return html;
      }
      else
      {
         core.write("non trouve");
      }

   }
};

module.exports = masterController;

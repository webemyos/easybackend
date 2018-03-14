
var fs = require('fs');

class controller
{

  /*
  * Render the page
  */
  render()
  {
      // var view
      if(fs.existsSync(this.view))
      {
        var html = String(fs.readFileSync(this.view));
        html = this.modele.replace(html);

        return html;
      }
      else
      {
         core.write("Not found");
      }
  }
}

module.exports = controller;

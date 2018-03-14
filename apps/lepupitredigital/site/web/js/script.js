/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var lepupitredigital = function()
{

    this.init = function()
    {
       //include the js file page
        this.includeJs(document.location.href.replace(".html", ".js"));
    }

    /*
    * Inclu le fichier javascript
    */
    this.includeJs = function( source)
    {
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.setAttribute('src', source);

        document.body.appendChild(script);
    };
};

var app = new lepupitredigital();
app.init();

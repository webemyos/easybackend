/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var getdata = require('../getdata/getdata');
var call = require('../call/call');

var rest = function()
{
     /* Verify the token and parameters
     * @returns {undefined}
     */
    this.isValid = function ()
    {
       this.params = core.request.url.split("/");
        
        //Vérification de la route
        if(this.params.length < 3)
        {
            core.writeFormat("051", "invalidRoute");
            core.writeEnd();
        }
        
        core.token.set(this.params[2]);
        
        //Vérification du token
        if(!core.token.verify())
        {
            return false;
        }

        return true;
    }
    
    /*
     * Execute the call
     */
    this.process = function()
    {
        called = this.findCall(this.params);
        
        if(called)
        {
            switch(called.module)
            {
                case "getdata" :
                    mod = new getdata();
                    mod.getData(getdata.end, called.data, called.params);
                break;   
                case "call":
                    mod = new call();
                    mod.executeCall(called.data, called.params);
                    
                    break;
            }
        }
        else
        {
            core.writeFormat("053", "unknowRoute");
            core.writeEnd();
        }
    }
    
    /*
     * find the call in the config
     */
    this.findCall = function(params)
    {
        gapp = core.token.getParameter("app");

        //Lit la configuration de l'application
        core.app.readConfig(gapp);
       
        if(core.app.config.rest == undefined)
        {
            return false;
        }
        
        for(i= 0; i < core.app.config.rest.length; i++)
        {   
            //Recherche la route sur deux ou trois elements
            if(params.length > 4)
            {
                if(core.app.config.rest[i].route  ==  "/" + params[3] + "/"+params[4])
                {
                    return core.app.config.rest[i];
                } 
            }
            else
            {
                gconsole.log(core.app.config.rest[i].route + " :" + params[3]);

                if(core.app.config.rest[i].route  ==  "/" +params[3])
                {
                    return core.app.config.rest[i];
                }      
            }   
        }
        
        return false;
        
    }
}

module.exports = rest;


var userApp = function()
{
    this.isValid = function ()
    {
        //Verification du token
        if(!core.token.verify())
        {
            return false;
        }
        
        //Verification des parametres passé
        if(!core.postParam.verify())
        {
            return false;
        }

        return true;
    }

    this.process = function()
    {
        data = core.postParam.getParameter("data");
        params = JSON.parse(core.postParam.getParameter("params"));
       
        var mod = require( './'  + data + ".js");
        var module = new mod();

        module.exec(params);
    }
}

module.exports = userApp;
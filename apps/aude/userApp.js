

var userApp = function()
{
    this.isValid = function ()
    {
        return true;
    }

    this.process = function()
    {
        core.write("Process depuis Aude");
        core.writeEnd();
        console.log("process depuis Aude");
    }
}

module.exports = userApp;


/*
Js off the home page
*/
index = function()
{
    /*
    * Init the index page
    */
    this.init = function()
    {
        console.log("Controller blog");
        event.AddEvent("btnSend", "click", this.send);
    };

    /*
    * Send à message
    */
    this.send = function()
    {
      alert("Send");
    };
};

var page = new index();
page.init();

/*
Js off the home page
*/
contact = function()
{

    /*
    init the event
    */
    this.init = function()
    {
        event.AddEvent("frSend", "submit", this.send);
    }

    /*
    * Send message
    */
    this.send = function()
    {
      var apiToken = easybackend.connect("lepupitredigital");
          easybackend.apiToken = apiToken;
    
          easybackend.setData("message", '{"email":"'+ controls.get("email").value + '"   ,"message":"'+ controls.get("message").value +'"}');

          easybackend.getData("message", "getAll");

      return false;
    }
};

var page = new contact();
page.init();



event = function(){};


/**
Ajoute un evenement
*/
event.AddEvent = function(controlName, event, methode)
{
  control = document.getElementById(controlName);

  if(control != null)
  {
      if(control.addEventListener)
      {
        control.addEventListener(event, methode, false);
      }
      else
      {
        control.attachEvent("on"+event,methode);
      }
    }
};

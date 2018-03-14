easybackend = function(){};

/*
* EasybackEnd serveur
*/
//easybackend.serveur = "http://localhost:8080/";
easybackend.serveur = "https://easybackend.herokuapp.com/";

/*
* Api Token
*/
easybackend.apiToken = "";

/*
* Connecte to the app
*/
easybackend.connect = function(app)
{
      var action = "connect?token=app:"+app;
      return http.get(easybackend.serveur + action);
};

/*
* Get data filter by params
*/
easybackend.getData = function(data, params)
{
      var action = "getdata?token=" +easybackend.apiToken;
      return http.post(easybackend.serveur + action, "data=" + data + "&params="+params);
};

/*
* Get data filter by params
*/
easybackend.setData = function(data, params)
{
      var action = "setdata?token=" +easybackend.apiToken;
      return http.post(easybackend.serveur + action, "data=" + data + "&params="+params);
};

http = function (){};

/*
* Send A get Ajax
*/
http.get = function(url)
{
  var request = new ajax();
  request.method= "get";

  return request.GetRequest(url);
};

/*
Send  a post Ajax
*/
http.post = function(url, parameters)
{
    var request = new ajax();
        request.data = parameters;

    return request.GetRequest(url);
};

//********************Objet Ajax **********************

ajax = function()
  {
  //propri�tes
   var requete='';
   this.method='post';
   this.mode='s';
   this.data="";
   this.RetunData="";
   this.Control ="";

   //creation de la requete
   this.CreateRequete=function()
	  {
	    if (window.XMLHttpRequest)
	    {
	         requete = new XMLHttpRequest();
	    }
	    else if (window.ActiveXObject)
	    {
	          requete = new ActiveXObject("Msxml2.XMLHTTP");
	    }
	    else
	    {
	         requete = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	  };

	//envoi de la requete
	this.GetRequest=function(fichier)
  	{

  		this.CreateRequete();
  		typef = fichier.substring(fichier.indexOf("."));

		//selection du type de methode
    	if(this.method=='get')
		{
			methode="GET";
			donnees=null;
	    }
    	else
      	{
	    	  methode="POST";
			      donnees=this.datas;
     	}
		//selection du mode
	    if (this.mode=='s')
	    {
	    	modes=false;
	    }
	    else
	    {
	    	modes=true;
	    }

	//envoi de la requete
  	requete.open(methode,fichier,modes);

	//affichage en fonction du mode
  	if (this.mode=='s')
    {
   		requete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                requete.send(this.data);
  		return select();
    }
    else
    {
    	//alert(this.Control);
    	requete.control = this.Control;

   		requete.onreadystatechange = function ()
   		{
			if(requete.readyState==4)
		      {
		        if(requete.status !=500 && requete.status !=400)
		        {
		    	  	requete.control.innerHTML = select();
                        }
		      }
   		};

   		requete.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   		requete.send(this.data);
    };


	this.test = function ()
	{
		alert('ok');
	};

	//action appele en most asychrone
	this.actionrequete = function()
	{
		if(requete.readyState==4)
		      {
		        if(requete.status !=500 && requete.status !=400)
		        {
		        	block.innerHTML=select();
		        }
		      }
	};

 	function select()
 	{
            if (typef=='.xml')
            {
            	type=requete.responseXML;
            }
            else
             {
            	type=requete.responseText;
             }
 		return type;
 	}
  };

  this.Refresh = function(url,classe,methode)
  {
  	control = new Array();

  	if(url.indexOf('?')>0)
 	{
		controls = serialization.Decode32(this.GetRequest(url+"&CallType=Ajax&Action="+methode));
	}
	else
	{
		controls = serialization.Decode32(this.GetRequest(url+"?CallType=Ajax&Action="+methode));
	}

	for(control  in controls)
	{
		var ctr = document.getElementById(control);

		if(ctr != null)
		{
			var parent = ctr.parentNode;
			var Ndiv = document.createElement("div" );
			Ndiv.id = control;
            Ndiv.innerHTML = controls[control];
            parent.removeChild(ctr);
            parent.appendChild(Ndiv);
		}
	}
  };

  this.RefreshModule = function(classe,methode,argument)
  {
     arg=new Array();
	 arg = serialization.Decode(argument);

	 var JAjax = new ajax();
	 JAjax.data = "Class="+classe+"&Methode="+methode;
	 JAjax.data +="&Type=Module";

	 for(ar in arg)
     {
  		 this.data += "&"+ar+"="+arg[ar];
	 }

	 controls = serialization.Decode32(JAjax.GetRequest("Ajax.php?"+argument));

	for(control  in controls)
	{
		var ctr = document.getElementById(control);

		if(ctr != null)
		{
			var parent = ctr.parentNode;
			var Ndiv = document.createElement("div" );
            Ndiv.innerHTML = controls[control];
            parent.removeChild(ctr);
            parent.appendChild(Ndiv);
		}
	}
  };
};

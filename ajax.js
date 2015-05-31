/**
 * Simple XHR promise
 * 
 * @author	Alexis López Espinoza
 * @param	object	args (url, method, data, dataType, async)
 * @return	object 	XHR Promise
 */

var ajax = function(args){
	return new Promise(function(done, error){
		var xhr = new XMLHttpRequest(), method, url, response, data, async, aux = [];

		method = args.method.toUpperCase() || "GET";

		if (args.data){
			if (typeof args.data == "string"){
				if (method == "GET"){
					url = args.url + "?" + args.data;
					data = null;
				}
				else{
					url = args.url;
					data = args.data;	
				}
			}
			else{
				for (prop in args.data){
					aux.push(prop + "=" + args.data[prop]);
				}
				
				if (method == "GET"){
					url = args.url + "?" + aux.join("&");
					data = null;
				}
				else{
					url = args.url;
					data = aux.join("&");
				}				
			}
		}
		else{
			url = args.url;
			data = null;
		}

		async = args.async || true;

		xhr.open(method, url, async);
		xhr.addEventListener("load", function(){
			if (args.dataType){
				switch (args.dataType.toUpperCase()){
					case "HTML":
						response = xhr.responseText;
						break;
					case "XML":
						response = xhr.responseXML;
						break;
					case "JSON":
						response = JSON.parse(xhr.responseText);
						break;					
				}
			}
			else{
				response = xhr.responseText;
			}

			if (xhr.status == 200){
				done(response);
			}
			else{
				error(xhr.statusText);
			}
		}, false);
		xhr.addEventListener("error", function(){
			error(xhr.statusText);
		}, false);

		if (args.method.toUpperCase() == "POST"){
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}

		xhr.send(data);
	});
};

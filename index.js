//express lib
var express = require('express');
//inspect
var util = require('util');

//instantiate express
var app = express();

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//JSON post
app.use(bodyParser.json()); //libreria esterna per interpretare quello che riceviamo, così node interpreta il json che riceve

app.set('port', (process.env.PORT || 1337));

//use: for both POST and GET
//richiamato ogni volta che c'è una richiesta
app.use('/', function(request, response) 
{
    //set the headers of the responce
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "*"; //for cross enviroment request, così da accettare richieste da environments diversi, come javascript e nodejs, quindi va messo altrimenti non funziona niente
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";//methods allowed to responce
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"; //type of headers
    //answer
    headers["Content-Type"] = "application/json";//format response, perchè rispondo nuovamente con un json
    response.writeHead(200, headers);

	var text = '';

	if ( typeof request.body !== 'undefined' && request.body)
	{
        //the ontent of the POST receiced
		text = "request.body: " + util.inspect(request.body) + "\n";
		
        //content of the post
		var username;
		var password;
		
		//if query is defined and not null
		if ( typeof request.body.username !== 'undefined' && request.body.username)
            //save content of username
			username = request.body.username;
		else 
			username = "not defined";
		
		if ( typeof request.body.password !== 'undefined' && request.body.password)
            //save content of password
    		password = request.body.password;
		else 
			password = "not defined";
			    	
        text = text + "post received: " + username + ", "+ password;
	}
	else
	{
		text = "body undefined";
	}

    console.log(text);
    
    //answer a JSON file
	var otherArray = ["item1", "item2"];
	var otherObject = { item1: "item1val", item2: "item2val" };
	var json = JSON.stringify({ //creo oggetti e ci metto dentro quello che voglio
    	anObject: otherObject, 
	    anArray: otherArray, 
    	another: "item"
	});
    //una volta fatto quanto sopra posso spedire
    //send JSON
    response.end(json);
    //riceverò proprio lo stesso oggetto
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
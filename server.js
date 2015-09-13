"use strict";

/* server */

var express = require('express');
var app = express();

// route to trigger the capture

/** data of recipes just loaded from file  */
app.use('/app/Recipe', express.static(__dirname + '/data/recipes'));
/* for angular part */
app.use('/', express.static(__dirname + '/'));

/************ register new user **************/
app.get('/register/:username/:pass/:name', function(req, res) {
	// load data from request
	var username = req.params.username;
	var pass = req.params.pass;
	var name = req.params.name;	
	// load egsisting data if available
	var user = {"username":'n',"password":'n'};
	var users = {};
	var fs = require("fs");
	try{
		var data = fs.readFileSync( __dirname + "/data/" + "users.json", "utf8");   
		users = JSON.parse( data );
	}catch(err){}
	//add new user to loaded data	  
	if( users[username].password === pass  ){ //user exist just load and login user
		user = users[username];
		user.msg = "logged in";
		user.username = username;
		res.cookie('user', JSON.stringify(user),{path: '/app/'});
		res.status('200').send(JSON.stringify(user)).end();
	}else{  // save new user and then login
		var no = Object.keys(users).length+1;
		user.name = name;
		user.password = pass;
		user.id = no;	
		users[username] = user;
		try{
			fs.writeFile( __dirname + "/data/" + "users.json", JSON.stringify(users), function(err) {
				if(err) {return console.log(err);}
				//console.log("The file was saved!");
			});
		}catch(err){}
		user.msg = "logged in";
		user.username = username;
		res.cookie('user', JSON.stringify(user),{path: '/app/'});	
		res.status('200').send(JSON.stringify(user)).end();
	}
});
/************  login user **************/
app.get('/login/:username/:pass', function(req, res) {
	// load request data
	var username = req.params.username;
	var pass = req.params.pass;
	
	// First read existing users.	
	var user = '',users={};
	var fs = require("fs");
	try{
		var data = fs.readFileSync( __dirname + "/data/" + "users.json", "utf8");
		users = JSON.parse( data );
	}catch(err){}	
	if( null != users[username]){	// if user found in data
		user = users[username];
		user.msg = "logged in";
		user.username = username;
	}else user = {"msg":"not found"};
	//console.log( user );
	// login user
	res.cookie('user', JSON.stringify(user),{path: '/app/'});
	res.end( JSON.stringify(user));
});

/******************* add star ***************/
app.get('/star/:id/add/:user', function(req, res){
	// load request data
	var id = req.params.id;
	var user = req.params.user;
	var stars = {};	
	var fs = require("fs");
	try{ // load saved data
		var data = fs.readFileSync( __dirname + "/data/stars/" + user+".json", "utf8");   
		stars = JSON.parse( data );
	}catch(err){}
	if (stars[id] !== 1) // add new record
		stars[id]='1';
	try{ // save new data
		fs.writeFile( __dirname + "/data/stars/" + user+".json", JSON.stringify(stars), function(err) {
			if(err) {return console.log(err);}
			//console.log("The file was saved!");
		});
	}catch(err){}
	res.status('200').send(JSON.stringify(stars)).end();
});

/******************* remove star ***************/
app.get('/star/:id/del/:user', function(req, res){
	var id = req.params.id;
	var user = req.params.user;
	var stars = {};	
	var fs = require("fs");
	var data = fs.readFileSync( __dirname + "/data/stars/" + user+".json", "utf8");   
	stars = JSON.parse( data );
	//stars = data;
		if (stars[id] == 1)
		stars[id]='0';
		//stars[id] = id;
	fs.writeFile( __dirname + "/data/stars/" + user+".json", JSON.stringify(stars), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
	});		
	res.status('200').send(JSON.stringify(stars)).end();
});
/******************* get list of stars ***************/
app.get('/star/:user', function(req, res){	
	var user = req.params.user;
	var stars = {};	
	var fs = require("fs");
	try{
		var data = fs.readFileSync( __dirname + "/data/stars/" + user+".json", "utf8");   
		stars = JSON.parse( data );	
	}catch(err){}	
	res.status('200').send(JSON.stringify(stars)).end();
});

/******************* start server ***************/
var server = app.listen(3001, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});



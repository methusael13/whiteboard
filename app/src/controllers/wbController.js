// var bodyParser = require('body-parser');
var request = require('request');

// all routs are in this file
module.exports = function(app) {
	var url;
	var headers = {
                 'Content-Type' : 'application/json',
                 'X-Hasura-Role' : 'admin',
       		 'X-Hasura-Id' : 1
            };

	if (process.env.NODE_ENV === 'development') {
		url = 'http://localhost:9999/v1/query';
	} else {
		url= 'http://data.hasura/v1/query';
	}

	app.get('/test', function (req, res) {
		// Fetch data from the data APIs
		var options = {
			url : url,
			method : 'POST',
			headers : headers,
			body : JSON.stringify({
				type : 'select',
				args : {
					table : 'messages',
					column : ['*']
				}	
			})
		};
		request(options, function(err, response, body){
			if(err) {
			  console.error("Could not connect to APIs", err);
			  res.status(500).send('Internal error');
			  return;
			}

			if (response.statusCode !== 200) {
			  console.error('Data API bad request');
			  res.status(500).send('Internal error : Could not connect to data APIs');
			  return;
			}
			
			res.send(body);
			//res.render('base');
		});
		
	});

	app.get('/', function (req, res) {
		res.render('base');
	});
	app.get('/welcome-msg', function (req, res) {
		res.render('partials/welcome-msg');
	});
	app.get('/login-content', function (req, res) {
		res.render('partials/login-content');
	});
	app.get('/signup-content', function (req, res) {
		res.render('partials/signup-content');
	});
	app.get('/reset-pass-content', function (req, res) {
		res.render('partials/reset-pass-content');
	});



	app.get('/app', function(req, res) {
		res.render('app');
	});


	app.get('/chat-content', function (req, res) {
		res.render('partials/chat-content' );
	});
	app.get('/groups-content', function (req, res) {
		res.render('partials/groups-content');
	});
	app.get('/manage-content', function (req, res) {
		res.render('partials/manage-content');
	});

	app.get('/profile-content', function (req, res) {
		res.render('partials/profile-content');
	});

};

var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/links', function(req, res) {
	fs.readFile('links.json', function(err, data) {
		if(err) {
			res.status(500).send(err)
		}
		else {
			res.type('json');
			res.send(JSON.parse(data));
		}
	});
});

app.get('/pages', function(req, res) {
	fs.readFile('pages.json', function(err, data) {
		if(err) {
			res.status(500).send(err);
		}
		else {
			res.type('json');
			res.send(JSON.parse(data));
		}
	});
});

app.use(express.static('app'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
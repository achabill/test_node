var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');

//configure app to use bodyparaser
//this will let us get the data from a POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.POST || 8080;

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
var dao = require('./dao/dao');
dao.init(client);

//add resources
var friendResource = require('./resources/friendResource');
friendResource.init(dao);
friendResource.createIndex();

app.use('/api', friendResource.router());

//start the server
app.listen(port);
console.log('Listening on port: ' + port);

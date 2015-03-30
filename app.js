var express = require('express');
var path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser')
var app=express();

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('build'));
app.use(bodyParser.json());

app.use(routes)

app.listen(process.env.PORT || 8001);
'use strict'
 
var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var userRoute = require('./rutas/user');


//parsear laspeticiones http que lleguen a json..
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cunfiguracion Rutas
app.use('/api',userRoute);

module.exports = app;

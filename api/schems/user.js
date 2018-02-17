'use strict'
var mongoose = require('mongoose');
// Defino una variable para mi esquema...
var schema = mongoose.Schema;

var userSchema = schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    role: String
});

// Exportar mi modelo de user
module.exports = mongoose.model('User', userSchema);
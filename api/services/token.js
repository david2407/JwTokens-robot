
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "holamundo";

exports.crearToken = function (user) {

    var payload = {
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp : moment().add(10, 'days').unix()
    }

        return jwt.encode(payload,secret);

}


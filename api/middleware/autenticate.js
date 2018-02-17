
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'holamundo';

exports.ensureAuth = function(req, res, next) {

var authorization = req.headers.authorization;

    if(!authorization){
        return res.status(403).send({message : 'La petición no tiene la cabecera de autenticación'});
    }

    else {
        var token = authorization.replace(/['"]+/g, '');
        
        try {
            var payload = jwt.decode(token, secret);

            if(payload.exp <= moment().unix()){
                return res.status(401).send({message : 'el token ha expirado' });
            }   
        } catch (error) {
           return res.status(404).send({message : 'Token invalido'});
        }

        req.user = payload;
    }
    next();
}
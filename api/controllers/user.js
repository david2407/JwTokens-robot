'use strict'

var User = require('../schems/user.js');
var bcrypt = require('bcrypt-nodejs');
var crearToken = require('../services/token');
var user = new User();

function saveUser(req, res) {
    var params = req.body;
    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
    user.email = params.email;
    var password = params.password;

    if (!password) {
        res.status(404).send({ message: 'Ingrese contraseña' });
    }

    else {
        bcrypt.hash(password, null, null, (err, hash) => {
            var clave = hash;
            user.password = clave;

            if (err) {
                throw err;
            }

            else {
            
                user.save((err, user) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' });
                    }
                    else {
                        if (!user) {
                            res.status(404).send({ message: 'No se pudo guardar el usuario' });
                        }
                        else {
                            res.status(500).send({ user: user });
                        }
                    }
                })
            }
        });
    }

}

function findUsers(req, res) {

    User.find((err, users) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        }

        else {
            if (!users) {
                res.status(404).send({ message: 'No se encotraron datos' });
            }
            else {
                res.status(500).send({ users: users });
            }
        }
    });
}

function loginUser(req, res) {

    var password = req.body.password;
    var email = req.body.email;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {

        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        }
        else {
            if (!user) {
                res.status(404).send({ message: 'No se encotraron datos' });
            }
            else {
                bcrypt.compare(password,user.password,  (err, check)=> {
                    if (err) {
                        res.status(404).send({ message: 'datos incorrectos' });
                    }
                    else {
                        if(check) {
                            res.status(200).send({login : crearToken.crearToken(user)});
                        }
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    var datos = req.body;
    console.log(datos);
    res.status(200).send({message: 'pasamos la validación del token', body: datos});
}

module.exports = {
    saveUser,
    findUsers,
    loginUser,
    updateUser
}
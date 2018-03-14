'use strict'

var app = require('express');
var userController = require('../controllers/user');
var auth = require('../middleware/autenticate');
var userRoute = app.Router();

userRoute.post('/registrar',userController.saveUser);
userRoute.get('/usuarios',userController.findUsers);
userRoute.post('/login',userController.loginUser);
userRoute.put('/actualizar-datos',[auth.ensureAuth],userController.updateUser);


module.exports = userRoute;
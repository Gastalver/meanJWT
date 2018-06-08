'use strict'

/**
 * Router de /api/
 * Página de inicio y Gestión de usuarios.
 * @type {*|createApplication}
 */


//Dependencias
var express=require('express');
var controladorUsuario = require('../controladores/usuario');

// Creamos un router
var api = express.Router();

// Establecemos las Rutas y sus correspondientes metodos del .
api.get('/inicio',controladorUsuario.inicio);
api.get('/prueba',controladorUsuario.prueba);


module.exports = api;
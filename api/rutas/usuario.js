'use strict'

/**
 * Rutas en el directorio raiz de la api /api relativas a usuarios.
 * @module Usuarios
 */

//Dependencias
var express=require('express');
var controladorUsuario = require('../controladores/usuario');

// Creamos un router
var api = express.Router();

// Establecemos las Rutas y sus correspondientes metodos

/**
 * Simplemente dice Hola.
 *
 * @name inicio
 * @path {GET} /
 * @response {Object} response {}
 * @response {string} response.mensaje Mensaje informativo
 * @auth No requiere autenticación
 */
api.get('/inicio',controladorUsuario.inicio);


/**
 * Simplemente dice Prueba
 *
 * @name prueba
 * @path {GET} /
 * @response {String} mensaje
 * @auth No requiere autenticación
 */
api.get('/prueba',controladorUsuario.prueba);


/**
 * Guarda un usuario nuevo.
 *
 * @name nuevoUsuario
 * @path {POST} /usuario
 * @auth No requiere autenticación
 * @body {string} nombre El nombre del nuevo usuario.
 * @body {string} apellidos Los apellidos del nuevo usuario.
 * @body {string} apodo El nombre de usuario, apodo o nickname del nuevo usuario.
 * @body {string} email El email del nuevo usuario.
 * @body {string} clave La clave del nuevo usuario.
 * @body {string} [rol=ROL_USUARIO] El rol del nuevo usuario. Por defecto ROL_USUARIO.
 * @body {string} [image=''] EL archivo de imagen del usuario. Por defecto ''.
 * @code {200} Si el usuario se crea correctamente o si se ha recibido la petición pero faltan datos.
 * @code {500} Si hay un error al intentar guardar el nuevo usuario en la bd y no se guarda.
 * @code {404} Si hay un error tras guardar el nuevo usuario en la bd y no se puede encontrar.
 * @response {object} response {}
 * @response {object} response.usuario EL usuario creado. En formato JSON.
 * @response {string} response.usuario._id El ObjectId del documento en Mongo
 * @response {string} response.usuario.nombre El nombre del usuario creado.
 * @response {string} response.usuario.apellidos Los apellidos del usuario creado.
 * @response {string} response.usuario.apodo El usuario, apodo o nickname del usuario creado.
 * @response {string} response.usuario.email El nombre del usuario creado.
 * @response {string} response.usuario.clave El nombre del usuario creado.
 * @response {string} response.usuario.rol El nombre del usuario creado.
 * @response {string} response.usuario.image El archivo de imagen del usuario creado.
 */
api.post('/usuario',controladorUsuario.guardarUsuario);

module.exports = api;
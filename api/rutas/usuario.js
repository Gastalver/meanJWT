'use strict'

/**
 * Rutas en el directorio raiz de la api /api relativas a usuarios.
 * @module Usuarios
 */

//Dependencias
var express=require('express');
var controladorUsuario = require('../controladores/usuario');

//Middleware
var md_aut = require('../middleware/autenticado');
var multer = require('multer');
var upload = multer({dest: 'uploads/usuarios'})


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
api.get('/prueba',md_aut.compruebaAutenticacion, controladorUsuario.prueba);


/**
 * Registra un usuario nuevo.
 *
 * @name registroNuevoUsuario
 * @path {POST} /registro
 * @auth No requiere autenticación
 * @body {string} nombre El nombre del nuevo usuario.
 * @body {string} apellidos Los apellidos del nuevo usuario.
 * @body {string} apodo El nombre de usuario, apodo o nickname del nuevo usuario.
 * @body {string} email El email del nuevo usuario.
 * @body {string} clave La clave del nuevo usuario.
 * @body {string} [rol=ROL_USUARIO] El rol del nuevo usuario. Por defecto ROL_USUARIO.
 * @body {string} [image=''] EL archivo de imagen del usuario. Por defecto ''.
 * @code {200} Si el usuario se crea correctamente.
 * @code {200} Si se ha recibido la petición pero faltan datos. o el usuario está duplicado.
 * @code {200} Si se ha recibido la petición pero el usuario está duplicado.
 * @code {500} Si hay un error al comprobar duplicados.
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
api.post('/registro',controladorUsuario.registrarUsuario);



/**
 * Autenticación de un usuario. Si en el body se envía solo email y clave se devuelven los datos del usuario,
 * si se añade la propiedad enviarToken, se recibe el token JWT de ese usuario, necesario para autenticarse y acceder.
 *
 * @name autenticaciónUsuario
 * @path {POST} /acceso
 * @auth Requiere email y clave
 * @body {string} email Email del usuario registrado.
 * @body {string} clave Clave del usuario registrado.
 * @body {string} [recibirToken=null] Si se incluye se recibe un token JWT para autenticación, no el usuario.
 * @code {200} Si el usuario se crea correctamente.
 * @code {200} Si se ha recibido la petición pero faltan datos. o el usuario está duplicado.
 * @code {200} Si se ha recibido la petición pero el usuario está duplicado.
 * @code {500} Si hay un error al comprobar duplicados.
 * @code {500} Si hay un error al intentar guardar el nuevo usuario en la bd y no se guarda.
 * @code {404} Si no existe un usuario con el email especificado.
 * @response {object} response {}
 * @response {string} response.token El token de autenticación.
 * @response {object} response.usuario El usuario registrado con ese email y clave. En formato JSON.
 * @response {string} response.usuario._id El ObjectId del documento en Mongo
 * @response {string} response.usuario.nombre El nombre del usuario creado.
 * @response {string} response.usuario.apellidos Los apellidos del usuario creado.
 * @response {string} response.usuario.apodo El usuario, apodo o nickname del usuario creado.
 * @response {string} response.usuario.email El nombre del usuario creado.
 * @response {string} response.usuario.clave El nombre del usuario creado.
 * @response {string} response.usuario.rol El nombre del usuario creado.
 * @response {string} response.usuario.image El archivo de imagen del usuario creado.
 */
api.post('/acceso',controladorUsuario.autenticarUsuario);


/**
 * Actualización de los datos de un usuario.
 *
 * @name actualizacionUsuario
 * @path {PUT} /actualizar-usuario/:id
 * @auth Requiere token
 * @header {String} Authorization El token del usuario.
 * @params {String} :id Id del usuario a actualizar.
 * @body {string} nombre El nombre del usuario, actualizado, en su caso.
 * @body {string} apellidos Los apellidos del usuario, , actualizados en su caso.
 * @body {string} apodo El nombre de usuario, apodo o nickname del usuario, , actualizado en su caso.
 * @body {string} email El email del usuario, actualizado, en su caso.
 * @body {string} [rol=ROL_USUARIO] El rol del usuario, actualizado en su caso
 * @code {200} Si el usuario se actualiza correctamente.
 * @code {200} Si se ha recibido la petición pero faltan datos. o el usuario está duplicado.
 * @code {200} Si se ha recibido la petición pero el usuario está duplicado.
 * @code {500} Si hay un error al comprobar duplicados.
 * @code {500} Si hay un error al intentar guardar el nuevo usuario en la bd y no se guarda.
 * @code {404} Si no existe un usuario con el email especificado.
 * @response {object} response {}
 * @response {object} response.usuario El usuario actualizado. En formato JSON.
 * @response {string} response.usuario._id El ObjectId del documento en Mongo
 * @response {string} response.usuario.nombre El nombre del usuario actualizado.
 * @response {string} response.usuario.apellidos Los apellidos del usuario actualizado.
 * @response {string} response.usuario.apodo El usuario, apodo o nickname del usuario actualizado.
 * @response {string} response.usuario.email El nombre del usuario actualizado.
 * @response {string} response.usuario.rol El nombre del usuario actualizado.
 * @response {string} response.usuario.image El archivo de imagen del usuario creado.
 */
api.put('/actualizar-usuario/:id',md_aut.compruebaAutenticacion,controladorUsuario.actualizarUsuario);




api.post('/subir-imagen-usuario/:id',[md_aut.compruebaAutenticacion, upload.single('imagenUsuario')],controladorUsuario.subirImagenUsuario);


module.exports = api;
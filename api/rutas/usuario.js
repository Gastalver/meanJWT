'use strict'

/**
 * Rutas en el directorio raiz de la api /api relativas a usuarios.
 * @module Usuarios
 */

//Dependencias
var express=require('express');
var controladorUsuario = require('../controladores/usuario');
var config = require('../configuracion');

//Middleware
var md_aut = require('../middleware/autenticado');
var multer = require('multer');
var upload = multer({dest: config.multer.dirImagenesUsuarios})


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
 * @response {string} response.usuario.email El email del usuario creado.
 * @response {string} response.usuario.rol El rol del usuario creado.
 * @response {string} response.usuario.image El archivo de imagen del usuario creado.
 */
api.post('/acceso',controladorUsuario.autenticarUsuario);


/**
 * Actualización de los datos de un usuario.
 *
 * @name actualizacionUsuario
 * @path {PUT} /usuario/:id
 * @auth Requiere token
 * @header {String} Authorization El token del usuario.
 * @params {String} :id Id del usuario a actualizar.
 * @body {string} [nombre=El nombre ya registrado] El nombre del usuario, actualizado, en su caso.
 * @body {string} [apellidos=Los ya registrados] Los apellidos del usuario, , actualizados en su caso.
 * @body {string} apodo El nombre de usuario, apodo o nickname del usuario, , actualizado en su caso.
 * @body {string} email El email del usuario, actualizado, en su caso.
 * @body {string} [rol=ROL_USUARIO] El rol del usuario, actualizado en su caso
 * @code {401} Si el id y el token no son del mismo usuario.
 * @code {422} Si no se han enviado los campos email y apodo, que son obligatorios.
 * @code {406} Si el email o el apodo a actualizar ya están en uso por otro usuario.
 * @code {500} Si hay un error al comprobar duplicados.
 * @code {500} Si hay un error al intentar actualizar el nuevo usuario en la bd.
 * @code {500} Si hay un error al intentar recuperar  el usuario actualizado y no se encuentra.
 * @code {200} Si la actualización concluye correctamente y se envían los datos del usuario actualizado.
 * @response {object} response {}
 * @response {object} response.usuario El usuario actualizado. En formato JSON.
 * @response {string} response.usuario._id El ObjectId del documento en Mongo
 * @response {string} response.usuario.nombre El nombre del usuario actualizado.
 * @response {string} response.usuario.apellidos Los apellidos del usuario actualizado.
 * @response {string} response.usuario.apodo El usuario, apodo o nickname del usuario actualizado.
 * @response {string} response.usuario.email El email del usuario actualizado.
 * @response {string} response.usuario.rol El rol del usuario actualizado.
 * @response {string} response.usuario.image El archivo de imagen del usuario actualizado.
 */
api.put('/usuario/:id',md_aut.compruebaAutenticacion,controladorUsuario.actualizarUsuario);



/**
 * Guardar la imagen de un usuario.
 *
 * @name guardarImagenUsuario
 * @path {POST} /usuario/:id/imagen
 * @auth Requiere token
 * @header {String} Authorization El token del usuario.
 * @params {String} :id Id del usuario cuya foto se pretende guardar.
 * @body {string} imagenUsuario Con un valor de tipo archivo.
 * @code {401} Si el id y el token no son del mismo usuario.
 * @code {422} Si no se ha enviado ningún archivo de imagen, al ser obligatorio.
 * @code {422} Si se ha enviado un tipo de archivo no admitido.
 * @code {500} Error al guardar imagen. Interno del Servidor.
 * @code {500} Error al borrar imagen no admitida. Interno del Servidor.
 * @code {200} Si la subida de imagen concluye correctamente y se envían los datos del usuario actualizado.
 * @response {object} response {}
 * @response {object} response.usuario El usuario actualizado. En formato JSON.
 * @response {string} response.usuario._id El ObjectId del documento en Mongo
 * @response {string} response.usuario.nombre El nombre del usuario actualizado.
 * @response {string} response.usuario.apellidos Los apellidos del usuario actualizado.
 * @response {string} response.usuario.apodo El usuario, apodo o nickname del usuario actualizado.
 * @response {string} response.usuario.email El email del usuario actualizado.
 * @response {string} response.usuario.rol El rol del usuario actualizado.
 * @response {string} response.usuario.image El archivo de imagen del usuario actualizado.
 */
api.post('/usuario/:id/imagen',[md_aut.compruebaAutenticacion, upload.single('imagenUsuario')],controladorUsuario.subirImagenUsuario);




/**
 * Obtener el archivo de imagen de un usuario.
 *
 * @name obtenerImagenUsuario
 * @path {GET} /usuario/imagen/:archivo
 * @auth Requiere token
 * @header {String} Authorization El token del usuario.
 * @params {String} archivo El nombre de archivo de la foto que se pretende obtener.
 * @code {401} Si el id y el token no son del mismo usuario.
 * @code {422} Si no se ha enviado ningún archivo de imagen, al ser obligatorio.
 * @code {422} Si se ha enviado un tipo de archivo no admitido.
 * @code {500} Error al guardar imagen. Interno del Servidor.
 * @code {500} Error al borrar imagen no admitida. Interno del Servidor.
 * @code {200} Si la subida de imagen concluye correctamente y se envían los datos del usuario actualizado.
 * @response {object} response {}
 * @response {object} response.usuario El usuario actualizado. En formato JSON.
 * @response {string} response.usuario._id El ObjectId del documento en Mongo
 * @response {string} response.usuario.nombre El nombre del usuario actualizado.
 * @response {string} response.usuario.apellidos Los apellidos del usuario actualizado.
 * @response {string} response.usuario.apodo El usuario, apodo o nickname del usuario actualizado.
 * @response {string} response.usuario.email El email del usuario actualizado.
 * @response {string} response.usuario.rol El rol del usuario actualizado.
 * @response {string} response.usuario.image El archivo de imagen del usuario actualizado.
 */
api.get('/usuario/imagen/:archivo',md_aut.compruebaAutenticacion,controladorUsuario.obtenerImagenUsuario);


module.exports = api;
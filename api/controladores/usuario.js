'use strict'

/**
 * Controlador para las diferentes rutas de usuario (api/)
 *
 * @module controladores/usuario
 */

// Dependencias
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../modelos/usuario');

/**
 * Handler de la ruta /inicio
 * @async
 * @param {request} req
 * @param {response} res
 */
function inicio(req,res){
    res.status(200).send({mensaje: 'Hola'});
}

/**
 * Handler de la ruta /prueba
 * @async
 * @param req
 * @param res
 * @returns {object} Mensaje de prueba
 */
function prueba (req,res){
    res.status(200).send({mensaje: 'Prueba del handler /prueba'})
}

/**
 * Para crear y guardar un usuario nuevo.
 * @async
 * @param res
 * @param req
 * @returns {{usuario:{{_id:string,nombre:apellidos}}   }}
 */
function guardarUsuario(res,req){
    var enBody = req.body;
    var usuario = new Usuario();
    if(enBody.nombre && enBody.apellidos && enBody.apodo && enBody.email && enBody.clave){
        // TODO Usar sintaxis ES6 de asignación de propiedades de objetos.

        usuario.nombre = enBody.nombre;
        usuario.apellidos = enBody.apellidos;
        usuario.apodo = enBody.apodo;
        usuario.email = enBody.email;
        usuario.rol = 'ROL_USUARIO' // Por defecto.
        // Encriptamos clave y tras terminar (en el propio callback de bcrypt) guardamos el usuario.
        bcrypt.hash(enBody.clave,null,null,(err,hash)=>{
            usuario.clave = hash;
            // Guardamos el usuario y gestionamos el callback, que devuelve error, o usuarioGuardado.
                /**@typedef usuarioGuardado
                 * @type{object}
                 * @property{string} _id - Id
                 * @property{string} nombre - Nombre
                 * @property{string} apellidos - Apellidos
                 * @property{string} apodo - Apodo
                 * @property{string} email - email
                 * @property{string} rol - Rol
                 * @property{string} imagen - Imagen
                 */
            usuario.save(
                /**
                 * @callback
                 * @param err
                 * @param usuarioGuardado
                 * @returns {usuarioGuardado}
                 */
                (err,usuarioGuardado)=>{

                // Cláusulas de guarda. Abarcan todos los errores con el menor código, y si no, devuelven resultado.
                // Se usa return en la primera por eficiencia, para interrumpir la ejecución de más código.
                // Las otras regresan automáticamente por el método .send, no necesitan return.
                if (err) return res.send.status(500).send({mensaje: 'Error al guardar el usuario.'});
                if(usuarioGuardado){
                    res.status(200).send({usuario: usuarioGuardado})
                }else{
                    res.status(404).send({mensaje: 'No se ha registrado el usuario'})
                }

            })
        })

    }else{
        res.status(200).send({mensaje: 'Envía todos los campos necesarios.'})
    }
}

/** @exports inicio,prueba, */
module.exports = {
    inicio,
    prueba
}
'use strict'

// Dependencias
var debug = require('debug')('usuario');
var bcrypt = require('bcrypt-nodejs');

// Modelos
var Usuario = require('../modelos/usuario');

// Handler de la ruta GET /inicio
function inicio(req,res){
    res.status(200).send({mensaje: 'Hola'});
}

// Handler de la GET /prueba
function prueba (req,res){
    res.status(200).send({mensaje: 'Prueba del handler /prueba'})
}

// Handler de la ruta POST /usuario
function guardarUsuario(req,res){
    let enBody = req.body;
    let usuario = new Usuario();
    if(enBody.nombre && enBody.apellidos && enBody.apodo && enBody.email && enBody.clave){
        // TODO Usar sintaxis ES6 de asignación de propiedades de objetos.
        usuario.nombre = enBody.nombre;
        usuario.apellidos = enBody.apellidos;
        usuario.apodo = enBody.apodo;
        usuario.email = enBody.email;
        usuario.rol = 'ROL_USUARIO' // Por defecto.
        usuario.imagen = null; // Por defecto
        // Encriptamos clave y tras terminar (en el propio callback de bcrypt) guardamos el usuario.
        bcrypt.hash(enBody.clave,null,null,(err,hash)=>{
            usuario.clave = hash;
            // Guardamos el usuario y gestionamos el callback de .save, que devuelve error, o usuarioGuardado.
            usuario.save(
                (err,usuarioGuardado)=>{
                if (err) {
                    return res.send.status(500).send({mensaje: 'Error al guardar el usuario.'});
                }
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


module.exports = {
    inicio,
    prueba,
    guardarUsuario
}
'use strict'

// Dependencias
var winston = require('winston');
var debug = require('debug')('usuario');
var bcrypt = require('bcrypt-nodejs');

// Servicios
var jwt = require('../servicios/jwt');

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

// Handler de la ruta POST /registro
function registrarUsuario(req,res){
    let enBody = req.body;
    let usuario = new Usuario();
    if(enBody.nombre && enBody.apellidos && enBody.apodo && enBody.email && enBody.clave){
        // TODO Usar sintaxis ES6 de asignación de propiedades de objetos.
        usuario.nombre = enBody.nombre;
        usuario.apellidos = enBody.apellidos;
        usuario.apodo = enBody.apodo.toLowerCase();
        usuario.email = enBody.email.toLowerCase();
        usuario.rol = 'ROL_USUARIO' // Por defecto.
        usuario.imagen = null; // Por defecto
        // Comprobamos si el email o el apodo ya existe y continuamos en el callback de find, para ordenar asincronicidad.
        Usuario.find({$or: [
                {email: usuario.email},
                {apodo: usuario.apodo}
            ]}).exec((err,usuarios)=>{
            if (err){
                winston.log('error','Controlador/Usuario#registrarUsuario. Error al comprobar duplicados: ' + err);
                return res.send.status(500).send({mensaje: 'Error al comprobar duplicados.'});
            }
            if (usuarios && usuarios.length >=1){
                return res.status(200).send({mensaje:'Ya existe un usuario con ese email o apodo'});
            }else{
                // Encriptamos clave y tras terminar (en el propio callback de bcrypt) guardamos el usuario.
                bcrypt.hash(enBody.clave,null,null,(err,hash)=>{
                    usuario.clave = hash;
                    // Guardamos el usuario y gestionamos el callback de .save, que devuelve error, o usuarioGuardado.
                    usuario.save(
                        (err,usuarioGuardado)=>{
                            if (err) {
                                winston.log('error','Controlador/Usuario#registrarUsuario. Error al guardar el usuario: ' + err);
                                return res.send.status(500).send({mensaje: 'Error al guardar el usuario.'});
                            }
                            if(usuarioGuardado){
                                winston.log('info','Nuevo usuario registrado: ' + usuarioGuardado.nombre + ' ' + usuarioGuardado.apellidos);
                                res.status(200).send({usuario: usuarioGuardado})
                            }else{
                                winston.log('error','Controlador/Usuario#registrarUsuario. El usuario guardado no se encuentra.');
                                res.status(404).send({mensaje: 'No se ha registrado el usuario'})
                            }
                        })
                })
            }

        })
    }else{
        res.status(200).send({mensaje: 'Envía todos los campos necesarios.'})
    }
}

// Handler de la ruta POST /acceso
function autenticarUsuario(req,res){
    var reqBody = req.body;
    var email = reqBody.email;
    var clave = reqBody.clave;
    // Primero buscamos si existe un usuario con el email recibido.
    Usuario.findOne({email: email},(error,usuarioRegistrado)=>{
            if (error){
                winston.log('error','Controlador/Usuario#autenticarUsuario. Error al buscar email: ' + err);
                return res.status(500).send({mensaje: 'Error del servidor al comprobar email.'});
            }
        // Si existe un usuario con ese email, comparamos si la clave enviada se corresponde con la clave del usuario registrado.
            // Continua la ejecución en el callback de bcrypt.
            if (usuarioRegistrado){
                bcrypt.compare(clave,usuarioRegistrado.clave,(err,coincidencia)=>{
                    if (err){
                        winston.log('error','Controlador/Usuario#autenticarUsuario. Error desencriptar y comparar clave: ' + err);
                        return res.status(500).send({mensaje: 'Error al comprobar la clave.'});
                    }
                    // si la clave enviada se corresponde con la clave del usuario registrado
                    if(coincidencia){
                        // Disponemos una respuesta condicional, dependiendo de si reqBody contiene un parámetro enviarToken o no.
                        // Si contiene enviarToken generamos y devolvemos un token JWT que contiene todos los datos del usuario.
                        if(reqBody.recibirToken){
                            winston.log('info','Controlador/Usuario#autenticarUsuario. Enviado token de: ' + usuarioRegistrado.nombre + ' ' + usuarioRegistrado.apellidos);
                            return res.status(200).send({
                                token: jwt.creaToken(usuarioRegistrado)
                            });
                         //Si no contiene enviarToken devolvemos los datos de usuario, quitando antes la clave.
                        } else {
                            winston.log('info','Controlador/Usuario#autenticarUsuario. Enviado datos de usuario de: ' + usuarioRegistrado.nombre + ' ' + usuarioRegistrado.apellidos);
                            usuarioRegistrado.clave = undefined; // Truco para "eliminar esa propiedad del objeto antes de devolverlo"
                            return res.status(200).send({usuario:usuarioRegistrado});
                        }

                    // si la clave enviada no se corresponde con la clave del usuario registrado
                    } else {
                        return res.status(404).send({mensaje:'La clave no es correcta.'});
                    }
                });
             // Si no existe un usuario con el email recibido, devolvemos 404 con mensaje.
            } else {
                return res.status(404).send({mensaje:'No existe ningún usuario registrado con ese email.'});
            }
    });

}


module.exports = {
    inicio,
    prueba,
    registrarUsuario,
    autenticarUsuario
}
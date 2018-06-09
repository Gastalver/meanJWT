'use strict';

var jwt = require('jwt-simple');
var momento = require('moment');
var winston = require('winston');
var secreto = process.env.SECRET_TOKEN;

exports.compruebaAutenticacion = function (req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({mensaje: 'La petición no tiene la cabecera de autenticación'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,''); // Esto es para quitar las comillas del token antes de evaluarlo.
    // Usamos try/catch porque jwt es muy sensible a errores.
    try{
        var payload = jwt.decode(token,secreto);
        // Comprobamos si el token ha expirado o no.
        if(payload.exp <= momento().unix()){
            return res.status(401).send({mensaje:'El token ha expirado'});
        }
    } catch(ex) {
        winston.log('warn','Intento de autenticación fallida.')
        return res.status(401).send({mensaje:'El token no es válido'});
    }

    // Una vez autenticado, cargamos los datos del usuario (con la estructura de payload cfr./services/jwt)
    // en req, pera que estén siempre disponibles.
    req.usuario = payload;

    //Culminado el middleware que de paso a lo siguiente.
    next();

};

'use strict';

var jwt = require('jwt-simple');
var momento = require('moment');
var secreto = process.env.SECRET_TOKEN;

// La información del token sigue la RFC 7519 JSON Web Token (JWT) May 2015
exports.creaToken= function(usuario){
    var payload = {
        sub: usuario._id,  // subject
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        apodo: usuario.apodo,
        email: usuario.email,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: momento().unix(), // Issued at (Fecha de emisión)
        exp: momento().add(30,'days').unix()  // Expiration Time. (Fecha de expiración)
    };
    return jwt.encode(payload,secreto)
};
'use strict';

var jwt = require('jwt-simple');
var momento = require('moment');
var secreto = process.env.SECRET_TOKEN;
exports.creaToken= function(usuario){
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        apodo: usuario.apodo,
        email: usuario.email,
        rol: usuario.rol,
        imagen: usuario.imagen,
        fechagen: momento().unix(),
        fechaexp: momento().add(30,'days').unix()
    };
    return jwt.encode(payload,secreto)
};
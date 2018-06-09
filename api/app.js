'use strict'

// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('index');
var config = require('./configuracion');

// Creamos una instancia del objeto express como framework HTTP
var app = express();


// Cargamos las rutas.
var rutasUsuario = require('./rutas/usuario');

// MIDDLEWARE
// bodyParser.urlencoded para parsear bodies que vengan en formato urlenconded, es decir, de un formulario.
app.use(bodyParser.urlencoded({extended: false}));
// bodyParser.json para parsear bodies que vengan en formato json.
app.use(bodyParser.json());
// Comprobación de que hay conexión a la bd. TODO Convertir en módulo externo.
app.use(function(req,res,next){
    let conexionMongo = config.mongo.operativo;
    if(!conexionMongo){
        return res.status(503).send({mensaje: 'Servicio temporalmente indisponible.'});
    }
    next();
});

// cors


// rutas
app.use('/api',rutasUsuario);


// exportar
module.exports = app;

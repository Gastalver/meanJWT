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


// CORS CABECERAS DE CONTROL DE ACCESO.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

const prefijoUrlAPI = '/api/v1';

// rutas
app.use(prefijoUrlAPI + '/usuarios',rutasUsuario);


// exportar
module.exports = app;

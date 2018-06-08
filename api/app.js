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
//Comprueba si hay conexión a la bd o no. Si no hay, no gestiona la petición. Devuelve un código 503 y un mensaje de error.
// app.use((req,res,next)=>{
//     if (config.mongo.operativo){
//         next();
//     } else {
//         res.status(503).send({mensaje: 'Servicio no disponible en este momento. Intentelo pasados unos segundos.'})
//     }
// })



// cors


// rutas
app.use('/api',rutasUsuario);


// exportar
module.exports = app;

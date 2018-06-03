'use strict'

// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('index');

// Creamos una instancia del objeto express para gestionar la comunicación HTTP
var server = express();

// Cargamos las rutas.


// MIDDLEWARE
// bodyParser.urlencoded para parsear bodies que vengan en formato urlenconded, es decir, de un formulario.
server.use(bodyParser.urlencoded({extended: false}));
// bodyParser.json para parsear bodies que vengan en formato json.
server.user(bodyParser.json());

// cors


// rutas

// exportar
module.exports = server;

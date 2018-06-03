'use strict'

/**
 * Archivo inicial del Servidor API.
 * Carga las variables de entorno.
 * Pone en marcha el registro.
 * Conecta con la base de datos.
 */

// Carga las variables de entorno de .env (MONGODB_URL, MONGODB_USER, MONGODEB_PASS...)
// Se posibilita el uso de un archivo distinto en cada despliegue en máquinas distintas.
require('dotenv').config();

// Carga la configuración global
const config = require('./configuracion');

// Dependencias.
var debug = require('debug')('index');
var fs = require('fs');
var winston = require('winston');
var mongoose = require('mongoose');


// Configuracion de Winston (registro)
winston.configure(config.winstonConfig);




// Configuración de mongo.
const mongoOptions = { // TODO pasar config de mongo también al archivo config/index
    dbName : 'meanjwt'
}

// Conexión con mongo. Una conexión 'equivale' a una Bd. // TODO COnfigurar la conexión con eventos ON, DISCONNECT, ETC.
mongoose.connect(process.env.MONGODB_URL, mongoOptions)
    .then (
        ()=>{
            winston.log('info','Conexión realizada correctamente a la base de datos.');
            debug('Conexión realizada correctamente a la base de datos.')
        },
        (error)=>{
            winston.log('error',error);
        }
    )


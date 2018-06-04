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


// Dependencias.
var debug = require('debug')('index');
var fs = require('fs');
var winston = require('winston');
var mongoose = require('mongoose');

// Carga la configuración global
const config = require('./configuracion');

console.log(config)

// Configuracion de Winston (registro)
winston.configure({
    transports: [
        // new (winston.transports.File)({
        //     name: 'info-file',
        //     filename: __dirname + '/logs/info.log',
        //     level:'info'
        // }),
        // new (winston.transports.File)({
        //     name: 'error-file',
        //     filename: __dirname + '/logs/error.log',
        //     level:'error'
        // }),
        // new (winston.transports.File)({
        //     name: 'exceptions-file',
        //     filename: __dirname + '/logs/exceptions.log',
        //     handleExceptions: true,
        //     humanReadableUnhandledException: true,
        //     level:'error'
        // })
    ]
});



// Configuración de mongo.
// const mongoOptions = { // TODO pasar config de mongo también al archivo config/index
//     dbName : 'meanjwt'
// }

// Conexión con mongo. Una conexión 'equivale' a una Bd. // TODO COnfigurar la conexión con eventos ON, DISCONNECT, ETC.
mongoose.connect(config.mongo.dbUrl, config.mongo.dbOptions)
    .then (
        ()=>{
            winston.log('info','Conexión realizada correctamente a la base de datos.');
            debug('Conexión realizada correctamente a la base de datos.')
        },
        (error)=>{
            winston.log('error',error);
        }
    )


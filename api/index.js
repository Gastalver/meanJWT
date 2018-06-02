'use strict'

/**
 * Archivo inicial del Servidor API.
 * Su función principal es conectar con la base de datos e iniciar la aplicación express.
 */

// Dependencias.
var fs = require('fs');
var winston = require('winston');
var mongoose = require('mongoose');

// Configuracion de Winston (registro)
winston.configure(
    {
        transports: [
            new (winston.transports.Console)({
                formatter: function (options) {
                    return options.message;
                }
            }),
            new (winston.transports.File)({
                name: 'info-file',
                filename: __dirname + '/logs/info.log',
                level:'info'
            }),
            new (winston.transports.File)({
                name: 'error-file',
                filename: __dirname + '/logs/error.log',
                level:'error'
            }),
            new (winston.transports.File)({
                name: 'exceptions-file',
                filename: __dirname + '/logs/exceptions.log',
                handleExceptions: true,
                humanReadableUnhandledException: true,
                level:'error'
            })
        ]
    }
);




// Configuración de mongo.
const mongoOptions = {
    dbName : 'meanjwt'
}

// Conexión con mongo. Una conexión 'equivale' a una Bd.
mongoose.connect('mongodb://localhost:27017', mongoOptions)
    .then (
        ()=>{
            winston.log('info','Conexión realizada correctamente a la base de datos.');
        },
        (error)=>{
            winston.log('error',error);
        }
    )


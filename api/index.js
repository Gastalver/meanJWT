'use strict'

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

// Carga la app express
var app = require('./app');

/**
 * Configuración de Winston (registro)
 */
winston.configure({
    transports: [
        new (winston.transports.Console)({ level: 'info', colorize: true }),
        // new (winston.transports.File)({
        //     name: 'info-file',
        //     filename: __dirname + '/logs/info.log',
        //     level:'info'
        // }),
        // new (winston.transports.File)({
        //     name: 'error-file',
        //     filename: __dirname + '/logs/error.log',
        //     handleExceptions: true,
        //     humanReadableUnhandledException: true,
        //     level:'error'
        // })
    ]
});

// Función para conectar a base de datos con la conexión por defecto de Mongoose.
function connect(uri, options) {
    mongoose.connect(uri, options).catch((err)=>{});
    mongoose.connection.on('error', function (err) {
            config.mongo.operativo = false;
            if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
                setTimeout(function () {
                winston.log('warn', 'Reintentando primera conexión a bd...');
                mongoose.connection.openUri(uri).catch(() => {});
            }, 20 * 1000);
        } else {
            winston.log('error','Error en conexión a MongoDB')
        }
    });
    mongoose.connection.on('disconnected',()=>{
        config.mongo.operativo = false;
        winston.log('warn','No hay conexión a la bd ' + mongoose.connection.name);
    });

    mongoose.connection.on('reconnected',()=>{
        config.mongo.operativo = true;
        winston.log('warn','Se ha recuperado la conexión a bd ' + mongoose.connection.name);
    })

    mongoose.connection.once('open', ()=>{
        config.mongo.operativo = true;
        winston.log('info','Establecida conexión con la base de datos ' + mongoose.connection.name);
    });
    return mongoose.connection;
}

// Conexión a la base de datos.
connect(config.mongo.dbUrl, config.mongo.dbOptions)
    .then(
        app.listen(config.express.port, ()=>{
            winston.log('info','Servidor operativo en puerto ' + config.express.port);
        })
    )
    .catch((err)=>{
        winston.log('warn','El primer intento de conexión a la bd ha fallado. Se reintentará cada 20 segundos.')
    });


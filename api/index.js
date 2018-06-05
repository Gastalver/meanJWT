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

// Configuracion de Winston (registro)
winston.configure({
    transports: [
        new (winston.transports.Console)({ level: 'info', colorize: true }),
        // new (winston.transports.File)({
        //     name: 'info-file',
        //     filename: __dirname + '/logs/info.log',
        //     level:'info'
        // }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: __dirname + '/logs/error.log',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            level:'error'
        })
    ]
});

// Conexión con mongo y luego activación de express. //
connect()
    .then(
        (bd)=>{
            winston.log('info','Realizada conexión a bd ' + bd.connections[0].name);
            //debug('Realizada conexión a bd ' + bd.connections[0].name)
            //listen();
            bd.on('disconnect',connect());
        },
        (error)=>{
            winston.log('error','Error al intentar conectar con la bd: ' + error.message );
            //debug('Error al intentar conectar con la bd ' + config.mongo.dbOptions.dbName' + ': ' + error.message );
            connect();
        })



/**
 * Realiza la conexión con la base de datos con las opciones de config
 * @returns {Promise}
 */
function connect(){
    return mongoose.connect(config.mongo.dbUrl, config.mongo.dbOptions);
}

/**
 * Activa express en el puerto establecido en config
 */
function listen(){
    if (app.get('env') === 'test') return;
    app.listen(config.express.port);
    winston.log('info',config.express.ok + config.express.port);
    debug(config.express.ok + config.express.port)
}
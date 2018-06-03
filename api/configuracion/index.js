'use strict'


// Dependencias
const path = require('path');
var winston = require('winston');

// Cargamos o creamos objetos con las configuraciones.
const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

const defaults = {
    root: path.join(__dirname,'..'),
}

const global = {
    url: 'api1'
}

const logger = {
    winstonConfig: {

        transports: [
            // new (winston.transports.Console)({
            //     formatter: function (options) {
            //         return options.message;
            //     }
            // }),
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
    }
}

/** De las configuraciones de entorno sólo exportamos la que sea igual a la variable de entorno
 * process.env.NODE_ENV y si no existe, sólo exportamos development. Esto se consigue con la expresión
 * entre corchetes a continuación de las llaves del objeto exportado, que hace que se ejecute sólo la linea correspondiente,
 * donde además nos valemos de Object.assign() para asignar al objeto exportado las propiedades especificadas.
 */

module.exports = {
    development: Object.assign({}, development, defaults, global, logger),
    test: Object.assign({}, test, defaults, global, logger),
    production: Object.assign({}, production, defaults, global, logger)
}[process.env.NODE_ENV || 'development'];

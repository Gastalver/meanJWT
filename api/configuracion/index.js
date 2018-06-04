'use strict'


// Dependencias
const path = require('path');
var winston = require('winston');


// Cargamos objetos con las configuraciones que cambian según el entorno de desarrollo
const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

// Creamos otros objetos con configuraciones comunes.
const comun  = {
    global: {
        root: path.join(__dirname,'..'),
        url: 'api1'
    }
}


/** De las configuraciones de entorno sólo exportamos la que sea igual a la variable de entorno
 * process.env.NODE_ENV y si no existe, sólo exportamos development. Esto se consigue con la expresión
 * entre corchetes a continuación de las llaves del objeto exportado, que hace que se ejecute sólo la linea correspondiente,
 * donde además nos valemos de Object.assign() para asignar al objeto exportado las propiedades especificadas.
 */

module.exports = {
    development: Object.assign({}, development, comun),
    test: Object.assign({}, test, comun),
    production: Object.assign({}, production, comun)
}[process.env.NODE_ENV || 'development'];

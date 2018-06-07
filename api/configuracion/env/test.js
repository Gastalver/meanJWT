'use strict'

/**
 * Exporta objeto con propiedades de configuración para entorno test.
 * @type {}
 */
module.exports = {
    mongo: {
        dbUrl: process.env.MONGODB_URL,
        dbOptions: {
            autoReconnect: true,
            reconnectInterval: 1000,
            promiseLibrary: Promise
        },

    },
    express: {
        port: 4000,
    }
}
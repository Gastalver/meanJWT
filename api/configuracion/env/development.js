'use strict'

/**
 * Exporta objeto con propiedades de configuración para entorno development.
 * @type {}
 */
module.exports = {
    mongo: {
        dbUrl: process.env.MONGODB_URL,
        dbOptions: {
            // autoReconnect: true,
            // reconnectInterval: 1000,
            // promiseLibrary: Promise
        },
        operativo: false

    },
    express: {
        port: 3800,
    },
    multer: {
        dirImagenesUsuarios: 'uploads/usuarios'
    }
}
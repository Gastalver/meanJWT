'use strict'

/**
 * Exporta objeto con propiedades de configuración para entorno development.
 * @type {}
 */
module.exports = {
    mongo: {
        dbUrl: process.env.MONGODB_URL,
        dbOptions: {dbName : 'meanjwt'},
        reconnectTimeout: 5000
    },
    express: {
        port: 4000,
    },
    // google: {
    //     clientID: '388340877807-5l3mncedmh15l8pi62f1bll81gpf3rso.apps.googleusercontent.com',
    //     clientSecret: '0YKp-g47LicPU7m37E-md3vJ',
    //     callbackURL: 'http://localhost:3000/auth/google/callback'
}
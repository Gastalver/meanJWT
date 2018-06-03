'use strict'
/**
 * Exporta objeto con propiedades de configuración para entorno production.
 * @type {}
 */
module.exports = {
    bd : process.env.MONGODB_URL,
    // google: {
    //     clientID: '388340877807-5l3mncedmh15l8pi62f1bll81gpf3rso.apps.googleusercontent.com',
    //     clientSecret: '0YKp-g47LicPU7m37E-md3vJ',
    //     callbackURL: 'http://localhost:3000/auth/google/callback'
}

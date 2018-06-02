# mean JWT
Estructura básica de una **aplicación web** basada en MongoDB, Express, Angular y NodeJs. Consiste en un servidor que ofrece una API REST, y un cliente basado en Angular y Bootstrap 4. Como estrategia de autenticación se utiliza un Javascript Web Token en las cabeceras HTTP.  
## API
### Módulos utilizados y razón para ello.
* [**`express`**](https://www.npmjs.com/package/express) Framework para gestionar la comunicación con el cliente por medio de HTTP(`request` y `response`) así como el middleware.
* [**`body-parser`**](https://www.npmjs.com/package/body-parser) Middleware para convertir el `body` de un `request HTTP` en un objeto Javascript disponible en `request.body`. En el protocolo HTTP el `body` de un `request` tiene el interface `ReadableStream` y puede contener de todo. `body-parser` reconoce y transforma (parsea) streams cuyo contenido sea del tipo JSON, Raw, Text, o URL-enconded form. No parsea streams de multipart/form-data, es decir, archivos. 
* [**`multiparty`**](https://www.npmjs.com/package/multiparty) Middleware para parsear el `body` de `request` con contenidos del tipo multipart/form-data, es decir, archivos.
* [**`mongoose`**](https://www.npmjs.com/package/mongoose) Para modelar como objetos javscript los documentos de la base de datos MongoDB y operar con ellos de una forma asíncrona.
* [**`bcrypt-nodejs`**](https://www.npmjs.com/package/bcrypt-nodejs) Para cifrar contraseñas. Preferido a otros porque no requiere instalar ningún SDK para compilarlo ya que está desarrollado íntegramente en Javascript.
* [**`jwt-simple`**](https://www.npmjs.com/package/jwt-simple)Para codificar y decodificar de forma sencilla [tokens JWT](https://tools.ietf.org/html/rfc7519), ya que la estrategia de autenticación se basa en ellos.
* [**`moment`**](https://www.npmjs.com/package/moment) Para reconocer, transformar, manipular y formatear fechas.
* [**`nodemon`**](https://www.npmjs.com/package/nodemon) Para que durante el desarrollo el servidor se reinicie solo cada vez que haya cambios. Se instala como una dependencia de desarrollo.
* [**``**]()
* [**``**]()
# mean JWT
Estructura básica de una **aplicación web** basada en MongoDB, Express, Angular y NodeJs. Consiste en un servidor que ofrece una API REST, y un cliente basado en Angular y Bootstrap 4. Como estrategia de autenticación se utiliza un Javascript Web Token en las cabeceras HTTP.  
## API
### Módulos utilizados y razón para ello.
* [**`express`**](https://www.npmjs.com/package/express) Framework para gestionar la comunicación con el cliente por medio de HTTP(`request` y `response`) así como el middleware.
* [**`body-parser`**](https://www.npmjs.com/package/body-parser) Middleware para convertir el `body` de un `request HTTP` en un objeto Javascript disponible en `request.body`. En el protocolo HTTP el `body` de un `request` tiene el interface `ReadableStream` y puede contener de todo. `body-parser` reconoce y transforma (parsea) streams cuyo contenido sea del tipo JSON, Raw, Text, o URL-enconded form. No parsea streams de multipart/form-data, es decir, archivos. 
* [**`multiparty`**](https://www.npmjs.com/package/multiparty) Middleware para parsear el `body` de `request` con contenidos del tipo multipart/form-data, es decir, archivos.
* [**`mongoose`**](https://www.npmjs.com/package/mongoose) Para modelar como objetos javscript los documentos de la base de datos MongoDB y operar con ellos de una forma asíncrona.
* [**`winston`**](https://www.npmjs.com/package/winston) Para guardar un registro (log) de lo que sucede en el servidor.
* [**`bcrypt-nodejs`**](https://www.npmjs.com/package/bcrypt-nodejs) Para cifrar contraseñas. Preferido a otros porque no requiere instalar ningún SDK para compilarlo ya que está desarrollado íntegramente en Javascript.
* [**`jwt-simple`**](https://www.npmjs.com/package/jwt-simple)Para codificar y decodificar de forma sencilla [tokens JWT](https://tools.ietf.org/html/rfc7519), ya que la estrategia de autenticación se basa en ellos.
* [**`moment`**](https://www.npmjs.com/package/moment) Para reconocer, transformar, manipular y formatear fechas.
#### Módulos para el desarrollo
* [**`dotenv`**](https://www.npmjs.com/package/dotenv) Para cargar las variables del entorno desde un archivo .env a process.env
* [**`debug`**](https://www.npmjs.com/package/debug) Para generar mensajes de depuración propios en la consola. Se activa/desactiva en los archivos que se indiquen en la variable de entorno `DEBUG` que configuramos en el archivo `.env` inicialmente con el valor `*`
* [**`cross-env`**](https://www.npmjs.com/package/cross-env) Para establecer las variables del entorno una sola vez, con independencia de la plataforma, ya que windows y los sistemas POSIX usan notaciones distintas.). Este módulo se ejecuta en los scripts start, debug y test de `package.json` 
* [**`nodemon`**](https://www.npmjs.com/package/nodemon) Para que durante el desarrollo el servidor se reinicie solo cada vez que haya cambios.
* [**`karma`**](https://www.npmjs.com/package/karma) Para realizar los test directamente en los navegadores.
* [**`karma-jasmin`**]() Para usar Jasmine para establecer las especificaciones que deben superar los tests.
* [**`karma-chrome-launcher`**](https://www.npmjs.com/package/karma-chrome-launcher) Para hacer los test en Chrome.
* [**`karma-requirejs`**]() Para poder usar `requirejs` en `karma`. 
* [**`requirejs`**]() Para probar métodos que impliquen HTTP en las especificaciones.
* [**`karma-coverage`**](https://www.npmjs.com/package/karma-coverage) Para saber qué porcentaje del código está cubierto por los tests.
### Consideraciones generales
#### Modo estricto
* `use strict` Se utiliza el modo estricto para forzar excepciones en todos los errores y que no pasen desapercibidos; por velocidad de ejecución (es optimizado mejor), y como transición a las futuras versiones de ECMAScript. 
#### Configuración mediante un objeto
Para simplificar el acceso a opciones de configuración generales optamos por crear un módulo que exporta un objeto cuyas propiedades recogen los parámetros de configuración, objeto que importamos desde `index.js` y lo asignamos a la variable `configuracion` para que esté disponible en toda la aplicación.
#### Variables de entorno

### Test de la API.
* Se utiliza `karma` con `jasmin` para facilitar la metodología de trabajo **[Behavior Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development)**.


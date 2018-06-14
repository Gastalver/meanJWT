# mean JWT
Estructura básica de una **aplicación web** basada en MongoDB, Express, Angular y NodeJs. Consiste en un servidor que ofrece una API REST, y un cliente basado en Angular y Bootstrap 4. Como estrategia de autenticación se utiliza un Javascript Web Token en las cabeceras HTTP.  
## API
### Módulos utilizados y razón para ello.
* [**`express`**](https://www.npmjs.com/package/express) Framework para gestionar la comunicación con el cliente por medio de HTTP(`request` y `response`) así como el middleware.
* [**`body-parser`**](https://www.npmjs.com/package/body-parser) Middleware para convertir el `body` de un `request HTTP` en un objeto Javascript disponible en `request.body`. En el protocolo HTTP el `body` de un `request` tiene el interface `ReadableStream` y puede contener de todo. `body-parser` reconoce y transforma (parsea) streams cuyo contenido sea del tipo JSON, Raw, Text, o URL-enconded form. No parsea streams de multipart/form-data, es decir, archivos. 
* [**`multer`**](https://www.npmjs.com/package/multer) Middleware para parsear el `body` de `request` con contenidos del tipo multipart/form-data, es decir, archivos.
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
* [**`jasmine`**](https://www.npmjs.com/package/jasmine) Para realizar los test.
* [**`karma`**](https://www.npmjs.com/package/karma) Para realizar los test directamente en los navegadores.
* [**`karma-jasmin`**]() Para usar Jasmine para establecer las especificaciones que deben superar los tests.
* [**`karma-chrome-launcher`**](https://www.npmjs.com/package/karma-chrome-launcher) Para hacer los test en Chrome.
* [**`karma-requirejs`**]() Para poder usar `requirejs` en `karma`. 
* [**`requirejs`**]() Para probar métodos que impliquen HTTP en las especificaciones.
* [**`karma-coverage`**](https://www.npmjs.com/package/karma-coverage) Para saber qué porcentaje del código está cubierto por los tests.
* [**`jsdoc`**](https://www.npmjs.com/package/jsdoc) Para generar automáticamente documentación en formato HTML desde comentarios. 
* [**`jsdoc-http-plugin`**](https://www.npmjs.com/package/jsdoc-http-plugin) Para añadir etiquetas de ruta a jsdoc.
### Consideraciones generales
#### Idioma español
Todas las variables, funciones etc... se denominan en español. Sin más pretensiones. Es una opción personal.

#### Modo estricto
* `use strict` Se utiliza el modo estricto para forzar excepciones en todos los errores y que no pasen desapercibidos; por velocidad de ejecución (es optimizado mejor), y como transición a las futuras versiones de ECMAScript. 

#### Configuración mediante un objeto
Se propone agrupar en la medida de lo posible toda la configuración general de la API en un objeto config. que se genera además de forma condicional según cual sea el valor de la variable de entorno NODE_ENV. Para ello, desde /configuracion/index.js, primero se importan tres módulos distintos, uno para development, otro para production y otro para test, cada uno de los cuales consiste en un objeto con las propiedades de configuración correspondientes a cada entorno, y se guardan en variables con su mismo nombre; luego index.js exporta un objeto al que se asignan las anteriores propiedades, pero sólo del objeto cuyo nombre coincida con el de la variable NODE_ENV, y además las propiedades de los demás objetos que se incluyan en index.js como contenedores de otras opciones de configuración. Esto se logra con esta técnica:

```javascript
module.exports = {
    development: Object.assign({}, development, defaults, global, logger),
    test: Object.assign({}, test, defaults, global, logger),
    production: Object.assign({}, production, defaults, global, logger)
}[process.env.NODE_ENV || 'development'];
```

#### Variables de entorno
Las variables de entorno pueden servir para albergar datos sensibles como por ejemplo la url, el usuario y la clave para acceder a una base de datos. Esta información debería ser introducida desde la línea de comandos del sistema que aloje la aplicación. No debería constar en ningún archivo. No obstante, para facilitar la carga de estas variables de entorno en un sistema concreto proponemos opcionalmente el uso de .env y el módulo dotenv. En .env situamos los datos sensibles propios del despliegue (deployment) correspondiente. Y el módulo dotenv se encarga de cargarlos en process.env nada más iniciar la aplicación. 
Se hace desde index.js, mediante: 

```javascript
require('dotenv').config();
```

A la hora de establecer las variables de entorno por medio de la línea de comandos, la notación de los sistemas Windows es distinta a la de los sistemas POSIX. Proponemos un módulo útil, crossenv, que permite la carga de variables de entorno desde un script en package.json, sin tener que preocuparnos de la notación del sistema de destino. Lo utilizamos únicamente para establecer la variable process.env.NODE_ENV a 'development'.

**El repositorio no contiene ningún archivo `.env`. Hay que crearlo en cada instalación.** Debe contener como mínimo las variables que se indican a continuación, de lo contrario el Servidor no podrá funcionar correctamente, fallará la conexión a la base de datos o fallará la creación de tokes, etc.:
```Javascript
MONGODB_URL = mongodb://127.0.0.1:27017/nombreBd
SECRET_TOKEN = PalabraSecretaConLaQueSeGeneranTokens
```

#### Reconexión automática de Mongoose
En `index.js` se configura mongoose para reconectar automáticamente tanto si falla la primera conexión como si con posterioridad a haber realizado la primera conexión se pierde. Se distinguen ambos supuestos porque MongoDB los distingue.
Se crea la propiedad `config.mongo.operativo` con valor true/false dependiendo de que haya conexión a la base de datos no.
El primer middleware de express comprueba que hay conexión a la base de datos y si no la hay, envia un error 503 con un mensaje.

#### Arquitectura MVC
Utilizamos el patrón de diseño de software MVC. Separamos modelos, controladores y vistas. En principio la API no genera vistas. Todas sus respuestas son objectos JSON. Las vistas se generan en el cliente Angular.

#### Diseño de la autenticación
* El primer paso es usar la ruta /api/acceso para facilitar el email y la clave y añadir en el body la propiedad recibirToken. Si ambos son correctos, se envía un token que contiene los datos del usuario codificados, su _id, nombre, apellidos, apodo, email, rol e imagen, así como la fecha de generación del token y la de expiración (hemos puesto 30 días, configúrese a voluntad).
* En las subsiguientes llamadas a rutas que requieren autenticación, el cliente debe añadir el token en una cabecera HTTP "Authorization".
* En las rutas que exigen autenticación se usa un middleware específico de autenticación que comprueba si se ha enviado la cabecera 'Authorization', en caso afirmativo decodifica el token, del que extrae los datos de usuario y los guarda en `req.usuario` para que estén disponibles para el handler de la ruta como datos de usuario autenticado.
* Dado que el token está codificado, salvo que sea verdadero producirá un error en el middleware al ser descodificado, lo que impide el paso al handler. Se devuelve un error de falta de autenticación. 

#### Res.mensaje
Se propone la convención de que el objeto de respuesta JSON, si no devuelve lo esperado, contenga siempre una propiedad `res.mensaje` explicando lo sucedido.

### Test de la API.
* Se utiliza `karma` con `jasmin` para facilitar la metodología de trabajo **[Behavior Driven Development](https://en.wikipedia.org/wiki/Behavior-driven_development)**.

### Documentación de la API
* Se genera con el script `doc` de package.json. Desde el terminal, estando en /api, teclear `npm doc`. Utiliza el módulo `jsdoc` con un plugin que permite añadir algunas etiquetas relativas a rutas. Sólo documentamos las rutas. La documentación generada se encuentra en la carpeta `api\documentacion` que se puede examinar a partir del archivo `index.html`
Otra alternativa interesante para documentar la API es el módulo `swagger-jsdoc`, por si se quiere probar.

 ## CLIENTE
 ### Módulos utilizados y razón para ello.
 Aparte de todos los módulos que instala `angular-cli` por defecto instalamos los siguientes:
 * [**`bootstrap`**](https://www.npmjs.com/package/bootstrap) Como framework CSS. Sólo utilizamos los estilos, que se importan desde `angular.json`.
 * [**`@ng-bootstrap`**](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap) Directivas Angular que sustituyen a los componentes Bootstrap y hacen innecesario bootstrap.js. 
 * [**`picturefill`**](https://www.npmjs.com/package/picturefill) Polifill para poder usar el elemento `<picture>` de HTML5 en IE10 y 11. Lo usamos en el Carousel del componente landing page. Se importa luego desde `polyfills.ts`. 
 * [**``**]() Para .

### Comentarios
#### Carousel. 
El carousel en landing page resuelve un problema muy común en Bootstrap, que las imagenes sean responsive. Además se optimiza para que cargue una imagen de un tamaño adecuado al tamaño de pantalla del agente.
Implementamos esta solución comentada en [BootstrapCreative](Luego crea las fotografías.). 
Es prescindible, desde luego. Se podría también eliminar el módulo picturefill. Esta es solo una propuesta de landing page.
 
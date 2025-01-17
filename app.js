// app.js

// Inicializar express y configuraciones principales.
const express = require('express'); //? Usado?: SI
//--- Explicación: Framework para construir aplicaciones web en Node.js.

const bodyParser = require('body-parser'); //? Usado?: SI
//--- Explicación: Middleware para analizar los datos enviados en el cuerpo de las peticiones HTTP.

const session = require('express-session'); //? Usado?: SI
//--- Explicación: Middleware para gestionar sesiones de usuario en la aplicación.

const dotenv = require('dotenv'); //? Usado?: SI
//--- Explicación: Cargar las variables de entorno desde el archivo .env.

dotenv.config(); //? Usado?: SI
//--- Explicación: Configurar el acceso a las variables de entorno.

const middlewares = require('./middlewares'); //? Usado?: SI
//--- Explicación: Importar funciones y middleware desde el archivo middlewares.js.

const routes = require('./routes'); //? Usado?: SI
//--- Explicación: Importar rutas desde el archivo routes.js.

const app = express(); //? Usado?: SI
//--- Explicación: Crear una instancia de una aplicación de Express.

const PORT = 4000; //? Usado?: SI
//--- Explicación: Configurar el puerto en el que se ejecuta la aplicación.

// Configurar middlewares globales.
app.use(bodyParser.urlencoded({ extended: true })); //? Usado?: SI
//--- Explicación: Permitir que Express analice los datos enviados por formularios.

app.use(session({ //? Usado?: SI
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));
//--- Explicación: Configurar la gestión de sesiones con un secreto tomado de las variables de entorno.

// Configurar middlewares y rutas.
middlewares.setupAPP(app); //? Usado?: SI
//--- Explicación: Configurar los middlewares personalizados definidos en middlewares.js.

routes.setup(app); //? Usado?: SI
//--- Explicación: Configurar las rutas principales definidas en routes.js.

// Iniciar servidor.
app.listen(PORT, () => { //? Usado?: SI
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Arrancar el servidor en el puerto especificado.
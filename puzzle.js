// Snippets de código para poder componer el programa

// Usado?: YES
// Snippets de código para poder componer el programa

//Usado?: SI 
// Snippets de código para poder componer el programa

//Usado?: SI 
const middlewares = require('./middlewares');
//--- Explicación: Traemos el archivo de middlewares para usar las funciones que tiene


//Usado?: SI 
const bodyParser = require('body-parser');
//--- Explicación: Lo necesitamos para poder leer los datos del formulario


//Usado?: SI 
const session = require('express-session');
//--- Explicación: Usamos session para manejar las sesiones de los usuarios


//Usado?: SI 
const express = require('express');
//--- Explicación: Importamos express 


//Usado?: NO 
const bodyParser = require('body-parser');
//--- Explicación: Este fragmento ya está incluido antes, por lo que no es necesario volver a usarlo


//Usado?: NO 
const session = require('express-session');
//--- Explicación: Este fragmento ya está incluido antes, por lo que no es necesario volver a usarlo

//Usado?: SI 
const dotenv = require('dotenv');
//--- Explicación: Traemos dotenv para cargar la palabra secreta

//Usado?: SI 
const middlewares = require('./middlewares');
//--- Explicación: Traemos el archivo de middlewares para usar las funciones que tiene


//Usado?: SI 
const routes = require('./routes');
//--- Explicación: Importamos las rutas que hemos definido en el archivo routes.js


//Usado?: SI 
dotenv.config();
//--- Explicación: Cargamos las variables de entorno (como la palabra secreta)


//Usado?: SI 
const app = express();
//--- Explicación: Creamos la aplicación de express para usarla 

//Usado?: SI 
const PORT = 4000;
//--- Explicación: Definimos el puerto


//Usado?: SI 
dotenv.config();
//--- Explicación: Cargamos las variables de entorno para que estén disponibles en la app

//Usado?: SI 
middlewares.setupApp(app);
//--- Explicación: Configuramos la app con los middlewares necesarios


//Usado?: SI 
routes.setup(app);
//--- Explicación: Definimos las rutas para la aplicación


//Usado?: SI 
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Comprobamos si la palabra es correcta. Si lo es, seguimos; si no, mostramos un error

//Usado?: SI 
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Si no estamos logados, sale un mensaje de error o el formulario para meter la palabra


//Usado?: SI 
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Para que el usuario meta la palabra


const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};

//Usado?: SI 
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Si la palabra es correcta, redirigimos al perfil del usuario


//Usado?: SI 
app.use(bodyParser.urlencoded({ extended: true }));
//--- Explicación: UPara procesar los datos del formulario


//Usado?: SI 
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));
//--- Explicación:controlar las sesiones del usuario


//Usado?: SI 
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Iniciamos el servidor para que escuche las peticiones


//Usado?: SI 
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Verificamos si el usuario está logado antes de acceder al perfil

//

//Usado?: SI 
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Mostramos la página de perfil si la sesión es válida


//Usado?: SI 
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Cerramos la sesión y redirigimos a la página principal


//Usado?: SI 
module.exports = {
  setup,
};
//--- Explicación: Exportamos la función setup para usarla en otros archivos


//Usado?: SI 
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exportamos los middlewares para usarlos en otros archivos



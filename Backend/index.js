const express = require('express');
var cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

//crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());


// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clubes', require('./routes/clubes'));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});



import Server from "./classes/server";
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from "./routes/usuario";
import postRoutes from "./routes/post";

const server = new Server();

// Middleware - bodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// FileUpload
server.app.use( fileUpload() );

// Rutas de mi App
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );

// Conectar db
mongoose.connect('mongodb://localhost:27017/fotosgram', 
                { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE!!');
});

// levantar express
server.start( () => {
    console.log(`Seridor corriendo en puerto: ${ server.port }`);
})
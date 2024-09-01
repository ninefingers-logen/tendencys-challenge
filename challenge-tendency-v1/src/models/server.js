import express, { json } from 'express';
import cors from 'cors';
import router from '../routes/auth.js';

import { dbConnection } from '../database/config.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // this.productsPath = '/products';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }


    middlewares() {

        // CORS para peticiones de origen cruzado
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(json());

        //  Parsear cuerpos codificados en URL
        this.app.use(express.urlencoded({ extended: true, strict: false, }));


    }

    routes() {

        this.app.use(this.authPath, router);
        // this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

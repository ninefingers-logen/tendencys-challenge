import express, { json } from 'express';
import cors from 'cors';
import { dbConnection } from './database/config.js';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import { errorHandler } from './middlewares/errorHandler.js';


export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.productsPath = '/products';
        this.authPath = '/auth';

        // Connect to database
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Routes of my app
        this.routes();
        
        this.errorMiddleware();
    }

    async connectDb() {
        await dbConnection();
    }


    middlewares() {


        // CORS for requests from any origin
        this.app.use(cors());

        // Lecture and parsing of the body
        this.app.use(json());

        // Parsear cuerpos codificados en URL
        // Parse incoming URL-encoded bodies
        this.app.use(express.urlencoded({ extended: true, strict: false, }));


    }

    routes() {

        this.app.use(this.authPath, authRouter);
        this.app.use(this.productsPath, productsRouter);
        // this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    errorMiddleware() {
        this.app.use(errorHandler)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }

}

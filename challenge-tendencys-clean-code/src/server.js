import express, {Router} from 'express';
import cors from 'cors';


export class Server {

  constructor({routes, port}) {
      this.app  = express();
      this.port = process.env.PORT;
      this.routes = routes;

      // this.usuariosPath = '/api/usuarios';
      // this.authPath     = '/api/auth';

      // Conectar a base de datos
      // this.conectarDB();

      // Middlewares
      // this.middlewares();

      // Rutas de mi aplicación
      this.router();
  }

  // async conectarDB() {
  //     await dbConnection();
  // }


  middlewares() {

      // CORS
      this.app.use( cors() );

      // Lectura y parseo del body
      this.app.use( express.json() );


  }

  router() {

      this.app.use( this.routes );
      
  //     this.app.use( this.authPath, require('../routes/auth'));
  //     this.app.use( this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
      this.app.listen( this.port, () => {
          console.log('Servidor corriendo en puerto', this.port );
      });
  }

}

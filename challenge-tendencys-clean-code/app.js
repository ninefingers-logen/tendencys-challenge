import 'dotenv/config';
import {Server} from './src/server.js';
import { AppRoutes } from './src/router.js';


const server = new Server({
  routes: AppRoutes.routes,
  port: process.env.PORT
});

server.listen();
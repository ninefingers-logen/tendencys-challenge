import 'dotenv/config';

import {Server} from './src/server.js';
const server = new Server();

// TODO: Configurar middlwares errores
// TODO: Eliminar los baselog
// TODO: cambiar la duracion del token



server.listen();
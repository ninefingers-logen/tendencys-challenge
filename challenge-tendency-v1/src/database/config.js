import 'dotenv/config';
import {Sequelize} from 'sequelize';
import { GeneralError } from '../utils/errors/generalError.js';


/**
 * Configurando la conexión a la base de datos con Sequelize
 */


export const sequelize = new Sequelize( process.env.MYSQL_DATABASE, process.env.MYSQL_DB_USER, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
})


export const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection with MySQL and Sequelize has been established successfully.');
        await sequelize.sync( { alter: true } );
        
    } catch (error) {
        throw GeneralError.internalServer( 'Failed to initialize database', error );
    }
}
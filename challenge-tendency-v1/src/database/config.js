import 'dotenv/config';
import { createPool } from 'mysql2/promise';
import {Sequelize} from 'sequelize';
import { GeneralError } from '../utils/errors/generalError.js';


const baselog = '[mysql.connector]';
let pool;


/**
 * Generates pool connection to be used throughout the app
 */

// export const dbConnection = async () => {
//     const subBaselog = `${baselog}[dbConnection]`;

//     try {
//         pool = await createPool({
//             connectionLimit: process.env.MYSQL_DB_CONNECTION_LIMIT,
//             host: 'localhost' || '127.0.0.1',
//             user: process.env.MYSQL_DB_USER,
//             password: process.env.MYSQL_PASSWORD,
//             database: process.env.MYSQL_DATABASE,
//             port: '3307',
            
//         });

//         console.log(`${subBaselog} MySql Adapter Pool generated successfully`);
//         return pool;
//     } catch (e) {
//         console.error(`${subBaselog} ### ERROR: ${e}`);
//         throw new Error('Failed to initialized pool');
//     }
// };
// // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// /**
//  * Executes SQL queries in MySQL db
//  *
//  * @param {string} query - Provide a valid SQL query
//  * @param {string[] | Object} params - Provide the parameterized values used
//  * in the query
//  */
// export const execute = async (query, params) => {
//     const subBaselog = `${baselog}[execute]`;

//     try {
//         if (!pool) {
//             await dbConnection();
//         }

//         console.log(`${subBaselog} query`, query);
//         console.log(`${subBaselog} params`, params);

//         const [results] = await pool.execute(query, params);
//         return results;

//     } catch (e) {
//         console.error(`${subBaselog} ### ERROR: ${e}`);
//         throw new Error('Failed to execute MySQL query');
//     }
// };
// // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// PROBANDO SEQUELIZE

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
        console.log("🚀 ~ dbConnection ~ error:", error)

        throw GeneralError.internalServer( 'Failed to initialize database', error );
        
    }
}
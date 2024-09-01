import 'dotenv/config.js';
import { createPool } from 'mysql2/promise';


const baselog = '[mysql.connector]';
let pool;


/**
 * Generates pool connection to be used throughout the app
 */

export const dbConnection = async () => {
    const subBaselog = `${baselog}[dbConnection]`;

    try {
        pool = await createPool({
            connectionLimit: process.env.MYSQL_DB_CONNECTION_LIMIT,
            host: process.env.MYSQL_DB_HOST,
            user: process.env.MYSQL_DB_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });

        console.log(`${subBaselog} MySql Adapter Pool generated successfully`);
        return pool;
    } catch (e) {
        console.error(`${subBaselog} ### ERROR: ${e}`);
        throw new Error('Failed to initialized pool');
    }
};
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


/**
 * Executes SQL queries in MySQL db
 *
 * @param {string} query - Provide a valid SQL query
 * @param {string[] | Object} params - Provide the parameterized values used
 * in the query
 */
export const execute = async (query, params) => {
    const subBaselog = `${baselog}[execute]`;

    try {
        if (!pool) {
            await dbConnection();
        }

        console.log(`${subBaselog} query`, query);
        console.log(`${subBaselog} params`, params);

        const [results] = await pool.execute(query, params);
        return results;

    } catch (e) {
        console.error(`${subBaselog} ### ERROR: ${e}`);
        throw new Error('Failed to execute MySQL query');
    }
};
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




// export const dbConnection = async () => {

//     try {

//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log('Connectado a la base de datos de MongoDB');

//     } catch (error) {
//         console.log(error);
//         throw new Error('Error a la hora de iniciar la base de datos');
//     }


// }
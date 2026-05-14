import mysql from 'mysql2';
import { getRequiredEnv } from './config/Env';

const dbPort = Number(getRequiredEnv('DB_PORT'));

if (Number.isNaN(dbPort)) {
    throw new Error('Variavel de ambiente DB_PORT deve ser um numero');
}

const pool = mysql.createPool({
    host: getRequiredEnv('DB_HOST'),
    port: dbPort,
    user: getRequiredEnv('DB_USER'),
    password: getRequiredEnv('DB_PASSWORD'),
    database: getRequiredEnv('DB_NAME'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const promisePool = pool.promise();

export {promisePool};

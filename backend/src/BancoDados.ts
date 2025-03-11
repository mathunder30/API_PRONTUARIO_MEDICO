import mysql from 'mysql2';
import dontenv from 'dotenv';

dontenv.config();

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'aluno',
    database: 'prontuario_medico',

});

const promisePool = pool.promise();

export {promisePool};
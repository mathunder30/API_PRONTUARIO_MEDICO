import express, {Request, Response, Router} from 'express';
import { promisePool } from './BancoDados';
const path = require('path');
const app = express();
const port = 3000;

app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

promisePool.getConnection()
.then(() => console.log('Conectado ao MySQL'))
.catch((error) => {console.error(`Erro ao conectar ao MySQL ${error}`)
    process.exit(1);
});

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})
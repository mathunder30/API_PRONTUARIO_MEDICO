
import express, {Request, Response} from 'express';
import { promisePool } from './BancoDados';
import cors from 'cors';
import router from './routes/Routes';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))


app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public')))

promisePool.getConnection()
.then(() => console.log('Conectado ao MySQL'))
.catch((error) => {console.error(`Erro ao conectar ao MySQL ${error}`)
    process.exit(1);
});

app.use('/api/paciente', router);

  

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
});
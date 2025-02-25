import express, {Request, Response, Router} from 'express';
import { promisePool } from './BancoDados';
import cors from 'cors';
import router from './routes/Routes';
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

app.use('/api/paciente', router);

// Rota para o formulário
app.get('/info_pessoais_paciente', (req: Request, res: Response) => {
    console.log('Acessando a rota do formulário');
    res.render('info_pessoais_paciente'); 
  });
  

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
});
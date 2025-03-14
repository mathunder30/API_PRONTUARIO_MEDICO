import {promisePool} from '../BancoDados';
import msql2 from 'mysql2';

interface IMedico {
    id?: number,
    nome: string,
    crm: string,
    especialidade: string,
    telefone: string,
    email: string,
    senha: string,
    criado_em: string
}

export default class Medico {
    static async  CadastroMedico (medico: IMedico): Promise<IMedico> {
        const [rows] = await promisePool.execute('INSERT INTO medico (nome, crm, especialidade, telefone, email, senha, criado_em) VALUES(?, ?, ?, ?, ?, ?, ?)',
            [medico.nome, medico.crm, medico.especialidade, medico.telefone, medico.telefone, medico.email, medico.senha, medico.criado_em]);
        console.log('Usuário inserido: ', rows);
        return {...medico, id:(rows as msql2.ResultSetHeader).insertId}


    }
}
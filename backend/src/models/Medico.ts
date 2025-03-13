import { promisePool } from '../BancoDados';
import msql2 from 'mysql2';

interface  IMedico {
    id?: number,
    nome: string,
    crm: string,
    especialidade: string,
    telefone: string,
    email: string,
    senha: string
    criado_em: string
}
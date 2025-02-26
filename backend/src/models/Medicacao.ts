import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IMedicacao {
    id?: number;
    medicamentos: string;
    instrucoes: string;
}

export default class Medicacao{
    static async criandoMedicacao(medicacao: IMedicacao): Promise<IMedicacao> {
        
        console.log("📌 Dados recebidos para inserção:", medicacao);
        if( !medicacao.medicamentos || !medicacao.instrucoes){
            throw new Error('Campos obrigatórios não inseridos.');
        }
        const [rows] = await promisePool.execute(
            
            'INSERT INTO medicacao ( medicamentos, instrucoes) VALUES (?, ?)',
            [ medicacao.medicamentos, medicacao.instrucoes ]
        ); console.log(' ✅ Historico medico inserido: ', rows);
        return {...medicacao, id:(rows as msql2.ResultSetHeader).insertId}
    }
}
import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IProcedimentos {
    id?: number,
    paciente_id: number,
    nome_procedimento: string,
    data_procedimento: string,
    observacoes_procedimento: string
}

export default class Procedimentos {
    static async criandoProcedimento(procedimento: IProcedimentos): Promise<IProcedimentos> {
        const [rows] = await promisePool.execute('INSERT INTO procedimentos ( paciente_id, nome_procedimento, data_procedimento, observacoes_procedimento) VALUES (?, ?, ?, ?)',
            [procedimento.paciente_id, procedimento.nome_procedimento, procedimento.data_procedimento, procedimento.observacoes_procedimento]
        ); console.log(' ✅ Procedimentos medicos inserido: ', rows);
                return {...procedimento, id:(rows as msql2.ResultSetHeader).insertId}
    };

      static async buscarProcedimentoID (paciente_id: number): Promise<IProcedimentos | null> {
            const [rows] = await promisePool.execute('SELECT * FROM procedimentos WHERE paciente_id = ?', [paciente_id]);
            const procedimento = (rows as IProcedimentos[])[0];
            return procedimento || null;
        }
}
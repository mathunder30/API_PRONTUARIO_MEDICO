import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IHistorico {
    id?: number;
    paciente_id: number,
    motivo_consulta: string;
    diagnostico: string;
    sintomas: string;
}

export default class Historico{
    static async criandoHistorico(historico: IHistorico): Promise<IHistorico> {
        
        console.log("📌 Dados recebidos para inserção:", historico);
        if( !historico.motivo_consulta || !historico.diagnostico || !historico.sintomas){
            throw new Error('Campos obrigatórios não inseridos.');
        }
        const [rows] = await promisePool.execute(
            
            'INSERT INTO historico_medico ( paciente_id, motivo_consulta, diagnostico, sintomas) VALUES (?, ?, ?, ?)',
            [historico.paciente_id, historico.motivo_consulta, historico.diagnostico, historico.sintomas]
        ); console.log(' ✅ Historico medico inserido: ', rows);
        return {...historico, id:(rows as msql2.ResultSetHeader).insertId}
    }

}
import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IObservacoes {
    id?: number;
    paciente_id: number,
    observacoes_medicas: string;
    data_registro?: string;
   
}

export default class Observacoes{
    static async criandoObservacoes(observacoes: IObservacoes): Promise<IObservacoes> {
        
        console.log("📌 Dados recebidos para inserção:", observacoes);
        if( !observacoes.observacoes_medicas){
            throw new Error('Campos obrigatórios não inseridos.');
        }

        
        const [rows] = await promisePool.execute(
            'INSERT INTO observacoes ( paciente_id, observacoes_medicas, data_registro) VALUES (?, ?, ?)',
            [ observacoes.paciente_id, observacoes.data_registro, observacoes.observacoes_medicas]
        ); 
        
        console.log(' ✅ Observações do paciente inserido: ', rows);
        return {...observacoes, id:(rows as msql2.ResultSetHeader).insertId}
    }
}
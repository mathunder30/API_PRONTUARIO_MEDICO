import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IObservacoes {
    id?: number;
    paciente_id: number,
    observacoes_medicas: string;
    data_registro: string;
   
}

export default class Observacoes{
    static async criandoObservacoes(observacoes: IObservacoes): Promise<IObservacoes> {
        
        if( !observacoes.observacoes_medicas){
            throw new Error('Campos obrigatórios não inseridos.');
        }

        
        const [rows] = await promisePool.execute(
            'INSERT INTO observacoes ( paciente_id, observacoes_medicas, data_registro) VALUES (?, ?, ?)',
            [ observacoes.paciente_id, observacoes.observacoes_medicas, observacoes.data_registro]
        ); 
        
        return {...observacoes, id:(rows as msql2.ResultSetHeader).insertId}
    }

    static async buscarObservacoesByID (paciente_id: number): Promise<IObservacoes | null> {
        const [rows] = await promisePool.execute('SELECT * FROM observacoes WHERE paciente_id = ?', [paciente_id]);
        const observacoes = (rows as IObservacoes[])[0];
        return observacoes || null;
    }
}

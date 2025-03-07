import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IMedicacao {
    id?: number;
    paciente_id: number,
    medicamentos: string;
    instrucoes: string;
    dosagem: string;
    frequencia: string;
}

export default class Medicacao{
    static async criandoMedicacao(medicacao: IMedicacao): Promise<IMedicacao> {
        
        console.log("📌 Dados recebidos para inserção:", medicacao);
        if( !medicacao.medicamentos || !medicacao.instrucoes){
            throw new Error('Campos obrigatórios não inseridos.');
        }
        const [rows] = await promisePool.execute(
            
            'INSERT INTO medicacao ( paciente_id, medicamentos, instrucoes, dosagem, frequencia) VALUES (?, ?, ?, ?, ?)',
            [medicacao.paciente_id, medicacao.medicamentos, medicacao.instrucoes, medicacao.dosagem, medicacao.frequencia ]
        ); console.log(' ✅ Historico medico inserido: ', rows);
        return {...medicacao, id:(rows as msql2.ResultSetHeader).insertId}
    }


    static async buscarMedicacaoID (paciente_id: number): Promise<IMedicacao | null> {
        const [rows] = await promisePool.execute('SELECT * FROM medicacao WHERE paciente_id = ?', [paciente_id]);
        const medicamentos = (rows as IMedicacao[])[0];
        return medicamentos || null;
    }
};
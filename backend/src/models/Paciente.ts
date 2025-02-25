import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IPaciente {
    id?: number,
    nome_paciente: string;
    data_paciente: string;
    idade_paciente: number;
    genero_paciente: string;
    cpf_paciente: string;
    telefone_paciente: string;
    endereco_paciente: string;

}

export default class Paciente {

    static async criandoPaciente(paciente: IPaciente): Promise<IPaciente> {
        if (!paciente.nome_paciente || !paciente.data_paciente || !paciente.idade_paciente || 
            !paciente.genero_paciente || !paciente.cpf_paciente || !paciente.telefone_paciente || !paciente.endereco_paciente) {
            throw new Error("Campos obrigatórios não foram preenchidos.");
        }
        const [rows] = await promisePool.execute(
            'INSERT INTO paciente (nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [paciente.nome_paciente, paciente.data_paciente, paciente.idade_paciente, paciente.genero_paciente, paciente.cpf_paciente, paciente.telefone_paciente, paciente.endereco_paciente]
        ); console.log('Usuário inserido: ', rows);
        return {...paciente, id:(rows as msql2.ResultSetHeader).insertId}        
    }
}
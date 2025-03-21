import { promises } from "dns";
import { promisePool } from "../BancoDados";
import msql2 from 'mysql2';

interface IPaciente {
    id?: number;
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
    };

    static async BuscandoTodosPaciente(): Promise<IPaciente[]>{
        const [rows] = await promisePool.execute('SELECT * FROM paciente');
        console.log(`Paciente encontrados: ${rows} `)
        return rows as IPaciente[];
    };

    static async BuscandoPacienteID(id: number): Promise<IPaciente | null> {

        if (!id || isNaN(id)) {
            console.error("Erro: ID inválido recebido.");
            return null;
        }
        console.log(`Buscando paciente com ID:  ${id}`)
        const [rows] = await promisePool.execute('SELECT * FROM paciente WHERE id = ?', [id]);
        const paciente = (rows as IPaciente[])[0];
        console.log(`ID paciente: ${paciente}`)
        return paciente || null;
    };

    static async atualizarPaciente (id: number, paciente: IPaciente): Promise<void>{

        await promisePool.execute('UPDATE paciente SET nome_paciente = ?, data_paciente = ?, idade_paciente = ?, genero_paciente = ?,  cpf_paciente = ?, telefone_paciente = ?, endereco_paciente = ? WHERE id = ?', [
            paciente.nome_paciente || null,
            paciente.data_paciente || null,
            paciente.idade_paciente || null,
            paciente.genero_paciente || null,
            paciente.cpf_paciente || null,
            paciente.telefone_paciente || null,
            paciente.endereco_paciente || null,
            id || null
        ]);
    };

    static async deletarPaciente (id: number): Promise<void> {
        await promisePool.execute('DELETE FROM paciente WHERE id = ?', [id]);
    }


}


import { Request, Response } from "express";
import Paciente from "../models/Paciente";

export const PostCriandoPaciente = async(req: Request, res: Response) => {
    const { nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente } = req.body;

    try{

        const NovoPaciente = await Paciente.criandoPaciente({nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente});
        res.status(201).json({message: 'Paciente criado com sucesso!', paciente: NovoPaciente});

    } catch (error){
         console.error("Erro ao cadastrar paciente:", error);
        res.status(500).json({message: `Erro interno do servidor`});
    }

};

export const GetPaciente = async (req: Request, res: Response) =>{

    try {
        const Pacientes = await Paciente.BuscandoTodosPaciente();
        res.json(Pacientes);
    } catch (error){
        console.error(`Erro ao buscar pacientes:`, error)
        res.status(500).json({ message: `Erro interno do servidor`})
    }
};

export const GetPacienteByID = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id, 10);

    try{
        const paciente = await Paciente.BuscandoPacienteID(Number(id));
        if(paciente){
            res.json(paciente);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado'});
        }
    } catch(error){
        console.error("Erro ao buscar usuario:", error);
        res.status(500).json({ message:'Erro interno do servidor'})
    }
};

export const SetPacienteByID = async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const {nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente } = req.body;
  
    try {
        const paciente_put = await Paciente.atualizarPaciente(id, {nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente});
        res.status(200).json({message: 'Paciente atualizado com sucesso!', paciente_put});
    } catch(error){
        console.error("Erro ao atualizar paciente:", error);
        res.status(500).json({ message: 'Erro interno do servidor'})
    }
}

export const DeletePaciente = async(req: Request, res:Response) => {
    const id = parseInt(req.params.id);
    try{
        await Paciente.deletarPaciente(id);
        res.status(200).json({message: `Usuario excluido com sucesso!`});
    } catch (error){
        console.error("Erro ao excluir paciente:", error);
        res.status(500).json({ message: `Erro interno do servidor`})
    }
}

import { Request, Response } from "express";
import Paciente from "../models/Informacoes_pac";

export const criandoPaciente = async(req: Request, res: Response) => {
    const {nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente } = req.body;
    console.log('Dados recebidos:', {nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente});

    try{

        const NovoPaciente = await Paciente.criandoPaciente({nome_paciente, data_paciente, idade_paciente, genero_paciente, cpf_paciente, telefone_paciente, endereco_paciente});
        res.status(201).json({message: 'Paciente criado com sucesso!', paciente: NovoPaciente});
    } catch (error){
        res.status(500).json({message: `Erro ao cadastrar o paciente ${error}`});
    }
};
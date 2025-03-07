import { Request, Response } from "express";
import Observacoes from "../models/Observacoes";


export const PostcriandoObservacoes = async(req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);
    const{observacoes_medicas, data_registro} = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {observacoes_medicas});

    try{

        const NovoHistorico = await Observacoes.criandoObservacoes({paciente_id, observacoes_medicas, data_registro});
        res.status(201).json({message: 'Observações medicas cadastrado com sucesso', medicacao: NovoHistorico});

    } catch (error) {
        console.error(`Erro ao cadastrar as Observacoes ${error}`);
        res.status(500).json({message: `Erro ao cadastrar as Observacoes ${error}`});

    }
}
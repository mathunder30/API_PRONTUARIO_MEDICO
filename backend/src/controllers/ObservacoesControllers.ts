import { Request, Response } from "express";
import Observacoes from "../models/Observacoes";


export const criandoObservacoes = async(req: Request, res: Response) => {
    const{observacoes_medicas} = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {observacoes_medicas});

    try{

        const NovoHistorico = await Observacoes.criandoObservacoes({observacoes_medicas});
        res.status(201).json({message: 'Observações medicas cadastrado com sucesso', medicacao: NovoHistorico});

    } catch (error) {
        console.error(`Erro ao cadastrar as Observacoes ${error}`);
        res.status(500).json({message: `Erro ao cadastrar as Observacoes ${error}`});

    }
}
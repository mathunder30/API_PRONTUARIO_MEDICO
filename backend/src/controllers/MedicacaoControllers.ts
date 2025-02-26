import { Request, Response } from "express";
import Medicacao from "../models/Medicacao";

export const criandoMedicacao = async(req: Request, res: Response) => {
    const{medicamentos, instrucoes} = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {medicamentos, instrucoes});

    try{

        const NovoHistorico = await Medicacao.criandoMedicacao({medicamentos, instrucoes});
        res.status(201).json({message: 'Medicamentos cadastrado com sucesso', medicacao: NovoHistorico});

    } catch (error) {
        console.error(`Erro ao cadastrar os Medicamentos ${error}`);
        res.status(500).json({message: `Erro ao cadastrar os Medicamentos ${error}`});

    }
}
import { Request, Response } from "express";
import Historico_med from '../models/Historico';
import Historico from "../models/Historico";

export const criandoHistorico = async(req: Request, res: Response) => {
    const{motivo_consulta, diagnostico, sintomas} = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {motivo_consulta, diagnostico, sintomas});

    try{

        const NovoHistorico = await Historico.criandoHistorico({motivo_consulta, diagnostico, sintomas});
        res.status(201).json({message: 'Historico cadastrado com sucesso', historico: NovoHistorico});

    } catch (error) {
        console.error(`Erro ao cadstrar o historico: ${error}`);
        res.status(500).json({message: `Erro ao cadastrar o Historico ${error}`});



    }
}
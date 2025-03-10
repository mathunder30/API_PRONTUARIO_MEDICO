import { Request, Response } from "express";
import Historico_med from '../models/Historico';
import Historico from "../models/Historico";

export const PostcriandoHistorico = async(req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);
    const{motivo_consulta, diagnostico, sintomas} = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {motivo_consulta, diagnostico, sintomas});

    try{

        const NovoHistorico = await Historico.criandoHistorico({paciente_id, motivo_consulta, diagnostico, sintomas});
        res.status(201).json({message: 'Historico cadastrado com sucesso', historico: NovoHistorico});

    } catch (error) {
        console.error(`Erro ao cadstrar o historico ${error}`);
        res.status(500).json({message: `Erro ao cadastrar o historico ${error}`});

    }
}
export const GetHistoricoByID = async(req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);

    try {
        const hist_medico = await Historico.buscarHistoricoByID(Number(paciente_id));
        if(hist_medico){
            res.status(200).json({hist_medico});
        } else {
            res.status(400).json({message: `Observações medicas para o paciente não encontradas!`});
        }
    } catch(error){
        res.status(500).json({message: `Erro ao inserir obsevações medicas para o paciente ${error}`});
    }
}
import { Request, Response } from "express";
import Procedimentos from "../models/Procedimentos";


export const PostcriandoObservacoes = async(req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);
    const{nome_procedimento, data_procedimento,  observacoes_procedimento} = req.body;
    console.log("Recebendo dados do formulário:", req.body);
    console.log('Dados recebidos:', {nome_procedimento});

    try{

        const NovoProcedimento = await Procedimentos.criandoProcedimento({paciente_id, nome_procedimento, data_procedimento, observacoes_procedimento});
        res.status(201).json({message: 'Procedimentos medicas cadastrado com sucesso', Procedimentos: NovoProcedimento});

    } catch (error) {
        console.error(`Erro ao cadastrar os Procedimentos ${error}`);
        res.status(500).json({message: `Erro ao cadastrar os Procedimentos ${error}`});

    }
};

export const GetProcedimentoByID = async(req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);

    try {
        const procedimentos = await Procedimentos.buscarProcedimentoID(Number(paciente_id));
        if(procedimentos){
            res.status(200).json({procedimentos});
        } else {
            res.status(400).json({message: `Procedimentos medicas para o paciente não encontradas!`});
        }
    } catch(error){
        res.status(500).json({message: `Erro ao inserir Procedimentos medicas para o paciente ${error}`});
    }
}
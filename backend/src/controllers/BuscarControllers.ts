import { Request, Response } from "express";
import Observacoes from "../models/Observacoes";
import Medicacao from "../models/Medicacao";
import Historico from "../models/Historico";
import Procedimentos from "../models/Procedimentos";
export const BuscarTodosByID = async (req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);

    try{
        const observacoes = await Observacoes.buscarObservacoesByID(Number(paciente_id));
        const medicamento = await Medicacao.buscarMedicacaoID(Number(paciente_id));
        const historico = await Historico.buscarHistoricoByID(Number(paciente_id));
        const procedimento = await Procedimentos.buscarProcedimentoID(Number(paciente_id));

        if(observacoes && medicamento && historico && procedimento){
            
            res.status(200).json({medicamento, historico, observacoes, procedimento});

        } else if(!observacoes){

            res.status(400).json({message: ` Observações medicas para o paciente não encontradas!`});

        } else if(!medicamento) {

            res.status(400).json({message: `Medicamentos para o paciente não encontradas!`});

        } else if (!historico){

            res.status(400).json({message: `Historico medico do paciente não encontradas!`});

        }  else if (!procedimento){

            res.status(400).json({message: `Procedimento medico do paciente não encontradas!`});

        } else{
            
            res.status(400).json({message: `Nenhum foi encontrado`});
        }
    }catch(error){
        res.status(500).json({message: `Erro ao inserir obsevações medicas para o paciente ${error}`});
    }
}
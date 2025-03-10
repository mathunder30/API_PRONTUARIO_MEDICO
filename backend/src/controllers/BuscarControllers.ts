import { Request, Response } from "express";
import Observacoes from "../models/Observacoes";
import Medicacao from "../models/Medicacao";
import Historico from "../models/Historico";
export const BuscarTodosByID = async (req: Request, res: Response) => {
    const paciente_id = (req.params.id, 10);

    try{
        const paciente = await Observacoes.buscarObservacoesByID(Number(paciente_id));
        const medicamento = await Medicacao.buscarMedicacaoID(Number(paciente_id));
        const historico = await Historico.
    }catch(error){}
}
import { Request, Response } from "express";
import Medicacao from "../models/Medicacao";

export const PostcriandoMedicacao = async(req: Request, res: Response) => {
    const paciente_id = parseInt (req.params.id, 10);
    const { medicamentos, instrucoes, dosagem, frequencia } = req.body;
    console.log("Recebendo dados do formulário:", req.body);

    try{

        const NovoHistorico = await Medicacao.criandoMedicacao({ paciente_id, medicamentos:'roacutan', instrucoes:'tomar sempre com barriga cheia', dosagem: '2 pilulas por dia', frequencia:'todos os dias' });
        res.status(201).json({message: 'Medicamentos cadastrado com sucesso', medicacao: NovoHistorico});

    } catch (error) {
        console.error(`Erro ao cadastrar os Medicamentos ${error}`);
        res.status(500).json({message: `Erro ao cadastrar os Medicamentos ${error}`});

    }
};

export const GetMedicacaoByID = async (req: Request, res: Response) => {
    const paciente_id = parseInt(req.params.id, 10);

    try{
        const medicamento = await Medicacao.buscarMedicacaoID(Number(paciente_id));
        if(medicamento){res.status(200).json({ medicamento});} else {res.status(400).json({message: `Medicamentos não encontrados`})}
        
    } catch(error){
        res.status(500).json({message: `erro ao Buscar medicamentos`})
    }
}
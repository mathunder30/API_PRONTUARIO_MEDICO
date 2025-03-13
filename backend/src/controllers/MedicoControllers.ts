import {Request, Response} from "express";
import Medico from "../models/Medico";
import bcrypt from 'bcrypt';


export const PostRegisterMedico = async (req: Request, res: Response) => {
    const {nome, crm, especialidade, telefone, email, senha, criado_em } = req.body;
    console.log(`Recebendo os dados do Medico ${req.body}`);


    try{
        const salt = 10;
        const senhaHash = await bcrypt.hash(senha, salt);

        const NovoMedico = await Medico.CadastroMedico({nome, crm, especialidade, telefone, email, senha: senhaHash, criado_em});

        if(NovoMedico){
            res.status(201).json({message: 'Medico criado com sucesso!', medico: NovoMedico});
        } else {
            res.status(400).json({message: "Medico não inserido"});
        }
    } catch (error) {
        console.error("Erro ao cadastrar Médico:", error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.log(`Error: ${error} ${errorMessage}`)
        res.status(500).json({messaege:`Email ja cadastrado!`});
    }
}

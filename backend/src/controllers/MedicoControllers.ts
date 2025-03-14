import {Request, Response} from 'express';
import Medico from "../models/Medico";
import bcrypto from 'bcrypt';

export const PostRegisterMedico = async (res: Response, req: Request) => {
    const{nome, crm, especialidade, telefone, email, senha, criado_em} = req.body;
    console.log(`Recebendo os dados do Usuario ${req.body}`);

    if(!nome || !crm || !especialidade || !telefone || !email || !senha || !criado_em){
        res.status(401).json({ error: 'Todos os campos são obrigatórios'});
        return;
    }
    try{
        const salt = 10;
        const senhaHash = await bcrypto.hash(senha, salt);

        const NovoMedico = await Medico.CadastroMedico({nome, crm, especialidade, telefone, email, senha: senhaHash, criado_em});

        if(NovoMedico) {
            res.status(201).json({message: 'Conta criado com sucesso!', medico: NovoMedico});
        }else {
            res.status(400).json({message: 'Usuario não inserido...'});
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        console.log(`Error: ${error} ${errorMessage}`)
        res.status(500).json({messaege:`Email ja cadastrado!`});
    }

}
import {Request, Response} from "express";
import Medico from "../models/Medico";
import bcrypt from 'bcrypt';


export const PostRegisterMedico = async (req: Request, res: Response) => {
    const {nome, crm, especialidade, telefone, email, senha, criado_em } = req.body;
    console.log(`Recebendo os dados do Medico ${req.body}`);

    if(!nome || !crm || !especialidade || !telefone || !email || !senha || !criado_em) {
        res.status(401).json({error: 'Todos os campos são obrigatorio'});
        return; //saindo da execução
    }


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

export const PostLoginMedico = async (req: Request, res: Response) => {
    try{
        const {email, senha} = req.body;
        const LoginMedico = await Medico.LoginMedico(String(email));

        console.log(`Senha recebida do usuario: ${LoginMedico}`);

        if(!LoginMedico){
            res.status(404).json({ message: 'Medico não encontrado'});
            return;
        }


        const senhaCorreta = await bcrypt.compare(senha, LoginMedico.senha);
        console.log(`A senha que foi colocada: ${senhaCorreta}`);

        if(!senhaCorreta){
            res.status(401).json({ message: "Senha incorreta!"});
            return;
        }

        res.status(201).json({message: `Login realizado com sucesso! ${LoginMedico}`});
    }catch(error){
        res.status(500).json({message: `Erro ao buscar usuário: ${error}`  })
    }
}
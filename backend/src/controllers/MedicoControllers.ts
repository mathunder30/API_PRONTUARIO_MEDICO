import {Request, Response} from 'express';
import Medico from "../models/Medico";
import bcrypto from 'bcrypt';
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret";

export const PostRegisterMedico = async (req: Request, res: Response) => {
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
        res.status(500).json({messaege:`Erro`});
    }

};

export const PostLoginMedico = async (req: Request, res: Response) => {
    try {
        const {email, senha} = req.body;

        if(!email || !senha) {
            res.status(400).json({message: "Email e senha são obrigatorios"});
            return;
        }
        const medico = await Medico.LoginMedico(email);

        if(!medico) {
            res.status(404).json({ message: "Usuario não encontrado"});
            return;
        }

        console.log( ` Senha armazenada no banco: ${medico.senha}`);

        const senhaCorreta = await bcrypto.compare(senha, medico.senha);

        if (!senhaCorreta) {
            res.status(403).json({ message: "Senha incorreta"});
            return;

            const { senha: _, ...medicoSemSenha } = recMedico;

            const token = jwt.sign({ id: recMedico.id, email: recMedico.email }, SECRET_KEY, {expiresIn: "1h"})

        }
    } catch (errr) {}
}
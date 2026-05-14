import {Request, Response} from 'express';
import Medico from "../models/Medico";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRequiredEnv } from "../config/Env";

const SECRET_KEY = getRequiredEnv("JWT_SECRET");

export const PostRegisterMedico = async (req: Request, res: Response): Promise<void> => {
    const{nome, crm, especialidade, telefone, email, senha} = req.body;

    if(!nome || !crm || !especialidade || !telefone || !email || !senha){
        res.status(400).json({ error: 'Todos os campos são obrigatórios'});
        return;
    }
    try{
        const salt = 10;
        const senhaHash = await bcrypt.hash(senha, salt);

        const NovoMedico = await Medico.CadastroMedico({nome, crm, especialidade, telefone, email, senha: senhaHash});

        if(NovoMedico) {
            const { senha: _, ...medicoSemSenha } = NovoMedico;
            res.status(201).json({message: 'Conta criada com sucesso!', medico: medicoSemSenha});
        }else {
            res.status(400).json({message: 'Usuario não inserido...'});
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({message:`Erro interno do servidor`});
    }

};

export const PostLoginMedico = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, senha } = req.body;

        // Verifica se os campos estão preenchidos
        if (!email || !senha) {
            res.status(400).json({ message: "Email e senha são obrigatórios" });
            return;
        }

        // Busca o médico pelo email
        const medico = await Medico.LoginMedico(email);

        // Verifica se o médico existe
        if (!medico) {
            res.status(401).json({ message: "Email ou senha inválidos" });
            return;
        }

        // Compara a senha informada com a senha armazenada (hash)
        const senhaCorreta = await bcrypt.compare(senha, medico.senha);

        if (!senhaCorreta) {
            res.status(401).json({ message: "Email ou senha inválidos" });
            return;
        }

        // Remove a senha do objeto antes de enviar a resposta
        const { senha: _, ...medicoSemSenha } = medico;

        // Gera o token JWT
        const token = jwt.sign({ id: medico.id, email: medico.email }, SECRET_KEY, { expiresIn: "1h" });

        // Retorna os dados do médico (sem senha) e o token
        res.status(200).json({ medico: medicoSemSenha, token });

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

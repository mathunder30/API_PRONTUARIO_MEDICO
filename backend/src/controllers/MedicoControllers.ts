import {Request, Response} from 'express';
import Medico from "../models/Medico";
import bcrypto from 'bcrypt';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret";

export const PostRegisterMedico = async (req: Request, res: Response) => {
    const{nome, crm, especialidade, telefone, email, senha} = req.body;
    console.log(`Recebendo os dados do Usuario ${req.body}`);

    if(!nome || !crm || !especialidade || !telefone || !email || !senha){
        res.status(401).json({ error: 'Todos os campos são obrigatórios'});
        return;
    }
    try{
        const salt = 10;
        const senhaHash = await bcrypto.hash(senha, salt);

        const NovoMedico = await Medico.CadastroMedico({nome, crm, especialidade, telefone, email, senha: senhaHash});

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
        const { email, senha } = req.body;

        // Verifica se os campos estão preenchidos
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }

        // Busca o médico pelo email
        const medico = await Medico.LoginMedico(email);

        // Verifica se o médico existe
        if (!medico) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        console.log(`Senha armazenada no banco: ${medico.senha}`);

        // Compara a senha informada com a senha armazenada (hash)
        const senhaCorreta = await bcrypt.compare(senha, medico.senha);

        if (!senhaCorreta) {
            return res.status(403).json({ message: "Senha incorreta" });
        }

        // Remove a senha do objeto antes de enviar a resposta
        const { senha: _, ...medicoSemSenha } = medico;

        // Gera o token JWT
        const token = jwt.sign({ id: medico.id, email: medico.email }, SECRET_KEY, { expiresIn: "1h" });

        // Retorna os dados do médico (sem senha) e o token
        return res.status(200).json({ medico: medicoSemSenha, token });

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

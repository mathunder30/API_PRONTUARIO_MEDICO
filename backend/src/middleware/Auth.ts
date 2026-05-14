import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import { getRequiredEnv } from "../config/Env";

const SECRET_KEY = getRequiredEnv("JWT_SECRET");

export  const VerificarToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace(/^Bearer\s+/i, "");

    if(!token) {
        res.status(401).json({message: 'Acesso negado. Token não fornecido'});
        return;
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY) as {id: number; email: string};
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido"})
    }
}

import { Request, Response } from "express";

export const paginaFormulario = (req: Request, res: Response) => {
    console.log("Rota /info_pessoais_paciente acessada!");
    res.render('info_pessoais_paciente'); 
};
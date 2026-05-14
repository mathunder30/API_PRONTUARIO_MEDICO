import { Request, Response } from "express";

export const GetpaginaFormulario = (req: Request, res: Response) => {
    res.render('info_pessoais_paciente'); 
};

export const GetpaginaHistorico = (req: Request, res: Response) => {
    res.render('hist_medico')
}

export const GetpaginaMedicacao = (req: Request, res: Response) => {
    res.render('medicacao')
}

export const GetpaginaObservacao = (req: Request, res: Response) => {
    res.render('obs_med')
}

export const GetpaginaVisualizacao = (req: Request, res: Response) => {
    res.render('pagina_visualizacao')
}

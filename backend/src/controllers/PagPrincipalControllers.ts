import { Request, Response } from "express";

export const GetpaginaFormulario = (req: Request, res: Response) => {
    console.log("Rota /info_pessoais_paciente acessada!");
    res.render('info_pessoais_paciente'); 
};

export const GetpaginaHistorico = (req: Request, res: Response) => {
    console.log("rota /hist_medico acessada");
    res.render('hist_medico')
}

export const GetpaginaMedicacao = (req: Request, res: Response) => {
    console.log("rota /medicacao acessada");
    res.render('medicacao')
}

export const GetpaginaObservacao = (req: Request, res: Response) => {
    console.log("rota /obs_med acessada");
    res.render('obs_med')
}

export const GetpaginaVisualizacao = (req: Request, res: Response) => {
    console.log("rota /pagina_visualizacao acessada");
    res.render('pagina_visualizacao')
}
import  Express  from "express";
import { criandoPaciente } from "../controllers/PacienteControllers";
import { paginaFormulario } from "../controllers/PagPrincipalControllers";
const router = Express.Router();

router.post('/criar_paciente', criandoPaciente);

router.get('/info_pessoais_paciente', paginaFormulario);

export default router;
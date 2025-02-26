import  Express  from "express";
import { criandoPaciente } from "../controllers/PacienteControllers";
import { paginaFormulario, paginaHistorico } from "../controllers/PagPrincipalControllers";
import { criandoHistorico } from "../controllers/HistoricoControllers";
const router = Express.Router();

router.post('/criar_paciente', criandoPaciente);
router.post('/criar_historico', criandoHistorico);

router.get('/info_pessoais_paciente', paginaFormulario);
router.get('/hist_medico', paginaHistorico);


export default router;
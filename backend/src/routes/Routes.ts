import  Express  from "express";
import { paginaFormulario, paginaHistorico, paginaMedicacao, paginaObservacao } from "../controllers/PagPrincipalControllers";
import { criandoPaciente } from "../controllers/PacienteControllers";
import { criandoHistorico } from "../controllers/HistoricoControllers";
import { criandoMedicacao } from "../controllers/MedicacaoControllers";
import { criandoObservacoes } from "../controllers/ObservacoesControllers";
const router = Express.Router();

router.post('/criar_paciente', criandoPaciente);
router.post('/criar_historico', criandoHistorico);
router.post ('/criar_medicamento', criandoMedicacao);
router.post ('/criar_observacao', criandoObservacoes);



// rotas das paginas dos formularios
router.get('/info_pessoais_paciente', paginaFormulario);
router.get('/hist_medico', paginaHistorico);
router.get('/medicacao', paginaMedicacao);
router.get('/obs_med', paginaObservacao);

export default router;
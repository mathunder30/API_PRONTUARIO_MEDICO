import  Express  from "express";
import { GetpaginaFormulario, GetpaginaHistorico, GetpaginaMedicacao, GetpaginaObservacao, GetpaginaVisualizacao } from "../controllers/PagPrincipalControllers";
import { PostCriandoPaciente } from "../controllers/PacienteControllers";
import { PostcriandoHistorico } from "../controllers/HistoricoControllers";
import { PostcriandoMedicacao } from "../controllers/MedicacaoControllers";
import { PostcriandoObservacoes } from "../controllers/ObservacoesControllers";
const router = Express.Router();

router.post('/criar_paciente', PostCriandoPaciente);
router.post('/criar_historico', PostcriandoHistorico);
router.post ('/criar_medicamento', PostcriandoMedicacao);
router.post ('/criar_observacao', PostcriandoObservacoes);



// rotas das paginas dos formularios
router.get('/info_pessoais_paciente', GetpaginaFormulario);
router.get('/hist_medico', GetpaginaHistorico);
router.get('/medicacao', GetpaginaMedicacao);
router.get('/obs_med', GetpaginaObservacao);
router.get('/pagina_visualizacao', GetpaginaVisualizacao);

export default router;
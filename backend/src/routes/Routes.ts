import  Express  from "express";
import { GetpaginaFormulario, GetpaginaHistorico, GetpaginaMedicacao, GetpaginaObservacao, GetpaginaVisualizacao } from "../controllers/PagPrincipalControllers";
import { PostCriandoPaciente, GetPaciente, GetPacienteByID, SetPacienteByID, DeletePaciente } from "../controllers/PacienteControllers";
import { PostcriandoHistorico, GetHistoricoByID } from "../controllers/HistoricoControllers";
import { PostcriandoMedicacao, GetMedicacaoByID } from "../controllers/MedicacaoControllers";
import { PostcriandoObservacoes, GetObservacoesByID } from "../controllers/ObservacoesControllers";
import {PostcriandoProcedimentos, GetProcedimentoByID} from "../controllers/ProcedimentoControllers";
import { BuscarTodosByID } from "../controllers/BuscarControllers";
import {PostLoginMedico, PostRegisterMedico} from "../controllers/MedicoControllers";
import { VerificarToken } from "../middleware/Auth";
import { authRateLimit } from "../middleware/RateLimit";

const router = Express.Router();

// rotas das paginas dos formularios
router.get('/info_pessoais_paciente', GetpaginaFormulario);
router.get('/hist_medico', GetpaginaHistorico);
router.get('/medicacao', GetpaginaMedicacao);
router.get('/obs_med', GetpaginaObservacao);
router.get('/pagina_visualizacao', GetpaginaVisualizacao);

//Rotas para o Paciente
router.post('/criar_paciente', VerificarToken, PostCriandoPaciente);
router.get('/buscando_paciente', VerificarToken, GetPaciente);
router.get('/:id', VerificarToken, GetPacienteByID);
router.put('/atualizar_paciente/:id', VerificarToken, SetPacienteByID);
router.delete('/deletar_paciente/:id', VerificarToken, DeletePaciente);

//Rotas para Medico
router.post('/register/profissional', authRateLimit, PostRegisterMedico);
router.post('/login_profissional', authRateLimit, PostLoginMedico);

// Rotas para o Medicamentos
router.post ('/:id/criar_medicamento', VerificarToken, PostcriandoMedicacao);
router.get('/:id/buscar_medicamento', VerificarToken, GetMedicacaoByID);

// Rotas para Observações
router.post ('/:id/criar_observacao', VerificarToken, PostcriandoObservacoes);
router.get('/:id/buscar_observacao', VerificarToken, GetObservacoesByID);

// Rotas Para Procedimentos
router.post ('/:id/criar_procedimento', VerificarToken, PostcriandoProcedimentos);
router.get('/:id/buscar_procedimento', VerificarToken, GetProcedimentoByID);

//Rotas para Historico Medico
router.post('/:id/criar_historico', VerificarToken, PostcriandoHistorico);
router.get('/:id/buscar_historico', VerificarToken, GetHistoricoByID);

//Rota para Buscar o prontuario todo do paciente
router.get('/:id/buscar', VerificarToken, BuscarTodosByID);

export default router;

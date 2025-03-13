import  Express  from "express";
import { GetpaginaFormulario, GetpaginaHistorico, GetpaginaMedicacao, GetpaginaObservacao, GetpaginaVisualizacao } from "../controllers/PagPrincipalControllers";
import { PostCriandoPaciente, GetPaciente, GetPacienteByID, SetPacienteByID, DeletePaciente } from "../controllers/PacienteControllers";
import { PostcriandoHistorico, GetHistoricoByID } from "../controllers/HistoricoControllers";
import { PostcriandoMedicacao, GetMedicacaoByID } from "../controllers/MedicacaoControllers";
import { PostcriandoObservacoes, GetObservacoesByID } from "../controllers/ObservacoesControllers";
import {PostcriandoProcedimentos, GetProcedimentoByID} from "../controllers/ProcedimentoControllers";
import { BuscarTodosByID } from "../controllers/BuscarControllers";
import {PostRegisterMedico, PostLoginMedico} from "../controllers/MedicoControllers";
const router = Express.Router();

//Rotas para o Paciente
router.post('/criar_paciente', PostCriandoPaciente);
router.get('/buscando_paciente', GetPaciente);
router.get('/:id', GetPacienteByID);
router.put('/atualizar_paciente/:id', SetPacienteByID);
router.delete('/deletar_paciente/:id', DeletePaciente);

//Rotas para Medico
router.post('/register_profissional', PostRegisterMedico);
router.post('/login_profissional', PostLoginMedico)

// Rotas para o Medicamentos
router.post ('/:id/criar_medicamento', PostcriandoMedicacao);
router.get('/:id/buscar_medicamento', GetMedicacaoByID);

// Rotas para Observações
router.post ('/:id/criar_observacao', PostcriandoObservacoes);
router.get('/:id/buscar_observacao', GetObservacoesByID);

// Rotas Para Procedimentos
router.post ('/:id/criar_procedimento', PostcriandoProcedimentos);
router.get('/:id/buscar_procedimento', GetProcedimentoByID);

//Rotas para Historico Medico
router.post('/:id/criar_historico', PostcriandoHistorico);
router.get('/:id/buscar_historico', GetHistoricoByID);

//Rota para Buscar o prontuario todo do paciente
router.get('/:id/buscar', BuscarTodosByID);


// rotas das paginas dos formularios
router.get('/info_pessoais_paciente', GetpaginaFormulario);
router.get('/hist_medico', GetpaginaHistorico);
router.get('/medicacao', GetpaginaMedicacao);
router.get('/obs_med', GetpaginaObservacao);
router.get('/pagina_visualizacao', GetpaginaVisualizacao);

export default router;
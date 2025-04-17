import { citaDataLoader } from "./cita/dataLoaders";
import { consultaDataLoader } from "./consulta/dataLoaders";
import { historialMedicoDataLoader } from "./historialmedico/dataLoaders";
import { medicoDataLoader } from "./medico/dataLoaders";
import { pacienteDataLoader } from "./paciente/dataLoaders";
import { sessionDataLoader } from "./session/dataLoaders";
import { usuarioDataLoader } from "./usuario/dataLoaders";

const dataLoadersArray = [
	citaDataLoader,
    consultaDataLoader,
    historialMedicoDataLoader,
    medicoDataLoader,
    pacienteDataLoader,
    sessionDataLoader,
    usuarioDataLoader,
];
export default dataLoadersArray;

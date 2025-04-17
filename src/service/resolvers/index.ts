// Import types
import { citaType } from "./cita/types";
import { consultaType } from "./consulta/types";
import { historialmedicoType } from "./historialmedico/types";
import { medicoType } from "./medico/types";
import { pacienteType } from "./paciente/types";
import { sessionType } from "./session/types";
import { usuarioType } from "./usuario/types";

// Import resolvers
import { citaResolvers } from "./cita/resolvers";
import { consultaResolvers } from "./consulta/resolvers";
import { historialMedicoResolvers } from "./historialmedico/resolvers";
import { medicoResolvers } from "./medico/resolvers";
import { pacienteResolvers } from "./paciente/resolvers";
import { sessionResolvers } from "./session/resolvers";
import { usuarioResolvers } from "./usuario/resolvers";

export {
  citaType,
  consultaType,
  historialmedicoType,
  medicoType,
  pacienteType,
  sessionType,
  usuarioType,
  
  citaResolvers,
  consultaResolvers,
  historialMedicoResolvers,
  medicoResolvers,
  pacienteResolvers,
  sessionResolvers,
  usuarioResolvers,
};

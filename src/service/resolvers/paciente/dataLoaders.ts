import { default as DataLoader } from 'dataloader';
import {
  PrismaClient,
  Consulta,
  Cita,
  HistorialMedico,
  Usuario,
} from '@prisma/client';

//many to one

const consultasLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Consulta[] | undefined)[]> => {
    const consultas = await db.consulta.findMany({
      where: {
        paciente: {
          is: {
            id: { in: [...ids] },
          },
        },
      },
    });
    return ids.map((id) => {
      return consultas.filter((i) => i.pacienteId == id);
    });
  };
//many to one

const citasLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Cita[] | undefined)[]> => {
    const citas = await db.cita.findMany({
      where: {
        paciente: {
          is: {
            id: { in: [...ids] },
          },
        },
      },
    });
    return ids.map((id) => {
      return citas.filter((i) => i.pacienteId == id);
    });
  };
//one to one
const historialMedicoLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(HistorialMedico | undefined)[]> => {
    const historialMedico = await db.historialMedico.findMany({
      where: {
        pacienteId: { in: [...ids] },
      },
    });
    return ids.map((id) => {
      return historialMedico.find(
        (historialMedico) => historialMedico.id == id
      );
    });
  };
//one to one
const usuarioLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Usuario | undefined)[]> => {
    const usuario = await db.usuario.findMany({
      where: {
        pacienteId: { in: [...ids] },
      },
    });
    return ids.map((id) => {
      return usuario.find((usuario) => usuario.id == id);
    });
  };

const pacienteDataLoader = (db: PrismaClient) => ({
  consultasLoader: new DataLoader<string, Consulta[] | undefined>(
    consultasLoader(db)
  ),
  citasLoader: new DataLoader<string, Cita[] | undefined>(citasLoader(db)),
  historialMedicoLoader: new DataLoader<string, HistorialMedico | undefined>(
    historialMedicoLoader(db)
  ),
  usuarioLoader: new DataLoader<string, Usuario | undefined>(usuarioLoader(db)),
});
export { pacienteDataLoader };

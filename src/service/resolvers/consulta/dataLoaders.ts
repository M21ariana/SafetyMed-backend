import { default as DataLoader } from 'dataloader';
import {
  PrismaClient,
  Paciente,
  Medico,
  HistorialMedico,
} from '@prisma/client';

//one to many
const pacienteLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Paciente | undefined)[]> => {
    const paciente = await db.paciente.findMany({
      where: {
        id: { in: [...ids] },
      },
    });
    return ids.map((id) => {
      return paciente.find((paciente) => paciente.id == id);
    });
  };

//one to many
const medicoLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Medico | undefined)[]> => {
    const medico = await db.medico.findMany({
      where: {
        id: { in: [...ids] },
      },
    });
    return ids.map((id) => {
      return medico.find((medico) => medico.id == id);
    });
  };

//one to many
const historialMedicoLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(HistorialMedico | undefined)[]> => {
    const historialMedico = await db.historialMedico.findMany({
      where: {
        id: { in: [...ids] },
      },
    });
    return ids.map((id) => {
      return historialMedico.find(
        (historialMedico) => historialMedico.id == id
      );
    });
  };

const consultaDataLoader = (db: PrismaClient) => ({
  pacienteLoader: new DataLoader<string, Paciente | undefined>(
    pacienteLoader(db)
  ),
  medicoLoader: new DataLoader<string, Medico | undefined>(medicoLoader(db)),
  historialMedicoLoader: new DataLoader<string, HistorialMedico | undefined>(
    historialMedicoLoader(db)
  ),
});
export { consultaDataLoader };

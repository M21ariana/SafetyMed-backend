import { default as DataLoader } from 'dataloader';
import { PrismaClient, Paciente, Medico } from '@prisma/client';

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

const citaDataLoader = (db: PrismaClient) => ({
  pacienteLoader: new DataLoader<string, Paciente | undefined>(
    pacienteLoader(db)
  ),
  medicoLoader: new DataLoader<string, Medico | undefined>(medicoLoader(db)),
});
export { citaDataLoader };

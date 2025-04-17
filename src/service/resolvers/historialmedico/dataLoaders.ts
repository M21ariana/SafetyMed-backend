import { default as DataLoader } from 'dataloader';
import { PrismaClient, Consulta, Paciente, Medico } from '@prisma/client';

//many to one

const consultasLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Consulta[] | undefined)[]> => {
    const consultas = await db.consulta.findMany({
      where: {
        historialMedico: {
          is: {
            id: { in: [...ids] },
          },
        },
      },
    });
    return ids.map((id) => {
      return consultas.filter((i) => i.historialMedicoId == id);
    });
  };
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

//many to many
const updatedByLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Medico | undefined)[]> => {
    const updatedBy = await db.medico.findMany({
      where: {
        historialesActualizados: {
          some: {
            id: { in: [...ids] },
          },
        },
      },
      include: {
        historialesActualizados: {
          select: {
            id: true,
          },
        },
      },
    });
    return ids.map((id) => {
      const list: any = [];
      updatedBy.find((updatedBy) => {
        return updatedBy.historialesActualizados.some((i) => {
          if (i.id === id) {
            list.push(updatedBy);
          }
        });
      });
      return list;
    });
  };

const historialMedicoDataLoader = (db: PrismaClient) => ({
  consultasLoader: new DataLoader<string, Consulta[] | undefined>(
    consultasLoader(db)
  ),
  pacienteLoader: new DataLoader<string, Paciente | undefined>(
    pacienteLoader(db)
  ),
  updatedByLoader: new DataLoader<string, Medico | undefined>(
    updatedByLoader(db)
  ),
});
export { historialMedicoDataLoader };

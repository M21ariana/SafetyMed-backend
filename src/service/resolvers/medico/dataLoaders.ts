import { default as DataLoader } from 'dataloader';
import { PrismaClient, Consulta, Cita, HistorialMedico } from '@prisma/client';

//many to one

const consultasLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Consulta[] | undefined)[]> => {
    const consultas = await db.consulta.findMany({
      where: {
        medico: {
          is: {
            id: { in: [...ids] },
          },
        },
      },
    });
    return ids.map((id) => {
      return consultas.filter((i) => i.medicoId == id);
    });
  };
//many to one

const citasLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Cita[] | undefined)[]> => {
    const citas = await db.cita.findMany({
      where: {
        medico: {
          is: {
            id: { in: [...ids] },
          },
        },
      },
    });
    return ids.map((id) => {
      return citas.filter((i) => i.medicoId == id);
    });
  };
//many to many
const historialesActualizadosLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(HistorialMedico | undefined)[]> => {
    const historialesActualizados = await db.historialMedico.findMany({
      where: {
        updatedBy: {
          some: {
            id: { in: [...ids] },
          },
        },
      },
      include: {
        updatedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    return ids.map((id) => {
      const list: any = [];
      historialesActualizados.find((historialesActualizados) => {
        return historialesActualizados.updatedBy.some((i) => {
          if (i.id === id) {
            list.push(historialesActualizados);
          }
        });
      });
      return list;
    });
  };

const medicoDataLoader = (db: PrismaClient) => ({
  consultasLoader: new DataLoader<string, Consulta[] | undefined>(
    consultasLoader(db)
  ),
  citasLoader: new DataLoader<string, Cita[] | undefined>(citasLoader(db)),
  historialesActualizadosLoader: new DataLoader<
    string,
    HistorialMedico | undefined
  >(historialesActualizadosLoader(db)),
});
export { medicoDataLoader };

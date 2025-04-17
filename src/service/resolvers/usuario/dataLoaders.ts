import { default as DataLoader } from 'dataloader';
import { PrismaClient, Paciente, Session } from '@prisma/client';

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

//many to one

const sessionLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Session[] | undefined)[]> => {
    const session = await db.session.findMany({
      where: {
        user: {
          is: {
            id: { in: [...ids] },
          },
        },
      },
    });
    return ids.map((id) => {
      return session.filter((i) => i.userId == id);
    });
  };

const usuarioDataLoader = (db: PrismaClient) => ({
  pacienteLoader: new DataLoader<string, Paciente | undefined>(
    pacienteLoader(db)
  ),
  sessionLoader: new DataLoader<string, Session[] | undefined>(
    sessionLoader(db)
  ),
});
export { usuarioDataLoader };

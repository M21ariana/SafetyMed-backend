import { default as DataLoader } from 'dataloader';
import { PrismaClient, Usuario } from '@prisma/client';

//one to many
const userLoader =
  (db: PrismaClient) =>
  async (ids: readonly string[]): Promise<(Usuario | undefined)[]> => {
    const user = await db.usuario.findMany({
      where: {
        id: { in: [...ids] },
      },
    });
    return ids.map((id) => {
      return user.find((user) => user.id == id);
    });
  };

const sessionDataLoader = (db: PrismaClient) => ({
  userLoader: new DataLoader<string, Usuario | undefined>(userLoader(db)),
});
export { sessionDataLoader };

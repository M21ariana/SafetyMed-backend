import { Resolver } from '../../types';
import { usuarioDataLoader } from './dataLoaders';

const usuarioResolvers: Resolver = {
  Usuario: {
    paciente: async (parent, args, { db }) => {
      if (parent.pacienteId) {
        return await usuarioDataLoader(db).pacienteLoader.load(
          parent.pacienteId
        );
      } else {
        return null;
      }
    },
    session: async (parent, args, { db }) => {
      return await usuarioDataLoader(db).sessionLoader.load(parent.id);
    },
  },
  Query: {
    usuarios: async (parent, args, { db }) => {
      return await db.usuario.findMany({});
    },
    usuario: async (parent, args, { db }) => {
      return await db.usuario.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createUsuario: async (parent, args, { db }) => {
      return await db.usuario.create({
        data: { ...args.data },
      });
    },
    updateUsuario: async (parent, args, { db }) => {
      return await db.usuario.update({
        where: {
          id: args.where.id,
        },
        data: { ...args.data },
      });
    },
    upsertUsuario: async (parent, args, { db }) => {
      return await db.usuario.upsert({
        where: {
          id: args.where.id,
        },
        create: { ...args.data },
        update: { ...args.data },
      });
    },

    deleteUsuario: async (parent, args, { db }) => {
      return await db.usuario.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};
export { usuarioResolvers };

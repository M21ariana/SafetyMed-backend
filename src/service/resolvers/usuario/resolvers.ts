import { Resolver } from '../../types';
import { usuarioDataLoader } from './dataLoaders';
import { getWhereInUsuarios } from './transformations';

const usuarioResolvers: Resolver = {
  Usuario: {
    paciente: async (parent, args, { db }) => {
      return await usuarioDataLoader(db).pacienteLoader.load(parent.id);
    },
    sessions: async (parent, args, { db }) => {
      return await usuarioDataLoader(db).sessionLoader.load(parent.id);
    },
  },
  Query: {
    usuarios: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInUsuarios(args.where, args.search);
        const data = await db.usuario.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.usuario.count({
          where,
        });
        const response = {
          data,
          count,
          status,
        };
        return response;
      } catch (error) {
        status = 500;
        const response = {
          data: null,
          count: 0,
          status,
          error,
        };
        return response;
      }
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
        data: { 
          ...args.data,
          ...(args.data.createdAt && {
            createdAt: new Date(args.data.createdAt).toISOString(),
          }),
          ...(args.data.updatedAt && {
            updatedAt: new Date(args.data.updatedAt).toISOString(),
          }),
        },
      });
    },
    updateUsuario: async (parent, args, { db }) => {
      return await db.usuario.update({
        where: {
          id: args.where.id,
        },
        data: { 
          ...args.data,
          ...(args.data.createdAt && {
            createdAt: new Date(args.data.createdAt).toISOString(),
          }),
          ...(args.data.updatedAt && {
            updatedAt: new Date(args.data.updatedAt).toISOString(),
          }),
        },
      });
    },
    upsertUsuario: async (parent, args, { db }) => {
      return await db.usuario.upsert({
        where: {
          id: args.where.id,
        },
        create: { 
          ...args.data,
          ...(args.data.createdAt && {
            createdAt: new Date(args.data.createdAt).toISOString(),
          }),
          ...(args.data.updatedAt && {
            updatedAt: new Date(args.data.updatedAt).toISOString(),
          }),
        },
        update: { 
          ...args.data,
          ...(args.data.createdAt && {
            createdAt: new Date(args.data.createdAt).toISOString(),
          }),
          ...(args.data.updatedAt && {
            updatedAt: new Date(args.data.updatedAt).toISOString(),
          }),
        },
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

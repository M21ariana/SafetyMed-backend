import { Resolver } from '../../types';
import { historialMedicoDataLoader } from './dataLoaders';
import { getWhereInHistorialMedico } from './transformations';

const historialMedicoResolvers: Resolver = {
  HistorialMedico: {
    consultas: async (parent, args, { db }) => {
      return await historialMedicoDataLoader(db).consultasLoader.load(
        parent.id
      );
    },
    paciente: async (parent, args, { db }) => {
      return await historialMedicoDataLoader(db).pacienteLoader.load(
        parent.pacienteId
      );
    },
    updatedBy: async (parent, args, { db }) => {
      return await historialMedicoDataLoader(db).updatedByLoader.load(
        parent.id
      );
    },
  },
  Query: {
    historialMedicos: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInHistorialMedico(args.where, args.search);
        const data = await db.historialMedico.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.historialMedico.count({
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
    historialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createHistorialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.create({
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
    updateHistorialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.update({
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
    upsertHistorialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.upsert({
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
    deleteHistorialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};
export { historialMedicoResolvers };

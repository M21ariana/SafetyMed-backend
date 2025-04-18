import { Resolver } from '../../types';
import { medicoDataLoader } from './dataLoaders';
import { getWhereInMedicos } from './transformations';

const medicoResolvers: Resolver = {
  Medico: {
    consultas: async (parent, args, { db }) => {
      return await medicoDataLoader(db).consultasLoader.load(parent.id);
    },
    citas: async (parent, args, { db }) => {
      return await medicoDataLoader(db).citasLoader.load(parent.id);
    },
    historialesActualizados: async (parent, args, { db }) => {
      return await medicoDataLoader(db).historialesActualizadosLoader.load(
        parent.id
      );
    },
  },
  Query: {
    medicos: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInMedicos(args.where, args.search);
        const data = await db.medico.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.medico.count({
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
    medico: async (parent, args, { db }) => {
      return await db.medico.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createMedico: async (parent, args, { db }) => {
      return await db.medico.create({
        data: {
          ...args.data,
          ...(args.data.fechaNacimiento && {
            fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
          }),
        },
      });
    },
    updateMedico: async (parent, args, { db }) => {
      return await db.medico.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
          ...(args.data.fechaNacimiento && {
            fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
          }),
        },
      });
    },
    upsertMedico: async (parent, args, { db }) => {
      return await db.medico.upsert({
        where: {
          id: args.where.id,
        },
        create: {
          ...args.data,
          ...(args.data.fechaNacimiento && {
            fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
          }),
        },
        update: {
          ...args.data,
          ...(args.data.fechaNacimiento && {
            fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
          }),
        },
      });
    },
    deleteMedico: async (parent, args, { db }) => {
      return await db.medico.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};
export { medicoResolvers };

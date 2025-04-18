import { Resolver } from '../../types';
import { citaDataLoader } from './dataLoaders';
import { getWhereInCitas } from './transformations';

const citaResolvers: Resolver = {
  Cita: {
    paciente: async (parent, args, { db }) => {
      return await citaDataLoader(db).pacienteLoader.load(parent.pacienteId);
    },
    medico: async (parent, args, { db }) => {
      return await citaDataLoader(db).medicoLoader.load(parent.medicoId);
    },
  },
  Query: {
    citas: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInCitas(args.where, args.search);
        const data = await db.cita.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.cita.count({
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
    cita: async (parent, args, { db }) => {
      return await db.cita.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createCita: async (parent, args, { db }) => {
      return await db.cita.create({
        data: {
          ...args.data,
          ...(args.data.fecha && {
            fecha: new Date(args.data.fecha).toISOString(),
          }),
          ...(args.data.hora && {
            hora: new Date(args.data.hora).toISOString(),
          }),
        },
      });
    },
    updateCita: async (parent, args, { db }) => {
      return await db.cita.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
          ...(args.data.fecha && {
            fecha: new Date(args.data.fecha).toISOString(),
          }),
          ...(args.data.hora && {
            hora: new Date(args.data.hora).toISOString(),
          }),
        },
      });
    },
    upsertCita: async (parent, args, { db }) => {
      return await db.cita.upsert({
        where: {
          id: args.where.id,
        },
        create: {
          ...args.data,
          ...(args.data.fecha && {
            fecha: new Date(args.data.fecha).toISOString(),
          }),
          ...(args.data.hora && {
            hora: new Date(args.data.hora).toISOString(),
          }),
        },
        update: {
          ...args.data,
          ...(args.data.fecha && {
            fecha: new Date(args.data.fecha).toISOString(),
          }),
          ...(args.data.hora && {
            hora: new Date(args.data.hora).toISOString(),
          }),
        },
      });
    },
    deleteCita: async (parent, args, { db }) => {
      return await db.cita.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};
export { citaResolvers };

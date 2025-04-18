import { Resolver } from '../../types';
import { consultaDataLoader } from './dataLoaders';
import { getWhereInConsultas } from './transformations';

const consultaResolvers: Resolver = {
  Consulta: {
    paciente: async (parent, args, { db }) => {
      return await consultaDataLoader(db).pacienteLoader.load(
        parent.pacienteId
      );
    },
    medico: async (parent, args, { db }) => {
      return await consultaDataLoader(db).medicoLoader.load(parent.medicoId);
    },
    historialMedico: async (parent, args, { db }) => {
      return await consultaDataLoader(db).historialMedicoLoader.load(
        parent.historialMedicoId
      );
    },
  },
  Query: {
    consultas: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInConsultas(args.where, args.search);
        const data = await db.consulta.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.consulta.count({
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
    consulta: async (parent, args, { db }) => {
      return await db.consulta.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createConsulta: async (parent, args, { db }) => {
      return await db.consulta.create({
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
    updateConsulta: async (parent, args, { db }) => {
      return await db.consulta.update({
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
    upsertConsulta: async (parent, args, { db }) => {
      return await db.consulta.upsert({
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
    deleteConsulta: async (parent, args, { db }) => {
      return await db.consulta.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};
export { consultaResolvers };

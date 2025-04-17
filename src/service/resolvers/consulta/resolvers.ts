import { Resolver } from '../../types';
import { consultaDataLoader } from './dataLoaders';

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
      return await db.consulta.findMany({});
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
          fecha: new Date(args.data.fecha).toISOString(),
          hora: new Date(args.data.hora).toISOString(),
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
          fecha: new Date(args.data.fecha).toISOString(),
          hora: new Date(args.data.hora).toISOString(),
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

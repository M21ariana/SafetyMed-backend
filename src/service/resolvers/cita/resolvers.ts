import { Resolver } from '../../types';
import { citaDataLoader } from './dataLoaders';

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
      return await db.cita.findMany({});
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
          fecha: new Date(args.data.fecha).toISOString(),
          hora: new Date(args.data.hora).toISOString(),
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

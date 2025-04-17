import { Resolver } from '../../types';
import { historialMedicoDataLoader } from './dataLoaders';

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
      return await db.historialMedico.findMany({});
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
        data: { ...args.data },
      });
    },
    updateHistorialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.update({
        where: {
          id: args.where.id,
        },
        data: { ...args.data },
      });
    },
    upsertHistorialMedico: async (parent, args, { db }) => {
      return await db.historialMedico.upsert({
        where: {
          id: args.where.id,
        },
        create: { ...args.data },
        update: { ...args.data },
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

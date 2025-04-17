import { Resolver } from '../../types';
import { medicoDataLoader } from './dataLoaders';

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
      return await db.medico.findMany({});
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
          fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
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
          fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
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

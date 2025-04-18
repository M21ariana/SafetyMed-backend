import { Resolver } from '../../types';
import { pacienteDataLoader } from './dataLoaders'
import { getWhereInPacientes } from './transformations';

const pacienteResolvers: Resolver = {
  Paciente: {
    consultas: async (parent, args, { db }) => {
      return await pacienteDataLoader(db).consultasLoader.load(parent.id);
    },
    citas: async (parent, args, { db }) => {
      return await pacienteDataLoader(db).citasLoader.load(parent.id);
    },
    historialMedico: async (parent, args, { db }) => {
      return await pacienteDataLoader(db).historialMedicoLoader.load(parent.id);
    },
    usuario: async (parent, args, { db }) => {
      return await pacienteDataLoader(db).usuarioLoader.load(parent.id);
    }
  },
  Query: {
    pacientes: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInPacientes(args.where, args.search);
        const data = await db.paciente.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.paciente.count({
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
    paciente: async (parent, args, { db }) => {
      return await db.paciente.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation:{
    createPaciente: async (parent, args, { db }) => {
      return await db.paciente.create({
        data: {
          ...args.data,
          ...(args.data.fechaNacimiento && {
            fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
          }),
        }
      });
    },
    updatePaciente: async (parent, args, { db }) => {
      return await db.paciente.update({
        where: {
          id: args.where.id
        },
        data: {
          ...args.data,
          ...(args.data.fechaNacimiento && {
            fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString(),
          }),
        }
      });
    },
    upsertPaciente: async (parent, args, { db }) => {
      return await db.paciente.upsert({
        where: {
          id: args.where.id
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
        }
      });
    },
    deletePaciente: async (parent, args, { db }) => {
      return await db.paciente.delete({
        where: {
          id: args.where.id
        }
      });
    },
  }
}
export { pacienteResolvers };

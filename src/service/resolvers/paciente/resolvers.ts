
  import { Resolver } from '../../types';
  import { pacienteDataLoader } from './dataLoaders'
  
    const pacienteResolvers: Resolver = {
    Paciente: {
        
                consultas: async (parent, args, { db }) => {
                return await pacienteDataLoader(db).consultasLoader.load(parent.id);
                },
                citas: async (parent, args, { db }) => {
                return await pacienteDataLoader(db).citasLoader.load(parent.id);
                },historialMedico: async (parent, args, { db }) => {
                  return await pacienteDataLoader(db).historialMedicoLoader.load(parent.[object Object]);
                },usuario: async (parent, args, { db }) => {
                  return await pacienteDataLoader(db).usuarioLoader.load(parent.[object Object]);
                }
    },
    Query: {
        pacientes: async (parent, args, { db }) => {
        return await db.paciente.findMany({});
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
      createPaciente:async (parent, args, { db })=>{
        return await db.paciente.create({
          data:{...args.data, fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString() }
        })
      },
      updatePaciente:async (parent, args, { db })=>{
        return await db.paciente.update({
          where:{
            id:args.where.id
          },
          data:{...args.data, ...(args.data.fechaNacimiento && {fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString()})}
        })
      },
      upsertPaciente:async (parent, args, { db })=>{
        return await db.paciente.upsert({
          where:{
            id:args.where.id
          },
          create:{...args.data, fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString()
          },
          update: {...args.data, ...(args.data.fechaNacimiento && {fechaNacimiento: new Date(args.data.fechaNacimiento).toISOString()})
          }    
        })
      },
    
      deletePaciente:async (parent, args, { db })=>{
        return await db.paciente.delete({
          where:{
            id:args.where.id
          }
        })
      },
    }
    }
    export { pacienteResolvers };
    
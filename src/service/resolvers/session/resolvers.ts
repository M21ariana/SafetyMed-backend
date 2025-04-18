import { Resolver } from '../../types';
import { sessionDataLoader } from './dataLoaders';
import { getWhereInSessions } from './transformations';

const sessionResolvers: Resolver = {
  Session: {
    user: async (parent, args, { db }) => {
      return await sessionDataLoader(db).userLoader.load(parent.userId);
    },
  },
  Query: {
    sessions: async (parent, args, { db }) => {
      let status = 200;
      try {
        const where = getWhereInSessions(args.where, args.search);
        const data = await db.session.findMany({
          where,
          ...(args?.take ? { take: args.take } : {}),
          ...(args?.skip ? { skip: args.skip } : {}),
          orderBy: args.orderBy,
        });
        const count = await db.session.count({
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
    session: async (parent, args, { db }) => {
      return await db.session.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createSession: async (parent, args, { db }) => {
      return await db.session.create({
        data: {
          ...args.data,
          ...(args.data.expires && {
            expires: new Date(args.data.expires).toISOString(),
          }),
        },
      });
    },
    updateSession: async (parent, args, { db }) => {
      return await db.session.update({
        where: {
          id: args.where.id,
        },
        data: {
          ...args.data,
          ...(args.data.expires && {
            expires: new Date(args.data.expires).toISOString(),
          }),
        },
      });
    },
    upsertSession: async (parent, args, { db }) => {
      return await db.session.upsert({
        where: {
          id: args.where.id,
        },
        create: {
          ...args.data,
          ...(args.data.expires && {
            expires: new Date(args.data.expires).toISOString(),
          }),
        },
        update: {
          ...args.data,
          ...(args.data.expires && {
            expires: new Date(args.data.expires).toISOString(),
          }),
        },
      });
    },
    deleteSession: async (parent, args, { db }) => {
      return await db.session.delete({
        where: {
          id: args.where.id,
        },
      });
    },
  },
};
export { sessionResolvers };

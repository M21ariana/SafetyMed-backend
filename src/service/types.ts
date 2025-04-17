import { PrismaClient } from '@prisma/client';

type db = PrismaClient;

interface Context {
  db: db;
  token: string;
  origin: string | undefined;
  ip?: string;
  user?: {
    id: string;
  };
}

interface ResolverFunction {
  [key: string]: (parent: any, args: any, context:Context) => Promise<any>;
}

interface Resolver {
  Query: ResolverFunction;
  Mutation: ResolverFunction;
  [key: string]: ResolverFunction;
}

export { Resolver, db, Context };




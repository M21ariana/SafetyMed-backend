import { PrismaClient } from '@prisma/client';

let db: PrismaClient | null = null;

export const getDB = async () => {
  if (db) return db;

  const url = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=SafetyMed`;
  
  db = new PrismaClient({ datasources: { db: { url } } });
  return db;
};

export default db;

import { defineConfig } from 'prisma/config';
import { createDatabaseUrl } from './src/db/database-url';

const databaseUrl = process.env.DATABASE_URL || (process.env.PGHOST
  ? createDatabaseUrl()
  : 'postgresql://postgres:postgres@localhost:5432/controllabs?schema=public');

export default defineConfig({ schema: 'prisma/schema.prisma', datasource: { url: databaseUrl } });

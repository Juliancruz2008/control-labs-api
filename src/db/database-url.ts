import 'dotenv/config';

const required = ['PGHOST', 'PGPORT', 'PGDATABASE', 'PGUSER', 'PGPASSWORD'] as const;
type RequiredVariable = (typeof required)[number];
const getRequired = (name: RequiredVariable): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable ${name} en .env.`);
  return value;
};

export const createDatabaseUrl = (): string => {
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Faltan variables de PostgreSQL: ${missing.join(', ')}`);
  const port = Number(process.env.PGPORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PGPORT debe ser un puerto válido.');
  const url = new URL('postgresql://localhost');
  url.hostname = getRequired('PGHOST');
  url.port = String(port);
  url.username = getRequired('PGUSER');
  url.password = getRequired('PGPASSWORD');
  url.pathname = `/${encodeURIComponent(getRequired('PGDATABASE'))}`;
  url.searchParams.set('schema', process.env.PGSCHEMA || 'public');
  if (process.env.PGSSLMODE) url.searchParams.set('sslmode', process.env.PGSSLMODE);
  process.env.DATABASE_URL = url.toString();
  return url.toString();
};

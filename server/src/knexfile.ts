import { config } from './config';
import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const database = {
  test: {
    client: 'postgres',
    connection: config.database.url,
    charset: 'utf8',
    migrations: {
      extension: 'ts',
      directory: 'database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'seeds',
      tableName: 'seeds',
    },
  },
  development: {
    client: 'postgres',
    connection: config.database.url,
    migrations: {
      extension: 'ts',
      directory: 'database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'database/seeds',
      tableName: 'seeds',
    },
  },
  pool: {
    min: 2,
    max: 16,
  },
  timezone: 'UTC',
  ...knexSnakeCaseMappers(),
} as Knex.Config;

export = database;

import { Global, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { config } from 'src/config';

const providers = [
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'postgres',
        connection: config.database.url,
        debug: process.env.KNEX_DEBUG === 'true',
        pool: {
          min: 2,
          max: 32,
        },
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}

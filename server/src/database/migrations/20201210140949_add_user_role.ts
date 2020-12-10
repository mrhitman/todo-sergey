import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (t) => {
    t.enum('role', ['user', 'admin', 'super-admin']).defaultTo('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (t) => {
    t.dropColumn('role');
  });
}

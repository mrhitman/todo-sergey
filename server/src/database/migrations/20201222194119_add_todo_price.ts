import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todo', (t) => {
    t.double('price');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todo', (t) => {
    t.dropColumn('price');
  });
}

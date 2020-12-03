import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todo', (t) => {
    t.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todo', (t) => {
    t.dropColumn('user_id');
  });
}

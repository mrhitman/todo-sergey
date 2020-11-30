import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('todo', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.boolean('is_done').defaultTo(false);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('todo');
}

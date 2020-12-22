import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('basket', (t) => {
    t.increments('id').primary();
    t.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
    t.integer('todo_id').references('id').inTable('todo').onDelete('CASCADE');
    t.integer('quantity').defaultTo(1);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('basket');
}

import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('refresh_token', (t) => {
    t.string('token').primary();
    t.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('refresh_token');
}

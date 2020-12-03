import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (t) => {
    t.increments('id').primary();
    t.string('first_name').notNullable();
    t.string('last_name');
    t.string('email').notNullable().unique();
    t.string('password').notNullable();
    t.enum('state', ['active', 'pending', 'banned', 'deactivated']).comment('User state');
    t.timestamp('last_login_time');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.string('id', 100).notNullable().unique();
    tbl.string('first_name', 100).notNullable();
    tbl.string('last_name', 100).notNullable();
    tbl.string('email', 100).notNullable().unique();
    tbl.string('password', 100).notNullable();
    tbl.integer('default_invest_limit').notNullable().defaultTo(1000);
    tbl.dateTime('last_login').defaultTo(knex.fn.now());
    tbl.timestamps(true, true);
    tbl.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('transactions', tbl => {
    tbl.string('id', 100).notNullable().unique();
    tbl.string('type', 50).notNullable(); //deposit | withdraw | fee | invest | distribution
    tbl.string('invest_id', 100);
    tbl.foreign('invest_id')
      .references('id')
      .inTable('investments')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('user_id', 100).notNullable();
    tbl.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.float('amount').notNullable().defaultTo(0);
    tbl.string('currency', 10).notNullable().defaultTo('CDN');
    tbl.string('comments', 200);
    tbl.timestamps(true, true);
    tbl.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('transactions');
};

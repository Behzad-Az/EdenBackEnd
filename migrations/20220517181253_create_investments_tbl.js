/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('investments', tbl => {
    tbl.string('id', 100).notNullable().unique();
    tbl.string('project_id', 100).notNullable();
    tbl.foreign('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('user_id', 100).notNullable();
    tbl.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.integer('amount').notNullable().defaultTo(0);
    tbl.string('status', 100).notNullable().defaultTo('initiated');
    tbl.timestamps(true, true);
    tbl.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('investments');
};

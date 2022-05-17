/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('properties', tbl => {
    tbl.string('id', 100).notNullable().unique();
    tbl.text('address', 240).notNullable();
    tbl.integer('asking_price').unsigned().notNullable();
    tbl.text('agent_description').notNullable().defaultTo('No agent notes could be found');
    tbl.timestamps(true, true);
    tbl.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('properties');
};

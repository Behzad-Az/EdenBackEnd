/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.string('id', 100).notNullable().unique();
    tbl.text('address', 240).notNullable();
    tbl.integer('asking_price').unsigned().notNullable();
    tbl.text('tags').notNullable().defaultTo('');
    tbl.text('agent_description').notNullable().defaultTo('No agent notes could be found');
    tbl.integer('required_funding').notNullable();
    tbl.text('reasons_to_invest').notNullable().defaultTo('TBD');
    tbl.text('status', 30).notNullable().defaultTo('active');
    tbl.timestamps(true, true);
    tbl.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};

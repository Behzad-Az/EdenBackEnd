/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('project_docs', tbl => {
    tbl.string('id', 100).notNullable().unique();
    tbl.string('project_id', 100).notNullable();
    tbl.foreign('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.string('title', 100).notNullable().defaultTo('not_found_404');
    tbl.string('download_link', 200).notNullable().defaultTo('not_found_404');
    tbl.timestamps(true, true);
    tbl.timestamp('deleted_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTableIfExists('project_docs');
};

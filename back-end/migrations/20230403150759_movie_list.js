/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('movies', table => {
        table.increments();
        table.string('title');
        table.boolean('user_added')
            .notNullable()
            .defaultTo(false)
        table.boolean('watched')
            .notNullable()
            .defaultTo(false)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies')
  
};


exports.up = function(knex) {
    return knex.schema.alterTable('Transactions', (table) => {
        table.integer('accountId')
        table.foreign('accountId').references('Accounts.id')
    })
    .then(() => {
        return knex.schema.alterTable('Accounts', (table) => {
            table.integer('userId')
            table.foreign('userId').references('Users.id')
        })
    })
    .then(() => {
        return knex.schema.alterTable('Users', (table) => {
            table.integer('userPasswordId')
            table.foreign('userPasswordId').references('Passwords.id')
        })
    })
    .then(() => {
        return knex.schema.alterTable('Passwords', (table) => {
            table.integer('userId')
            table.foreign('userId').references('Users.id')
        })
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('Passwords', (table) => {
        table.dropColumn('userId')
    })
    .then(() => {
        return knex.schema.alterTable('Users', (table) => {
            table.dropColumn('userPasswordId')
    })})
    .then(() => {
        return knex.schema.alterTable('Accounts', (table) => {
            table.dropColumn('userId')
    })})
    .then(() => {
        return knex.schema.alterTable('Transactions', (table) => {
            table.dropColumn('accountId')
    })})
}



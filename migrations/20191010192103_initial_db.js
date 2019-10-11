
exports.up = function(knex) {
    return knex.schema.createTable('Transactions', (table) => {
        table.increments('id')
        table.string('transactionName')
        table.integer('billAmount')
        table.boolean('isPaid')
        table.datetime('dueDate')
    })
    .then(() => {
        return knex.schema.createTable('Accounts', (table) => {
            table.increments('id')
            table.string('accountName')
            table.integer('accountBalance')
        })
    })
    .then(() => {
        return knex.schema.createTable('Users', (table) => {
            table.increments('id')
            table.string('userEmail')
        })
    })
    .then(() => {
        return knex.schema.createTable('Passwords', (table) => {
            table.increments('id')
            table.string('userPassword')
        })
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Transactions')
    .then(() => {
        return knex.schema.dropTable('Accounts')
    })
    .then(() => {
        return knex.schema.dropTable('Users')
    })
    .then(() => {
        return knex.schema.dropTable('Passwords')
    })
};

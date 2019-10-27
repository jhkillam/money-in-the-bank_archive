
exports.up = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments('id')
        table.string('email')
        table.unique('email')
        table.string('password')
        table.string('first_name')
        table.string('last_name')
        table.timestamp('user_creation_date')
    })
    .then(() => {
        return knex.schema.createTable('Accounts', (table) => {
            table.increments('id')
            table.string('account_name')
            table.float('account_balance')
            table.integer('user_id')
            table.foreign('user_id').references('id').inTable('Users')
        })
    })
    .then(() => {
        return knex.schema.createTable('Transactions', (table) => {
            table.increments('id')
            table.string('transaction_name')
            table.float('amount')
            table.boolean('is_paid')
            table.datetime('due_date')
            table.integer('account_id')
            table.foreign('account_id').references('id').inTable('Accounts')
        })
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('Transactions')
    .then(() => {
        return knex.schema.dropTable('Accounts')
    })
    .then(() => {
        return knex.schema.dropTable('Users')
    })
}

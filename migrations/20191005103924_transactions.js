
exports.up = function(knex) {
    return knex.schema.createTable('Transactions', (table) => {
        table.increments('id')
        table.string('transactionName')
        table.integer('billAmount')
        table.boolean('isPaid')
        table.datetime('dueDate')
    })
    .then(() => {
        return knex.schema.createTable('Account Balance', (table) => {
            table.increments('id')
            table.string('accountName')
            table.integer('accountBalance')
        })
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Transactions')
};

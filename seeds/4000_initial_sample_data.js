
exports.seed = function(knex) {
// Deletes ALL existing entries
	return knex('Transactions').del()
	.then(function () {
		// Inserts seed entries
		return knex('Transactions').insert([
			{
				transactionName: 'Rent',
				billAmount: 1500,
				isPaid: false,
				dueDate: "2019-11-01"
			},
			{
				transactionName: 'Car payment',
				billAmount: 500,
				isPaid: false,
				dueDate: "2019-11-15"
			},
			{
				transactionName: 'Electricity',
				billAmount: 150,
				isPaid: false,
				dueDate: "2019-11-28"
			}
		]);
	});
};

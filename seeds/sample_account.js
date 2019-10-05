
exports.seed = function(knex) {
	// Deletes ALL existing entries
		return knex('Account Balance').del()
		.then(function () {
			// Inserts seed entries
			return knex('Account Balance').insert([
				{
					accountName: 'Checking',
					accountBalance: 5000,
				},
				{
					accountName: 'Savings',
					accountBalance: 16320.73,
				},
			]);
		});
	};
	
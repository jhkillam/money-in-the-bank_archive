
exports.seed = function(knex) {
	// Deletes ALL existing entries
		return knex('Accounts').del()
		.then(function () {
			// Inserts seed entries
			return knex('Accounts').insert([
				{	
					accountName: 'Checking',
					accountBalance: 5000,
				},
				{
					accountName: 'Savings',
					accountBalance: 16320,
				},
			]);
		});
	};
	
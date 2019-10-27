
exports.seed = function(knex) {
	return knex('Users').pluck('id')
	.then((userIds) => {
		return knex('Accounts').insert([
			{	
				account_name: 'Checking',
				account_balance: 5000.34,
				user_id: userIds[0]
			},
			{
				account_name: 'Savings',
				account_balance: 16320.55,
				user_id: userIds[0]
			},
			{
			account_name: 'Checking',
			account_balance: 3341,
			user_id: userIds[1]
			},
			{
			account_name: 'Savings',
			account_balance: 12876,
			user_id: userIds[1]
			}
		])
	})
}

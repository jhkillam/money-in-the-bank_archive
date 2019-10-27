
exports.seed = function(knex) {
	return knex('Accounts').pluck('id')
	.then((accountIds) => {
		return knex('Transactions').insert([
			{
				transaction_name: 'Rent',
				amount: -1500.33,
				is_paid: false,
        due_date: "2019-11-01",
        account_id: accountIds[0]
			},
			{
				transaction_name: 'Car payment',
				amount: -500,
				is_paid: false,
        due_date: "2019-11-15",
        account_id: accountIds[0]
			},
			{
				transaction_name: 'Electricity',
				amount: -150.47,
				is_paid: false,
				due_date: "2019-11-27",
        account_id: accountIds[0]
      },
      {
        transaction_name: 'Savings Transfer',
				amount: -200,
				is_paid: false,
				due_date: "2019-11-28",
        account_id: accountIds[0]
      },
      {
        transaction_name: 'Savings Transfer',
				amount: 200,
				is_paid: false,
				due_date: "2019-11-28",
        account_id: accountIds[1]
      },
      {
				transaction_name: 'Rent',
				amount: -1500.33,
				is_paid: false,
        due_date: "2019-11-01",
        account_id: accountIds[2]
			},
			{
				transaction_name: 'Car payment',
				amount: -500,
				is_paid: false,
        due_date: "2019-11-15",
        account_id: accountIds[2]
			},
			{
				transaction_name: 'Electricity',
				amount: -150.47,
				is_paid: false,
				due_date: "2019-11-27",
        account_id: accountIds[2]
      },
      {
        transaction_name: 'Savings Transfer',
				amount: -200,
				is_paid: false,
				due_date: "2019-11-28",
        account_id: accountIds[2]
      },
      {
        transaction_name: 'Savings Transfer',
				amount: 200,
				is_paid: false,
				due_date: "2019-11-28",
        account_id: accountIds[3]
      }
		])
	})
}

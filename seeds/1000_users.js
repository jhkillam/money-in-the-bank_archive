
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Transactions').del()
    .then(() => {
      return knex('Accounts').del()
    })
    .then(() => {
      return knex('Users').del()
    })
    .then(() => {
      // Inserts seed entries
      return knex('Users').insert([
        {
          email: 'jhkillam@gmail.com',
          password: 'password',
          first_name: 'Joey',
          last_name: 'Killam'
        },
        {
          email: 'killamallstudios@gmail.com',
          password: 'password',
          first_name: 'Joey',
          last_name: 'Killam'
        }
      ]);
    });
};

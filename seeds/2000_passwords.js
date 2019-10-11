
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Passwords').del()
    .then(function () {
      // Inserts seed entries
      return knex('Passwords').insert([
        {
          id: 1000,
          userPassword: 'banana1'
        },
        {
          id: 1001,
          userPassword: 'banana2'
        }
      ]);
    });
};

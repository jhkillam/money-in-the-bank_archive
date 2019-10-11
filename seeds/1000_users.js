
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {
          id: 1000,
          userEmail: 'jhkillam@gmail.com'
        },
        {
          id: 1001,
          userEmail: 'killamallstudios@gmail.com'
        }
      ]);
    });
};

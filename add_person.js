const knex = require('knex')({
  client: 'pg',
  connection: {
    host: "localhost",
    user: "development",
    password: "development",
    database: 'test_db',
    port: 5432,
    ssl: true
  },
  pool: { min: 0, max: 7 }
})

knex('famous_people')
  .insert([
    { first_name:process.argv[2]},
    { last_name:process.argv[3]},
    { birthdate:process.argv[4]}
  ])
.catch(err=>{
  Promise.resolve();
})
.finally(res=>{
  knex.destroy();
})

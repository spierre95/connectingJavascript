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


function PrintFamousPeople(arr){
  arr.forEach(function(element,index){
    let firstname = element.first_name;
    let lastname = element.last_name;
    let born = element.birthdate.toISOString().slice(0,10);

    console.log(`${index + 1} ${firstname} ${lastname}, born ${born}`)
  });
}


knex('famous_people')
.select()
.where('first_name', '=', process.argv[2])
.from('famous_people')
.then(result=>{
  PrintFamousPeople(result)
})
.catch(err=>{
  Promise.resolve();
})
.finally(res=>{
  knex.destroy();
})




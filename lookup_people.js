const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function PrintFamousPeople(arr){
  arr.forEach(function(element,index){
    let firstname = element.first_name;
    let lastname = element.last_name;
    let born = element.birthdate.toISOString().slice(0,10);

    console.log(`${index + 1} ${firstname} ${lastname}, born ${born}`)
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1 ",[process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name of ${[process.argv[2]]}:`)
    PrintFamousPeople(result.rows);

    client.end();
  });
});








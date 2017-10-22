const {Client} = require('pg') ;
//datos de la base 
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sigsid',
  password: 'ache',
  port: 5432,
}) ;
client.connect() ;


exports.client = client
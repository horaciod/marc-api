const {Client} = require('pg') ;
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sigsid',
  password: 'ache',
  port: 5435,
}) ;
client.connect() ;


exports.client = client
const knex=require('knex');
const db=knex(
  {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'twitter'
  }
});
module.exports = db;

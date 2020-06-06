var express = require('express');
var router = express.Router();
const knex=require('knex');
const db=knex(
  {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '3012',
      database : 'postgres'
  }
});
db.select('tweet').from('twitter.tweets').where(`username=${}`)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

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
let tweet=``;

console.log(tweet);
/* GET home page. */
router.get('/', function(req, res, next) {
  db.select('tweet').from('twitter.tweets').then(data=>res.send(data));
  //res.render('index', { title: 'Express' });
  
});

module.exports = router;

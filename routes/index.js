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



/* GET home page. */
router.get('/', function(req, res, next) {
  let tweet=``;
  db.select('tweet').from('twitter.tweets').then(data=> data.forEach(index => {
    tweet +=index.tweet;
  }
  ));
  
  //res.render('index', { title: 'Express' });
  res.send(tweet);
});

module.exports = router;

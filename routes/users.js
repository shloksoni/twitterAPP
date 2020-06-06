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

/* GET users listing. */

router.get('/', function(req, res, next) {
  const quer=req.query.name;
  db.withSchema('twitter').select('tweet').from('tweets').where(`username`,`${quer}`).then(data=>data.map(index=>
    {
          return res.send(res.send(index.tweet)); 
    }))
  //db.select('tweet').from('.').where(`tweets.username,${req.query.name}`).then(data=>console.log(data)).catch(err=>console.log(err));
  
});

module.exports = router;

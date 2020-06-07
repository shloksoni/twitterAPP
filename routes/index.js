var express = require('express');
var router = express.Router();
const db = require('../services/database');



/* GET home page. */
router.get('/', function(req, res, next) {
  let tweet=``;
  db.select('tweet').from('tweets').then(data=> data.forEach(index => {
    tweet +=index.tweet;
  }
  ));
  
  //res.render('index', { title: 'Express' });
  res.send(tweet);
});

module.exports = router;

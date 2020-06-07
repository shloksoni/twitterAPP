var express = require('express');
var router = express.Router();
const db = require('../services/database');


/* GET users listing. */

router.get('/', function(req, res, next) {
  const quer=req.query.name;
  db.select('tweet').from('tweets').where(`username`,`${quer}`).then(data=>res.send(data));
  
});

module.exports = router;

var express = require('express');
var router = express.Router();
const db = require('../services/database');



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user)
      res.redirect('/feed');
  else res.send("login first");
});

module.exports = router;

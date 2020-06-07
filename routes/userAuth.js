
var express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log(req.user);
    res.redirect('/');
  });

  router.get('/current_user', (req,res)=>{
    res.send(req.user);
  })


  module.exports = router;





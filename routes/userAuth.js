
var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../services/database');


router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
  
    res.redirect('/');
  });

  router.post('/createUsername', (req,res) =>{
    username = req.body.username;
    db('users').where({profileid : req.user.profileid}).update({username : username})
    .returning('*')
    .then(respsonse => res.send(respsonse))
    .catch(err=> res.send("error"));
  })
  router.post('/checkUsername', (req,res) =>{
    username = req.body.username;
    db('users').select('*').where({username : username})
    .returning('*')
    .then(respsonse => {
      if(respsonse.length === 0)res.send(true);
      else res.send(false);
    })
    .catch(err=> res.send("error"));
  })

  router.get('/current_user', (req,res)=>{
    

    if(req.user){
      res.send({Exist: true, ...req.user});
    }
    else{
      res.send({Exist: false});
    }
    
  })

 
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


  module.exports = router;





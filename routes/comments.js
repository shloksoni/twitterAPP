var express = require('express');
var router = express.Router();

const db = require('../services/database');


    router.post('/postComment', (req,res,next) =>{

        db('comments').insert({username : req.user.username, ...req.body})
        .returning(['comment_text','username'])
        .then(data => res.send(data[0]))
        .catch(err => console.log(err));
    })
    router.post('/getComments', (req,res,next) =>{
      const {tweet_id} = req.body;
        db('comments')
        .select('username','comment_text')
        .where({tweet_id : tweet_id })
        .then(data => res.send(data));
     })

 

  
  module.exports = router;

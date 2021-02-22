var express = require('express');
var router = express.Router();

const db = require('../services/database');

router.get('/feed', function(req, res, next) {
    
    if(req.user)
    {
        console.log(req.user.username);
        db.select('*').from('tweets').orderBy('tweet_id', 'desc')
        .then(tweets=>{
            db.select('*').from('likes').where({profileid : req.user.profileid})
            .then(likes => {
                
                res.send({tweets: tweets, likes : likes});
            });

            
        });
    }
        
    else res.send({college: null});
});

  router.post('/postTweet', (req,res,next) =>{
    db('tweets').insert({tweet : req.body.tweet , username : req.body.username})
    .returning('*')
    .then(data => res.send(data[0]))
    .catch(err => console.log(err));
  })

  router.post('/likeTweet', (req,res,next)=>{
    db('likes').insert({profileid : req.user.profileid , tweet_id : req.body.tweet_id })
    .returning('*')
    .then(data =>{
        db('tweets')
        .where({tweet_id : req.body.tweet_id})
        .increment({likes : 1})
        .then(data=> res.send("success"))
        .catch(err=>res.send("error"));
    })
    .catch(err => res.send("error"));
  })
  router.post('/dislikeTweet', (req,res,next)=>{
    db('likes')
    .where({ profileid : req.user.profileid, tweet_id : req.body.tweet_id })
    .del()
    .returning('*')
    .then(data => {
        db('tweets')
        .where({tweet_id : req.body.tweet_id})
        .decrement({likes : 1})
        .then(data=> res.send("success"))
        .catch(err=>res.send("error"));
    })
    .catch(err => {
      
        res.send("error")});
  })

  
  module.exports = router;

var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../services/database');


router.get('/getUser/', function(req, res, next) {
        username = req.query.username;

        db.select('*').from('profiles').where(`username`,`${username}`).then(data=>res.send(data));

  });


  router.post('/createProfile/', (req,res)=>{

    const {username, fname, sname, skills} = req.body;

    // res.send(skills);
    // console.log({username : username , fname : fName, sName : sname, skills : skills});
    db('profiles').insert({username : username , fname : fname, sname : sname, skills : skills})
    .returning('*')
    .then(data => res.send(data[0]))
    .catch(err => console.log(err));    

    


  });


  //insert into "profiles" ("fName", "sName", "skills", "username") values ($1, $2, $3, $4)



module.exports = router;
const db = require('../services/database');
const passport = require('passport');
const keys = require('../keys/googleAPI');



var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done)=>{
  done(null, user.profileid);
})
passport.deserializeUser((profileid,done)=>{
  db('users').select('*').where({profileid : `${profileid}`})
  .then(users =>{
    done(null,users[0]);
  })
})
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecret,
    callbackURL: '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    db('users').select('*').where({profileid : `${profile.id}`})
    .then(data => {
      if(data.length === 0){
        db('users').insert({profileid : `${profile.id}`, name : `${profile.displayName}`, email: `${profile.emails[0].value}`})
        .returning('*')
        .then(result =>  done(null,result[0]));
      }
      else{
         done(null,data[0]);
      }
    });

  }
));
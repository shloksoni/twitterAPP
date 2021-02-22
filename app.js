var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/userAuth');
var tweetsRouter = require('./routes/tweets');
var commentsRouter = require('./routes/comments');
var profilesRouter = require('./routes/profiles');


var bodyParser = require('body-parser');


const cors = require('cors');


require('./services/passport');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(bodyParser.urlencoded( {extended :true} ))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(cookieSession({
  maxAge : 30*24*60*60*1000,
  keys: ['nsduviwqh08hvqbuibv873bsdbvuqb76']
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/tweet', tweetsRouter);
app.use('/comments',commentsRouter);
app.use('/profiles',profilesRouter);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

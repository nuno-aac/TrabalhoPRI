var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { v4: uuidv4 } = require('uuid');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/PRI2020-TP';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});



var User = require("./controllers/user")

passport.use(new LocalStrategy(
  { usernameField: 'id' }, function (id, password, done) {
    User.lookUp(id) // DAR LOOK UP APENAS DE INFO NECESSARIA PORQUE SENAO É MUITO PESADO, MUDAR CONTROLLER
      .then(dados => {
        const user = dados
        if (!user) { return done(null, false, { message: 'Utilizador Inexistente\n' }) }
        if (password != user.password) { return done(null, false, { message: 'Credenciais Inválidas\n' }) }
        return done(null, user)
      })
      .catch(erro => done(erro))
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((uid, done) => {
  User.lookUp(uid)
    .then(dados => done(null, dados))
    .catch(erro => done(erro, false))
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recursosRouter = require('./routes/recursos')

var app = express();

app.use(session({
  genid: req => {
    return uuidv4()
  },
  secret: 'secret pri tp L',
  store: new FileStore({logFn: function(){}}), //esta a esconder mensagens de erro porque estavam a aparecer mil sem razao
  resave: false,
  saveUninitialized: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret pri tp L'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recursos', recursosRouter);

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

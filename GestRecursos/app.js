var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
const cors = require('cors')

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
        if (!Bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Credenciais Inválidas\n' }) }
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

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
/*
  app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});
*/
app.use(session({
  genid: req => {
    return uuidv4()
  },
  secret: 'secret pri tp L',
  store: new FileStore({logFn: function(){}}), //esta a esconder mensagens de erro porque estavam a aparecer mil sem razao
  resave: false,
  saveUninitialized: false
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret pri tp L'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  var myToken = req.query.token || req.body.token
  if (req.url == "/users/login" || req.url == "/users/register")
    next()
  else if (req.isAuthenticated()) {
    next();
  }
  else if (myToken){
    jwt.verify(myToken, "PRI2020", function (e, decoded) {
      if (e) res.status(401).jsonp({ error: 'Nao se verificou o token, erro: ' + e })
      else {
        req.user = { access: decoded.level, id: decoded.username }
        next()
      }
    })
  }
  else{ 
    res.status(401).jsonp({ erro: 'erro na verificação do user' });
  }
})


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
  res.status(err.status || 500).jsonp({erro2: err.message});
});

module.exports = app;

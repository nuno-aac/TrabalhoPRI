var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', verificaAutenticacao, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', verificaAutenticacao, function (req, res) {
  res.render('upload')
})

router.get('/recursos', verificaAutenticacao, function(req,res) {
  res.render('recursos')
})

function verificaAutenticacao(req, res, next) {
  console.log('User (VERIFIC.): ' + JSON.stringify(req.user))
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect("/users/login");
  }
}

function verificaAcessoAdmin(req, res, next) {
  console.log('User (VERIFIC.): ' + JSON.stringify(req.user))
  if (req.user.access == 'ADMIN') {
    next();
  }
  else {
    res.redirect("/users/register");
  }
}

module.exports = router;

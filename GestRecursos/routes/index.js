var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', verificaAutenticacao, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', verificaAutenticacao, function (req, res) {
  res.render('upload')
})

function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect("/users/login");
  }
}

function verificaAcessoAdmin(req, res, next) {
  if (req.user.access == 'ADMIN') {
    next();
  }
  else {
    res.redirect("/users/register");
  }
}

module.exports = router;

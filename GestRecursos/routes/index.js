var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', verificaAutenticacao, function (req, res, next) {
  res.status(201)
});

function verificaAutenticacao(req, res, next) {//usar isto?
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.status(500).jsonp({erro: 'erro na verificação do user'});
  }
}

function verificaAcessoAdmin(req, res, next) {
  if (req.user.access == 'ADMIN') {
    next();
  }
  else {
    res.redirect("/users/register");//badalhoco
  }
}

module.exports = router;

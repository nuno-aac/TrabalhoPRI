var express = require('express');
var router = express.Router();
var Recurso = require('../controllers/recurso')

router.get('/', verificaAutenticacao, function(req, res, next) {
  res.render('recursos');
});

router.get('/:id', verificaAutenticacao, function(req,res){
    Recurso.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
    //res.render('recurso', )
})

function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.redirect("/users/login");
    }
  }

module.exports = router;

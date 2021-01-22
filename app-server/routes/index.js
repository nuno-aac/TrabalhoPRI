var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:6969/').then(dados => {
    console.log(dados.data)
    if(dados.status == 201)
      res.render('index');
    else if (dados.status == 401)
      res.redirect('/user/login')
    else
      res.render('httperror',{error: dados.data})
  }).catch( err => {res.render('error',{error:err});})
});

module.exports = router;

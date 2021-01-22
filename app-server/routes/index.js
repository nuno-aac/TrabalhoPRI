var express = require('express');
var axios = require('axios')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:6969/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im51bm8iLCJsZXZlbCI6IlVTRVIiLCJpYXQiOjE2MTEzMjQ5NzEsImV4cCI6MTYxMTMzNTc3MX0.brHCcztpYB6p9n2xLf4XJ0BqTzf9ICLJjWfNy9vNTvc').then(dados => {
    console.log(dados)
    if(dados.status == 201)
      res.render('index');
    else if (dados.status = 401)
      res.redirect('/user/login')
    else
      res.render('httperror',{error: dados.data})
  }).catch( err => {res.render('error',{error:err}); console.log(err)})
});

module.exports = router;

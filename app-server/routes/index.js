var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:6969/').then(dados => {
    console.log(dados)
    //res.render('index');
  })
});

module.exports = router;

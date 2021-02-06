var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function (req, res) {
  res.status(201).jsonp({user: req.user})
});

router.get('/tipos', function(req, res){
  var filePath = __dirname.split('routes')[0] + 'public/tipos.json'
  var tipos = []
  console.log(__dirname)
  var buffer = fs.readFileSync(filePath,'utf8')

  var buf = buffer.split('[')[1]

  for(var i = 0; i < buffer.split(',').length; i++){
    if(i == (buffer.split(',').length)-1){
      console.log(buf.split(',')[i].split(']')[0].replace('"','').replace('"',''))
      tipos.push(buf.split(',')[i].split(']')[0].replace('"','').replace('"',''))
    }
    else{
      tipos.push(buf.split(',')[i].replace('"','').replace('"',''))
    }
  }
  res.send(tipos);
})
/*function verificaAutenticacao(req, res, next) {//usar isto?
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
}*/

module.exports = router;

var express = require('express');
var router = express.Router();
var fs = require('fs')

// get req.user
router.get('/', function (req, res) {
  res.status(201).jsonp({user: req.user})
});

// get tipos
router.get('/tipos', function(req, res){
  var filePath = __dirname.split('routes')[0] + 'public/tipos.json'
  var tipos = []
  var buffer = fs.readFileSync(filePath,'utf8')

  var buf = buffer.split('[')[1]

  for(var i = 0; i < buffer.split(',').length; i++){
    if(i == (buffer.split(',').length)-1){
      tipos.push(buf.split(',')[i].split(']')[0].replace('"','').replace('"',''))
    }
    else{
      tipos.push(buf.split(',')[i].replace('"','').replace('"',''))
    }
  }
  res.send(tipos);
})

module.exports = router;

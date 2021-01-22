var express = require('express');
var router = express.Router();
var Recurso = require('../controllers/recurso')
var User = require('../controllers/user')

var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

router.get('/', function(req, res, next) {
  console.log('[LEVEL] ' + req.userToken.level)
  Recurso.listPrivate(req.userToken.username)
    .then(privateRec => {
        Recurso.listPublic()
            .then(publicRec => res.status(200).jsonp({recursosPriv: privateRec, recursosPublic: publicRec}))
            .catch(error => res.status(500).jsonp({ error: 'Erro na listagem de recursos: ' + error }))
    })
    .catch(error => res.status(500).jsonp({ error: 'Erro na listagem de recursos: ' + error }))
});

/////////////// sistema funciona na assumption que só se da upload de ficheiro .zip
router.post('/', upload.array('myFile'), function(req,res){
    // req.file is the 'myFile' file
    //req.body will hold the text fields if any

    
    var d = new Date().toISOString().substr(0, 19)

    req.files.forEach(a => {

        console.log(a)
        console.log(req.body)

        Recurso.insert({
            tipo: req.body.tipo,
            titulo: req.body.titulo,
            dataRegisto: d,
            visibilidade: req.body.visibilidade,
            autor: req.userToken.username,
            size: a.size//is this correct?
        })
            .then(dados => {
                console.log(dados)

                let quarantinePath = __dirname.split('routes')[0] + a.path
                let newPath = __dirname.split('routes')[0] + 'public/fileStore/' + dados._id + '.zip'

                fs.rename(quarantinePath, newPath, function (err) {
                    if (err) {
                        console.log(err)
                        Recurso.remove(dados._id)
                            .then(data => console.log(data))
                            .catch(err => console.log("erro: " + err))
                    }
                })
            })
            .catch(error => res.render('error', { error: error }))
    })

    res.redirect('/recursos')
    
    
})

router.get('/:id', function(req,res){
    Recurso.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
    //res.render('recurso', )
})

function verificaAutenticacao(req, res, next) {//usar isto? pipeline vertical broski
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.status(500).jsonp({erro: 'Erro na verificação do user'});
    }
  }

module.exports = router;

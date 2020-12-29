var express = require('express');
var router = express.Router();
var Recurso = require('../controllers/recurso')
var User = require('../controllers/user')

var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

router.get('/', verificaAutenticacao, function(req, res, next) {
  Recurso.listPrivate(req.user.id)
    .then(privateRec => {
        Recurso.listPublic()
            .then(publicRec => res.render('recursos', {recursosPriv: privateRec, recursosPublic: publicRec}))
            .catch(error => res.render('error', { error: error }))
    })
    .catch(error => res.render('error', { error: error }))
});

router.get('/upload', verificaAutenticacao, function (req, res) {
    res.render('upload')
  })


/////////////// sistema funciona na assumption que só se da upload de ficheiro .zip
router.get('/download/:recursoid', verificaAutenticacao, function(req,res){
    res.download(__dirname.split('routes')[0] + 'public/fileStore/' + req.params.recursoid + '.zip')
})


/////////////// sistema funciona na assumption que só se da upload de ficheiro .zip
router.post('/', verificaAutenticacao, upload.array('myFile'), function(req,res){
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
            autor: req.user.id,
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

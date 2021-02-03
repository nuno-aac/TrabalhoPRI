var express = require('express');
var router = express.Router();

var Post = require('../controllers/post')


router.get('/', function (req, res) {
    Post.list()
        .then(posts => res.status(200).jsonp(posts))
        .catch(err => res.status(500).jsonp(err))
});



/////////////// EDITAR RECURSOS (E POR CONSEQUENTE OS SEUS POSTS)




router.post('/:idRec', function (req,res) {
    var d = new Date().toISOString().substr(0, 19)

    var p = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        autor: req.user.id,
        visibilidade: 'PUBLIC',
        dataRegisto: d,

        recursoid: req.params.idRec
    }
    Post.insert(p)
        .then(post => res.status(201).jsonp(post))
        .catch(err => res.status(500).jsonp(err))
})

router.get('/:idRec', function (req, res) {
    Post.lookUpRec(req.params.idRec)
      .then(post => res.status(200).jsonp(post))
      .catch(err => res.status(500).jsonp(err))
  });

router.post('/:id/comment', function (req,res) {
    var d = new Date().toISOString().substr(0, 19)

    var c = {
        user: req.user.id,
        comment: req.body.comment,
        dataComment: d
    }
    
    Post.insertComment(req.params.id, c)
        .then(comment => res.status(201).jsonp(comment))
        .catch(err => res.status(500).jsonp(err))
})

router.get('/:idRec/:idPost', function (req, res) {
    Post.lookUp(req.params.idPost)
      .then(post => res.status(200).jsonp(post))
      .catch(err => res.status(500).jsonp(err))
});


module.exports = router;

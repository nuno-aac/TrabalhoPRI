var express = require('express');
var router = express.Router();

var Post = require('../controllers/post')


router.get('/', function (req, res) {
  Post.list()
    .then(posts => res.status(200).jsonp(posts))
    .catch(err => res.status(500).jsonp(err))
});

router.post('/:id', function (req,res) {
    var p = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        autor: req.user.id,
        recursoid: req.params.id
    }
    Post.insert(p)
        .then(post => res.status(201).jsonp(post))
        .catch(err => res.status(500).jsonp(err))
})
module.exports = router;

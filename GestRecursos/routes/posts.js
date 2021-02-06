var express = require('express');
var router = express.Router();

var Post = require('../controllers/post')
var Comment = require('../controllers/comment')


router.get('/', function (req, res) {
    if(req.query.rec != null) {
        Post.lookUpRec(req.query.rec)
            .then(posts => res.status(200).jsonp(posts))
            .catch(err => res.status(500).jsonp(err))
    }
    else if(req.query.users != null) {
        Post.lookUpUsers(req.query.users)
            .then(posts => res.status(200).jsonp(posts))
            .catch(err => res.status(500).jsonp(err))
    }
    else {
        Post.list()
            .then(posts => res.status(200).jsonp(posts))
            .catch(err => res.status(500).jsonp(err))
    }
});



/////////////// EDITAR RECURSOS (E POR CONSEQUENTE OS SEUS POSTS)




router.post('/', function (req,res) {
    var d = new Date().toISOString().substr(0, 19)

    var p = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        autor: req.user.id,
        visibilidade: 'PUBLIC',
        dataRegisto: d,
        recursoID: req.body.idRec,
        tipo: req.body.tipo
    }
    Post.insert(p)
        .then(post => res.status(201).jsonp(post))
        .catch(err => res.status(500).jsonp(err))
})

router.post('/:id/upvote', function(req, res){
    Post.getUpvotes(req.params.id)
        .then(post => {

            console.log(post)

            var uID = req.user.id

            if(post.upvotes.includes(uID)){
                Post.removeUpvote(req.params.id, uID)
                    .then(d => res.status(201).jsonp(d))
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                Post.addUpvote(req.params.id, uID)
                    .then(u => res.status(201).jsonp(u))
                    .catch(err => res.status(500).jsonp(err))
            }
        })
        .catch(err => res.status(500).jsonp(err)) 
})

router.get('/:id/comments', function (req,res) {
    Comment.list(req.params.id)
        .then(comments => res.status(200).jsonp(comments))
        .catch(err => res.status(500).jsonp(err))
})

router.post('/:id/comment', function (req,res) {
    var d = new Date().toISOString().substr(0, 19)

    var c = {
        user: req.user.id,
        upvotes: [],
        comment: req.body.comment,
        dataComment: d,
        postID: req.params.id
    }
    
    Comment.insert(c)
        .then(comment => res.status(201).jsonp(comment))
        .catch(err => res.status(500).jsonp(err))
})

router.post('/comment/:id/upvote', function(req, res){
    Comment.lookUp(req.params.id)
        .then(com => {

            var uID = req.user.id

            if(com.upvotes.includes(uID)){
                Comment.removeUpvote(req.params.id, uID)
                    .then(d => res.status(201).jsonp(d))
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                Comment.addUpvote(req.params.id, uID)
                    .then(u => res.status(201).jsonp(u))
                    .catch(err => res.status(500).jsonp(err))
            }
        })
        .catch(err => res.status(500).jsonp(err)) 
})

router.delete('/:id', function(req, res){
    Post.lookUp(req.params.id)
        .then(post => {
            if(post.autor == req.user.id || req.user.acess == "ADMIN"){
                Post.remove(req.params.id)
                    .then(re => res.status(200).jsonp(re))
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                res.status(500).jsonp({error: "Unauthorized"})
            }
        })
})

router.get('/:idPost', function (req, res) {
    Post.lookUp(req.params.idPost)
      .then(post => res.status(200).jsonp(post))
      .catch(err => res.status(500).jsonp(err))
});


module.exports = router;

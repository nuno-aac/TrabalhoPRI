var express = require('express');
var router = express.Router();

var Post = require('../controllers/post')


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
        recursoID: req.body.idRec
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

router.post('/:id/comment/:idCom/upvote', function(req, res){
    Post.getComment(req.params.id, req.params.idCom)
        .then(com => {

            console.log(com.comments)

            var uID = req.user.id

            if(com.comments[0].upvotes.includes(uID)){
                console.log('downvote')
                Post.removeUpvoteComment(post._id, uID)
                    .then(d => res.status(201).jsonp(d))
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                console.log('upvote')
                Post.addUpvoteComment(req.params.id, com.comments._id, uID)
                    .then(u => res.status(201).jsonp(u))
                    .catch(err => res.status(500).jsonp(err))
            }
        })
        .catch(err => res.status(500).jsonp(err)) 
})

router.get('/:idPost', function (req, res) {
    Post.lookUp(req.params.idPost)
      .then(post => res.status(200).jsonp(post))
      .catch(err => res.status(500).jsonp(err))
});


module.exports = router;

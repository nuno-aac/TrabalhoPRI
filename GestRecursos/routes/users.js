var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../controllers/user')
var jwt = require('jsonwebtoken')
var Bcrypt = require('bcrypt')

// retorna um token que o utilizador pode usar para usar a api livremente fora do website
router.get('/token', function (req, res) {
    User.lookUp(req.user.id)
        .then(user => {
            jwt.sign({ username: user.id, level: user.access }, 'PRI2020', { expiresIn: '3h' },//TOKEN - secret ou symmetric keys?
                function (err, token) {
                    if (err) res.status(500).jsonp({ error: "Erro na geração do token: " + err })
                    else {
                        user.dataUltimoAcesso = new Date().toISOString().substr(0, 19)
                        User.edit(user._id, user)
                            .then(dados => res.status(201).jsonp({ token: token }))
                            .catch(erro => console.log(erro))
                    }
                });
        })
        .catch(err => res.status(500).jsonp({ erro: 'Erro no lookup do User: ' + err }))
})

// logout
router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).jsonp({sucess: 'Session destroyed'})
        } else {
            res.status(500).jsonp({erro: 'Destroy session error: ' + err})
        }
    });
})

router.post('/:id/admin', function(req, res){
    if(req.user.access == 'ADMIN'){
        User.makeAdmin(req.params.id, 'ADMIN')
    }
})

// edit perfil
router.post('/perfil/:id', function(req, res){
    if (req.user.id == req.params.id || req.user.access == 'ADMIN') {
        User.lookUp(req.params.id)
            .then(user => {

                if(req.body.nome != '') user.nome = req.body.nome
                if(req.body.email != '') user.email = req.body.email
                if(req.body.filiacao != '') user.filiacao = req.body.filiacao
                if(req.body.age != '') user.age = req.body.age
                if(req.body.bio != '') user.bio = req.body.bio

                User.edit(user._id, user)
                    .then(dados => {
                        res.status(201).jsonp(dados)
                    })
                    .catch(err => res.status(500).jsonp({error: "Erro: " + err}))
            })
            .catch(err => res.status(500).jsonp({error: "Erro: " + err}))
    }
    else {
        res.status(401).jsonp({error: "unauthorized"});
    }
})

// login
router.post('/login',passport.authenticate('local'), function (req, res) {
    req.user.dataUltimoAcesso = new Date().toISOString().substr(0,19)
    User.edit(req.user._id, req.user)
        .then(dados => res.status(201).jsonp({user: req.user}))//req.user
        .catch(erro => res.status(401).jsonp(erro))
})

// register
router.post('/register', function (req, res) {
    req.body.password = Bcrypt.hashSync(req.body.password, 10);
    req.body.dataRegisto = new Date().toISOString().substr(0,19)
    req.body.access = 'USER'
    User.insert(req.body)
        .then(dados => res.status(201).jsonp(dados))
        .catch(err => res.status(500).jsonp({erro: 'Erro no register do User: ' + err}))
})

// get user by id
router.get('/:id', function (req, res) {
    User.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp({erro: 'Erro no lookup do User: ' + err}))
})

// delete user
router.delete('/:id', function(req, res){
    if (req.user.id == req.params.id || req.user.access == 'ADMIN'){
        User.remove(req.params.id)
            .then(u => res.status(200).jsonp(u))
            .catch(err => res.status(500).jsonp(err))
    }
    else{
        res.status(500).jsonp({error: "Unauthorized"})
    }
})


module.exports = router;

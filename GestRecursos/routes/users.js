var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../controllers/user')
var jwt = require('jsonwebtoken')

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

router.post('/perfil', function(req, res){
    var u = {
        id: req.user.id,
        password: req.body.password,
        nome: req.body.nome,
        email: req.body.email,
        filiaçao: req.body.filiaçao, 
        age: req.user.age,
        bio: req.body.bio,
        access: req.user.access,
        dataRegisto: req.user.dataRegisto,       
        dataUltimoAcesso: req.user.dataUltimoAcesso
    }
    User.edit(req.user.id, u)
        .then(dados => res.status(200))
        .catch(err => res.status(500).jsonp({error: "Erro: " + err}))
})


/*router.get('/:id', function (req, res) {
    User.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
})*/

router.post('/login',passport.authenticate('local'), function (req, res) {
    req.user.dataUltimoAcesso = new Date().toISOString().substr(0,19)
    User.edit(req.user._id, req.user)
        .then(dados => res.status(201).jsonp({user: req.user}))//req.user
        .catch(erro => res.status(401).jsonp(erro))
})

router.post('/register', function (req, res) {
    request.body.password = Bcrypt.hashSync(request.body.password, 10);
    req.body.dataRegisto = new Date().toISOString().substr(0,19)
    User.insert(req.body)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp({erro: 'Erro no register do User: ' + err}))
})


module.exports = router;

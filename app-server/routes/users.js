var express = require('express');
const axios = require('axios')
var router = express.Router();

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/perfil', function(req, res){
    res.render('perfil', {dados: req.user})
})

router.get('/perfil/editar', function(req, res){
    res.render('editarPerfil',{dados: req.user})
})

router.get('/logout', function (req, res) {
    axios.get('http://localhost:6969/users/logout?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im51bm8iLCJsZXZlbCI6IlVTRVIiLCJpYXQiOjE2MTEzMjQ5NzEsImV4cCI6MTYxMTMzNTc3MX0.brHCcztpYB6p9n2xLf4XJ0BqTzf9ICLJjWfNy9vNTvc').then(dados => {
        console.log(dados)
        if (dados.status == 201)
            res.render('index');
        else if (dados.status = 401)
            res.redirect('/users/login')
        else
            res.render('httperror', { error: dados.data })
    }).catch(err => { res.render('error', { error: err }); console.log(err) })
})

router.get('/register', function (req, res) {
    res.render('reg-form');
});

/*router.get('/:id', function (req, res) {
    User.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
})*/

router.post('/login', function (req, res) {
    req.user.dataUltimoAcesso = new Date().toISOString().substr(0,19)
    //TENHO QUE DAR LOOKUP DO USER, MUDAR A DATA E DEPOIS EDIT, PORQUE O REQ.USER NAO VAI TER A INFO TODA
    //USAR JWT
    User.edit(req.user.id, req.user)
        .then(dados => res.redirect('/'))
        .catch(err => console.log(err))
})

router.post('/register', function (req, res) {
    req.body.dataRegisto = new Date().toISOString().substr(0,19)
    User.insert(req.body)
        .then(dados => res.redirect('/'))
        .catch(error => res.render('error', { error: error }))
})


module.exports = router;

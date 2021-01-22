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
    axios.get('http://localhost:6969/users/logout').then(dados => {
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
    axios.post('http://localhost:6969/users/login', req.body)
        .then(dados => {
            res.cookie('user', dados.data.user, {
                expires: new Date(Date.now() + '1d'),
                secure: false, // set to true if your using https
                httpOnly: true
            });
            res.redirect('/')
        })
        .catch(erro => res.render(error, { error: erro }))
})

/*router.post('/register', function (req, res) {
    req.body.dataRegisto = new Date().toISOString().substr(0,19)
    User.insert(req.body)
        .then(dados => res.redirect('/'))
        .catch(error => res.render('error', { error: error }))
})*/

module.exports = router;

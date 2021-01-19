var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../controllers/user')

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (!err) {
            res.redirect('/');
        } else {
            console.log('Destroy session error: ', err)
        }
    });
})

router.get('/register', function (req, res) {
    res.render('reg-form');
});

/*router.get('/:id', function (req, res) {
    User.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
})*/

router.post('/login', passport.authenticate('local'), function (req, res) {
    req.user.dataUltimoAcesso = new Date().toISOString().substr(0,19)
    //TENHO QUE DAR LOOKUP DO USER, MUDAR A DATA E DEPOIS EDIT, PORQUE O REQ.USER NAO VAI TER A INFO TODA
    //USAR JWT
    User.edit(req.user._id, req.user)
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

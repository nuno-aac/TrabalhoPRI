var express = require('express');
var router = express.Router();
var Recurso = require('../controllers/recurso')
var Post = require('../controllers/post')
var AdmZip = require('adm-zip');

var fs = require('fs')

var multer = require('multer');
const { Console } = require('console');
var upload = multer({dest: 'uploads/'})

// lista todos os recursos, privados do user e publicos
router.get('/', function(req, res) {
    Recurso.listPrivate(req.query.search, req.query.type, req.query.minYear, req.query.maxYear, req.user.id)
        .then(privateRec => {
            Recurso.listPublic(req.query.search, req.query.type, req.query.minYear, req.query.maxYear)
                .then(publicRec => {
                    res.status(200).jsonp({recursosPriv: privateRec, recursosPublic: publicRec})
                })
                .catch(error => res.status(500).jsonp({ error: 'Erro na listagem de recursos: ' + error }))
        })
        .catch(error => res.status(500).jsonp({ error: 'Erro na listagem de recursos: ' + error }))
});

// download recurso
router.get('/download/:recursoid', function(req,res){
    res.download(__dirname.split('routes')[0] + 'public/fileStore/' + req.params.recursoid + '.zip')
})

// post recurso, upload ficheiro
router.post('/', upload.array('myFile'), function(req,res){

    var d = new Date().toISOString().substr(0, 19)

    var zipFlag = true

    console.log(req.files)

    console.log(req.body)

    if(req.body.tipo == '' || req.body.titulo == '' || req.body.visibilidade == '' || req.body.year == '' || req.files.length == 0) res.status(400).jsonp({error: 'Campos não preenchidos'})
    
    else {
        if(!(req.files.length == 1 && req.files[0].originalname.slice(req.files[0].originalname.lastIndexOf('.'),req.files[0].originalname.length) == '.zip')) {

            zipFlag = false
            
            var zip = new AdmZip()
    
            createManifesto(req.files)
    
            createMetadata(req.files)
    
            zip.addLocalFile(__dirname.split('routes')[0] + '/uploads/manifesto.json')
    
            req.files.forEach(a => {
                zip.addLocalFile(__dirname.split('routes')[0] + '/uploads/' + a.originalname.slice(0,a.originalname.lastIndexOf('.')) + '.meta.txt')
            })
    
            renameUploads(req.files).then(data => {
                req.files.forEach(a => {
                    zip.addLocalFile(__dirname.split('routes')[0] + 'uploads/' + a.originalname)
                })
                zip.writeZip(__dirname.split('routes')[0] + '/' + req.body.titulo + '.zip');
            })
        }
    
        Recurso.insert({
            tipo: req.body.tipo,
            titulo: req.body.titulo,
            dataRegisto: d,
            visibilidade: req.body.visibilidade,
            dateCreation: req.body.year,
            autor: req.user.id
        })
            .then(dados => {
    
                let quarantinePath = __dirname.split('routes')[0] + req.body.titulo + '.zip'
                
                if (zipFlag) quarantinePath = __dirname.split('routes')[0] + req.files[0].path
    
                let newPath = __dirname.split('routes')[0] + 'public/fileStore/' + dados._id + '.zip'

                relocateUnlink(quarantinePath, newPath, zipFlag, req.files)
                    .then(data => res.status(201).jsonp(dados))
                    .catch(error => {
                        console.log(error)
                        res.status(500).jsonp({error: 'Erro na relocalizaçao de ficheiros'})
                    })
            })
            .catch(error => res.status(500).jsonp(error ))
    }
    
    
    
})

// rating ao recurso
router.post('/:id/rating', function(req, res){
    var flag = false
    var rt = {
        rating: req.body.rating,
        user: req.user.id
    }

    Recurso.lookUp(req.params.id)
        .then(rec => {
            if(rec.ratings.length == 0){
                Recurso.addRating(rec._id, rt)
                    .then(r => res.status(201).jsonp(r))
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                rec.ratings.forEach(rat => {
                    if(rat.user == req.user.id){
                        flag = true
                        var oldrt = {
                            user: req.user.id,
                            rating: rat.rating
                        }
                        Recurso.removeRating(rec._id, oldrt)
                            .then(r =>{
                                Recurso.addRating(rec._id, rt)
                                    .then(r2 => res.status(201).jsonp(r2))
                                    .catch(err => res.status(500).jsonp(err))
                            })
                            .catch(err => res.status(500).jsonp(err))         
                    }
                })
                if(flag == false){
                    Recurso.addRating(rec._id, rt)
                        .then(r => res.status(201).jsonp(r))
                        .catch(err => res.status(500).jsonp(err))
                }
            }
        })
        .catch(err => res.status(500).jsonp(err)) 
})

// delete recurso
router.delete('/:id', function(req, res){
    Recurso.lookUp(req.params.id)
        .then(recurso => {
            if(recurso.autor == req.user.id || req.user.access == "ADMIN"){
                Recurso.remove(req.params.id)
                    .then(re => {
                        Post.removePostsRecurso(req.params.id)
                            .then(r => res.status(201).jsonp(r))
                            .catch(err => res.status(500).jsonp(err))
                    })
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                res.status(500).jsonp({error: "Unauthorized"})
            }
        })
})

// changes visibilidade
router.post('/:id/visibilidade', function(req, res){
    Recurso.lookUp(req.params.id)
        .then(recurso => {
            if(recurso.autor == req.user.id || req.user.access == "ADMIN"){
                Recurso.changeVisibilidade(req.params.id, req.body.visibilidade)
                    .then(re => {
                        Post.changeVisibilidade(req.params.id, req.body.visibilidade)
                            .then(po => {
                                res.status(201).jsonp({re:re,po:po})
                            })
                            .catch(err => res.status(500).jsonp(err))
                    })
                    .catch(err => res.status(500).jsonp(err))
            }
            else{
                res.status(500).jsonp({error: "Unauthorized"})
            }
        })
    
})

// get user recursos
router.get('/mine', function(req, res){
    Recurso.listUser(req.query.search, req.query.type, req.query.minYear, req.query.maxYear, req.user.id)
        .then(rec => {
            res.status(200).jsonp(rec)
        })
        .catch(error => res.status(500).jsonp({ error: 'Erro na listagem de recursos: ' + error }))
})

// get recurso by id
router.get('/:id', function(req,res){
    Recurso.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
})


// funçoes auxiliares para a criação do pacote uploaded

function createManifesto(obj){
    var fileNames = []

    obj.forEach(f => {
        fileNames.push(f.originalname)
    })

    fs.appendFileSync(__dirname.split('routes')[0] + '/uploads/manifesto.json', '[', function(err){
        if (err) console.log(err)
    })

    fileNames.forEach(f => {
        if(fileNames[fileNames.length - 1] == f){
            var file = '{"file":"' + f + '"}]'
            fs.appendFileSync(__dirname.split('routes')[0] + '/uploads/manifesto.json', file , function(err){
            if (err) console.log(err)
            })
        }
        else{
            var file = '{"file":"' + f + '"},'
            fs.appendFileSync(__dirname.split('routes')[0] + '/uploads/manifesto.json', file , function(err){
            if (err) console.log(err)
            })
        } 
    })

}

function createMetadata(obj){
    obj.forEach(f => {
        var meta = 'encoding:' + f.encoding + '\n' + 'mimetype:' + f.mimetype + '\n' +  'size:' + f.size + '\n'
        fs.appendFileSync(__dirname.split('routes')[0] + '/uploads/' + f.originalname.slice(0,f.originalname.lastIndexOf('.')) + '.meta.txt', meta, function(err){
            if (err) console.log(err)
        })
    })
}

function renameUploads(obj) {
    return new Promise(function(resolve, reject) {

        obj.forEach(a => {
            let quarantinePath = __dirname.split('routes')[0] + a.path
            let newPath = __dirname.split('routes')[0] + 'uploads/' + a.originalname
    
            fs.rename(quarantinePath, newPath, function (err) {
                if (err) {
                    console.log(err)
                }
            })
        });
        resolve();
    })
}

function relocateUnlink(quarantinePath, newPath, zipFlag, obj) {
    return new Promise(function(resolve, reject) {

        fs.rename(quarantinePath, newPath, function (err) {
            if (err) {
                console.log(err)
                Recurso.remove(dados._id)
                    .then(data => reject())
                    .catch(erro => reject())
            }
        })

        if(!zipFlag) {
            fs.unlink(__dirname.split('routes')[0] + '/uploads/manifesto.json', (err) => { reject()})
            obj.forEach(a => {
                fs.unlink(__dirname.split('routes')[0] + '/uploads/' + a.originalname.slice(0,a.originalname.lastIndexOf('.')) + '.meta.txt', (err) => { reject()})
                fs.unlink(__dirname.split('routes')[0] + 'uploads/' + a.originalname, (err) => {reject()})
            })
        }
        resolve()
    })
}

module.exports = router;

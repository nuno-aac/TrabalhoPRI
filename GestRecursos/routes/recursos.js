var express = require('express');
var router = express.Router();
var Recurso = require('../controllers/recurso')
var AdmZip = require('adm-zip');

var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

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

/////////////// sistema funciona na assumption que só se da upload de ficheiro .zip
router.get('/download/:recursoid', function(req,res){
    res.download(__dirname.split('routes')[0] + 'public/fileStore/' + req.params.recursoid + '.zip')
})



/////////////// EDITAR RECURSOS (E POR CONSEQUENTE OS SEUS POSTS)



/////////////// sistema funciona na assumption que só se da upload de ficheiro .zip
router.post('/', upload.array('myFile'), function(req,res){

    var d = new Date().toISOString().substr(0, 19)

    var zipFlag = true

    if(!(req.files.length == 1 && req.files[0].originalname.slice(req.files[0].originalname.lastIndexOf('.'),req.files[0].originalname.length) == '.zip')) {

        zipFlag = false
        
        var zip = new AdmZip()

        createManifesto(req.files)

        createMetadata(req.files)

        zip.addLocalFile(__dirname.split('routes')[0] + '/uploads/manifesto.json')

        req.files.forEach(a => {
            zip.addLocalFile(__dirname.split('routes')[0] + '/uploads/' + a.originalname.slice(0,a.originalname.lastIndexOf('.')) + '.txt')
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

            fs.rename(quarantinePath, newPath, function (err) {
                if (err) {
                    console.log(err)
                    Recurso.remove(dados._id)
                        .then(data => console.log('removed'))
                        .catch(erro => console.log("erro: " + erro))
                }
            })

            if(!zipFlag) {
                fs.unlink(__dirname.split('routes')[0] + '/uploads/manifesto.json', (err) => {})
                req.files.forEach(a => {
                    fs.unlink(__dirname.split('routes')[0] + '/uploads/' + a.originalname.slice(0,a.originalname.lastIndexOf('.')) + '.txt', (err) => {})
                    fs.unlink(__dirname.split('routes')[0] + 'uploads/' + a.originalname, (err) => {})
                })
            }
        })
        .catch(error => res.render('error', { error: error }))

    res.redirect('http://localhost:3000/recursos')//port
    
    
})

router.post('/:id/rating', function(req, res){
    var flag = false
    var rt = {
        rating: req.body.rating,
        user: req.user.id
    }

    Recurso.lookUp(req.params.id)
        .then(rec => {
            rec.ratings.forEach(rat => {
                if(rat.user == req.user.id){
                    flag = true
                    Recurso.removeRating(rec._id, rat)
                    Recurso.addRating(rec._id, rt)     
                }
            })
            if(flag == false){
                Recurso.addRating(rec._id, rt)
            }
        })
        .catch(err => res.status(500).jsonp(err)) 
})

router.get('/:id', function(req,res){
    Recurso.lookUp(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(err => res.status(500).jsonp(err))
})

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
        fs.appendFileSync(__dirname.split('routes')[0] + '/uploads/' + f.originalname.slice(0,f.originalname.lastIndexOf('.')) + '.txt', meta, function(err){
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

module.exports = router;

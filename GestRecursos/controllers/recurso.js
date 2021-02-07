var mongoose = require('mongoose')
var Recurso = require('../models/recurso')

// Returns list of recursos
module.exports.list = () => {
    return Recurso.find().exec()
}

// Returns list of PUBLIC recursos
module.exports.listPublic = (search, type, mindate, maxdate) => {
    if (search == null && type == null && mindate == null && maxdate == null){
        return Recurso.find({visibilidade: "PUBLIC"})
    }
    else if(search == null && type != null && mindate == null && maxdate == null){
        return Recurso.find({visibilidade: "PUBLIC", tipo: {$in: type}})
    }
    else if(search == null && type == null && mindate != null && maxdate != null){
        return Recurso.find({visibilidade: "PUBLIC", dateCreation: {$gte:mindate, $lte:maxdate}})
    }
    else if(search == null && type != null && mindate != null && maxdate != null){
        return Recurso.find({visibilidade: "PUBLIC", tipo: {$in: type}, dateCreation: {$gte:mindate, $lte:maxdate}})
    }
    else if(search != null && type == null && mindate == null && maxdate == null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PUBLIC", titulo: {$in:nsSearch}})
    }
    else if(search != null && type != null && mindate == null && maxdate == null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PUBLIC", titulo: {$in:nsSearch}, tipo: {$in: type}})
    }
    else if(search != null && type == null && mindate != null && maxdate != null){
        console.log(maxdate)
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PUBLIC", titulo: {$in:nsSearch}, dateCreation: {$gte:mindate, $lte:maxdate}})
    }
    else if(search != null && type != null && mindate != null && maxdate != null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PUBLIC", titulo: {$in:nsSearch}, tipo: {$in: type}, dateCreation: {$gte:mindate, $lte:maxdate}})
    }
    else {
        return Recurso.find({visibilidade: "PUBLIC"})
    }
}

function noSpace(array) {
    var newArray = []
    array.forEach(a => {
        if(a != '') newArray.push(new RegExp(a, "i"))
    })
    return newArray
}

// Returns list of PRIVATE recursos of certain autor
module.exports.listPrivate = (search, type, mindate, maxdate, id) => {
    if (search == null && type == null && mindate == null && maxdate == null){
        return Recurso.find({visibilidade: "PRIVATE", autor: id})
    }
    else if(search == null && type != null && mindate == null && maxdate == null){
        return Recurso.find({visibilidade: "PRIVATE", tipo: {$in: type}, autor: id})
    }
    else if(search == null && type == null && mindate != null && maxdate != null){
        return Recurso.find({visibilidade: "PRIVATE", dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else if(search == null && type != null && mindate != null && maxdate != null){
        return Recurso.find({visibilidade: "PRIVATE", tipo: {$in: type}, dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else if(search != null && type == null && mindate == null && maxdate == null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PRIVATE", titulo: {$in:nsSearch}, autor: id})
    }
    else if(search != null && type != null && mindate == null && maxdate == null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PRIVATE", titulo: {$in:nsSearch}, tipo: {$in: type}, autor: id})
    }
    else if(search != null && type == null && mindate != null && maxdate != null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PRIVATE", titulo: {$in:nsSearch}, dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else if(search != null && type != null && mindate != null && maxdate != null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({visibilidade: "PRIVATE", titulo: {$in:nsSearch}, tipo: {$in: type}, dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else {
        return Recurso.find({visibilidade: "PRIVATE", autor: id})
    }
}

// Returns list of recursos of certain autor
module.exports.listUser = (search, type, mindate, maxdate, id) => {
    if (search == null && type == null && mindate == null && maxdate == null){
        return Recurso.find({autor: id})
    }
    else if(search == null && type != null && mindate == null && maxdate == null){
        return Recurso.find({tipo: {$in: type}, autor: id})
    }
    else if(search == null && type == null && mindate != null && maxdate != null){
        return Recurso.find({dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else if(search == null && type != null && mindate != null && maxdate != null){
        return Recurso.find({tipo: {$in: type}, dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else if(search != null && type == null && mindate == null && maxdate == null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({titulo: {$in:nsSearch}, autor: id})
    }
    else if(search != null && type != null && mindate == null && maxdate == null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({titulo: {$in:nsSearch}, tipo: {$in: type}, autor: id})
    }
    else if(search != null && type == null && mindate != null && maxdate != null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({titulo: {$in:nsSearch}, dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else if(search != null && type != null && mindate != null && maxdate != null){
        let nsSearch = noSpace(search.split(' '))
        return Recurso.find({titulo: {$in:nsSearch}, tipo: {$in: type}, dateCreation: {$gte:mindate, $lte:maxdate}, autor: id})
    }
    else {
        return Recurso.find({autor: id})
    }
}

// Returns a recurso by id
module.exports.lookUp = id => {
    return Recurso.findOne({ _id: id }).exec()
}

// Inserts a new recurso
module.exports.insert = r => {
    var newRecurso = new Recurso(r)
    return newRecurso.save()
}

// Removes a recurso by id
module.exports.remove = id => {
    return Recurso.deleteOne({ _id: id })
}

// Changes a recurso
module.exports.edit = (id, r) => {
    return Recurso.findByIdAndUpdate(id, r, { new: true }) // <- not done
}

// adiciona rating a recurso
module.exports.addRating = (idR, rt) => {
    return Recurso.updateOne(
        {_id:idR},
        {
            $push: {ratings: rt}
        }
    )
}

// retira rating de recurso
module.exports.removeRating = (idR, rt) => {
    return Recurso.updateOne(
        {_id:idR},
        {
            $pull: {ratings: rt}
        }
    )
}

// changes visibilidade
module.exports.changeVisibilidade = (idR, vis) => {
    return Recurso.updateOne(
        {_id:idR},
        {
            visibilidade: vis
        }
    )
}

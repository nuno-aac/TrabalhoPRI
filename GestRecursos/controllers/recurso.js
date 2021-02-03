var mongoose = require('mongoose')
var Recurso = require('../models/recurso')

// Returns list of recursos
module.exports.list = () => {
    return Recurso.find().exec()
}

// Returns list of PUBLIC recursos
module.exports.listPublic = (search, type, date) => {
    if (search == null && type == null && date == null){
        return Recurso.find({visibilidade: "PUBLIC"})
    }
    else if(search == null && type != null && date == null){
        return Recurso.find({visibilidade: "PUBLIC", tipo: {$in: type}})
    }
    else if(search == null && type == null && date != null){
        return Recurso.find({visibilidade: "PUBLIC", dateCreation: {$in: date}})
    }
    else if(search == null && type != null && date != null){
        return Recurso.find({visibilidade: "PUBLIC", tipo: {$in: type}, dateCreation: {$in: date}})
    }
    else if(search != null && type == null && date == null){
        return Recurso.find({visibilidade: "PUBLIC"/*, SEARCH*/})
    }
    else if(search != null && type != null && date == null){
        return Recurso.find({visibilidade: "PUBLIC"/*, SEARCH*/, tipo: {$in: type}})
    }
    else if(search != null && type == null && date != null){
        return Recurso.find({visibilidade: "PUBLIC"/*, SEARCH*/, dateCreation: {$in: date}})
    }
    else {
        return Recurso.find({visibilidade: "PUBLIC"/*, SEARCH*/, tipo: {$in: type}, dateCreation: {$in: date}})
    }
}

// Returns list of PRIVATE recursos of certain autor
module.exports.listPrivate = (search, type, date, id) => {
    if (search == null && type == null && date == null){
        return Recurso.find({visibilidade: "PRIVATE", autor: id})
    }
    else if(search == null && type != null && date == null){
        return Recurso.find({visibilidade: "PRIVATE", tipo: {$in: type}, autor: id})
    }
    else if(search == null && type == null && date != null){
        return Recurso.find({visibilidade: "PRIVATE", dateCreation: {$in: date}, autor: id})
    }
    else if(search == null && type != null && date != null){
        return Recurso.find({visibilidade: "PRIVATE", tipo: {$in: type}, dateCreation: {$in: date}, autor: id})
    }
    else if(search != null && type == null && date == null){
        return Recurso.find({visibilidade: "PRIVATE"/*, SEARCH*/, autor: id})
    }
    else if(search != null && type != null && date == null){
        return Recurso.find({visibilidade: "PRIVATE"/*, SEARCH*/, tipo: {$in: type}, autor: id})
    }
    else if(search != null && type == null && date != null){
        return Recurso.find({visibilidade: "PRIVATE"/*, SEARCH*/, dateCreation: {$in: date}, autor: id})
    }
    else {
        return Recurso.find({visibilidade: "PRIVATE"/*, SEARCH*/, tipo: {$in: type}, dateCreation: {$in: date}, autor: id})
    }
}

//Fazer isto porque not sure if right ----------------------
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

//Fazer isto porque not sure if right ----------------------

// Changes a recurso
module.exports.edit = (id, r) => {
    return Recurso.findByIdAndUpdate(id, r, { new: true })
}
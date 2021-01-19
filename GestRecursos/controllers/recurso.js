var mongoose = require('mongoose')
var Recurso = require('../models/recurso')

// Returns list of recursos
module.exports.list = () => {
    return Recurso.find().exec()
}

// Returns list of PUBLIC recursos
module.exports.listPublic = () => {
    return Recurso.find({visibilidade: "PUBLIC"})
}

// Returns list of PRIVATE recursos of certain autor
module.exports.listPrivate = id => {
    return Recurso.find({visibilidade: "PRIVATE", autor: id})
}

//Fazer isto porque not sure if right ----------------------
// Returns a recurso by id
module.exports.lookUp = id => {
    return Recurso.findOne({ _id: id }).exec()
}

// Inserts a new recurso
module.exports.insert = r => {
    console.log(JSON.stringify(r))
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
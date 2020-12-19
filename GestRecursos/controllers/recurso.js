var mongoose = require('mongoose')
var Recurso = require('../models/recurso')

// Returns list of recursos
module.exports.list = () => {
    return Recurso.find().exec()
}

//Fazer isto porque not sure if right ----------------------
/*
// Returns a recurso by id
module.exports.lookUp = id => {
    return Recurso.findOne({ id: id }).exec()
}*/

// Inserts a new recurso
module.exports.insert = r => {
    console.log(JSON.stringify(r))
    var newRecurso = new Recurso(r)
    return newRecurso.save()
}

//Fazer isto porque not sure if right ----------------------
/*
// Removes a recurso by id
module.exports.remove = id => {
    return Recurso.deleteOne({ id: id })
}*/

//Fazer isto porque not sure if right ----------------------
/*
// Changes a recurso
module.exports.edit = (id, r) => {
    return Recurso.findByIdAndUpdate(id, r, { new: true })
}*/
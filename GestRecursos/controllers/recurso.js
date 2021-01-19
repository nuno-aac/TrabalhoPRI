var mongoose = require('mongoose')
const recurso = require('../models/recurso')
var User = require('../models/recurso')

// Returns list of recursos
module.exports.list = () => {
    return User.find().exec()
}

// Returns list of PUBLIC recursos
module.exports.listPublic = () => {
    return User.find({"recursos.visibilidade": "PUBLIC"})
}

// Returns list of PRIVATE recursos of certain autor
module.exports.listPrivate = id => {
    return User.find({"recursos.visibilidade": "PRIVATE", id: id})
}

//Fazer isto porque not sure if right ----------------------
// Returns a recurso by id
module.exports.lookUp = id => {
    return User.findOne({ "recursos._id": id }).exec()
}

// Inserts a new recurso
module.exports.insert = (id,r) => {
    console.log(r)
    return User.update(
        {id:id},
        {$push: {recursos: {
            tipo: r.tipo,
            titulo: r.titulo,
            dataRegisto: r.dataRegisto,
            visibilidade: r.visibilidade,
            size: r.size
        }
        }
        }
    )
}

// Removes a recurso by id
module.exports.remove = id => {
    return User.deleteOne({ "recursos._id": id })
}

//Fazer isto porque not sure if right ----------------------

// Changes a recurso
module.exports.edit = (id, id_rec, r) => {
    return User.findByIdAndUpdate({id:id, "recursos.id": id_rec}, {recursos:r}, { new: true })
}
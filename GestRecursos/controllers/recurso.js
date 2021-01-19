var mongoose = require('mongoose')
var Recurso = require('../models/recurso')
var User = require('../models/user')

// Returns list of recursos
module.exports.list = () => {
    return User.find().exec()
}

// Returns list of PUBLIC recursos
module.exports.listPublic = () => {
    return User.aggregate([
        {$match: {'recursos.visibilidade': 'PUBLIC'}},
        {$project: {
            recursos: {$filter: {
                input: '$recursos',
                as: 'recursos',
                cond: {$eq: ['$$recursos.visibilidade', 'PUBLIC']}
            }},
            _id: 0
        }}
    ])
}

// Returns list of PRIVATE recursos of certain autor
module.exports.listPrivate = id => {
    return User.aggregate([
        {$match: {'recursos.visibilidade': 'PRIVATE', id:id}},
        {$project: {
            recursos: {$filter: {
                input: '$recursos',
                as: 'recursos',
                cond: {$eq: ['$$recursos.visibilidade', 'PRIVATE']}
            }},
            _id: 0
        }}
    ])
}

//Fazer isto porque not sure if right ----------------------
// Returns a recurso by id
module.exports.lookUp = id => {
    return User.findOne({ "recursos._id": id }).exec()
}

// Inserts a new recurso
module.exports.insert = (id,r) => {
    var rec = new Recurso(r)
    return User.update(
        {id:id},
        {
            $push: {recursos: r}
        }
    )
    //return User.recursos.push(rec).save();
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
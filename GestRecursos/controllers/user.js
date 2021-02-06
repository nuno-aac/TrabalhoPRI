var mongoose = require('mongoose')
var User = require('../models/user')

// Returns list of users
module.exports.list = () => {
    return User.find().exec()
}

// Returns a user by id
module.exports.lookUp = id => {
    return User.findOne({ id: id }).exec()
}

// Inserts a new user
module.exports.insert = u => {
    var newUser = new User(u)
    return newUser.save()
}

// Removes a user by id
module.exports.remove = id => {
    return User.deleteOne({ id: id })
}

// Changes a user
module.exports.edit = (id, u) => {
    return User.findByIdAndUpdate(id, u, { new: true })//{id:id}
}

module.exports.changeAccess = (id, adm) => {
    return User.update(
        {id:id},
        {
            access: adm
        }
    )
}
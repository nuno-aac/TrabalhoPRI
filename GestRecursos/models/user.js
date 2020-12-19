var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    //model for user, not finished
    id: String,
    password: String
})

module.exports = mongoose.model('user', userSchema)
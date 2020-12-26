var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    //model for user, not finished
    id: String, //username
    password: String,
    email: String,
    age: Number,
    bio: String,
    access: Number
})

module.exports = mongoose.model('user', userSchema)
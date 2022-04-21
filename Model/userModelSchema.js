var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    userId: Number,
    fullName: String,
    password: String,
    dob: String,
    email: String,
    number: Number,
    address: String,
    city: String,
    state: String,
    postalCode: String,
})

const User = mongoose.model('users', UserSchema)

module.exports = User;
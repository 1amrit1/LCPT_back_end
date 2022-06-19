var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    user_id: Number,
    fullName: String,
    userName: String,
    password: String,
    dob: String,
    email: String,
    number: Number,
    address: String,
    country: String,
    city: String,
    state: String,
    postalCode: String,
    type:String
})

const User = mongoose.model('users', UserSchema)

module.exports = User;
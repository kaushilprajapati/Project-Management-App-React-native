const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    jobTitle: String,
    isAdmin: Boolean
})


module.exports = mongoose.model('User', userSchema);
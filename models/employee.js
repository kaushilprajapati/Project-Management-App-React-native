const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: String,
    position: String,
    dept: String,
})

module.exports = mongoose.model('Employee', employeeSchema);
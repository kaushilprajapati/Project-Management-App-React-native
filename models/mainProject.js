const mongoose = require('mongoose');


const mainProjectSchema = mongoose.Schema({
   projectName : String,
})

module.exports = mongoose.model('mainProject', mainProjectSchema);
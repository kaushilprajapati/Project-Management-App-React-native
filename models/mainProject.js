const mongoose = require('mongoose');


const mainProjectSchema = mongoose.Schema({
   projectName : String,
   totalAmount : String,
   status: String,
   isComplete: Boolean,
})

module.exports = mongoose.model('mainProject', mainProjectSchema);
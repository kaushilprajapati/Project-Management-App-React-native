const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: String,
    taskName: String,
    taskDescription: String,
    taskStartDate: String,
    taskEndDate: String,
    assignedMember: String,
    taskRate: String,
    taskStatus: String,
    isComplete: Boolean,
    totalHours: String,
    totalAmount: String 
})


module.exports = mongoose.model('Project', projectSchema);
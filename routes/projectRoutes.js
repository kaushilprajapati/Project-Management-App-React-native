const express = require('express');
const router = express.Router();

const Project = require('../models/project');

const ObjectId = require('mongoose').Types.ObjectId;
//Get Post Put Delete

//Get API
router.get('/', async(req,res) => {
    const projectList = await Project.find();
    if(!projectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(projectList); 
});

//get 1 employee
    
router.get('/:id', async(req,res) => {
    if(ObjectId.isValid(req.params.id))
    {

    const projectList = await Project.findById(req.params.id);

    if(!projectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(projectList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


//Post API
router.post('/', async(req,res) => { 
    let project = new Project({
    projectName : req.body.projectName,
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskStartDate: req.body.taskStartDate,
    taskEndDate: req.body.taskEndDate,
    assignedMember:req.body.assignedMember,
    taskRate: req.body.taskRate,
    taskStatus: req.body.taskStatus,
    isComplete: req.body.isComplete,
    totalHours: req.body.totalHours,
    totalAmount: req.body.totalAmount
    }) 
    project = await project.save();

    if(!project)
    return res.status(400).send('the user cannot be added')
    res.send(project);
    // emp.save((err, doc) =>
    // {
    //     if(err) {
    //             console.log(err);
    //     }

    //     else {
    //         res.send(doc);
    //     }
    // })
})


//Delete API 

    
router.delete('/:id', async(req,res) => {
    if(ObjectId.isValid(req.params.id))
    {

    const projectList = await Project.findByIdAndRemove(req.params.id);

    if(!projectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(projectList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


//Put API
router.put('/:id', async(req,res) => {
    if(ObjectId.isValid(req.params.id))
    {
        let project = {
            projectName: req.body.projectName,
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            taskStartDate: req.body.taskStartDate,
            taskEndDate: req.body.taskEndDate,
            assignedMember:req.body.assignedMember,
            taskRate: req.body.taskRate,
            taskStatus: req.body.taskStatus,
            isComplete: req.body.isComplete,
            totalHours: req.body.totalHours,
            totalAmount: req.body.totalAmount
        };
 
    const projectList = await Project.findByIdAndUpdate(req.params.id, {$set:project}, {new: true});

    if(!projectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(projectList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


module.exports = router;
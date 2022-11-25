const express = require('express');
const router = express.Router();

const mainProject = require('../models/mainProject');

const ObjectId = require('mongoose').Types.ObjectId;
//Get Post Put Delete

//Get API
router.get('/', async(req,res) => {
    const mainProjectList = await mainProject.find();
    if(!mainProjectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(mainProjectList); 
});

//get 1 employee
    
router.get('/:id', async(req,res) => {
    if(ObjectId.isValid(req.params.id))
    {

    const mainProjectList = await mainProject.findById(req.params.id);

    if(!mainProjectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(mainProjectList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


//Post API
router.post('/', async(req,res) => { 
    let project = new mainProject({
        projectName : req.body.projectName,
    }) 
    project = await project.save();

    if(!project)
    return res.status(400).send('the project name cannot be added')
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

    const mainProjectList = await mainProject.findByIdAndRemove(req.params.id);

    if(!mainProjectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(mainProjectList); 
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
            };
 
    const mainProjectList = await mainProject.findByIdAndUpdate(req.params.id, {$set:project}, {new: true});

    if(!mainProjectList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(mainProjectList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


module.exports = router;
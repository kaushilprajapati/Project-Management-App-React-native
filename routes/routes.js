const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

const ObjectId = require('mongoose').Types.ObjectId;
//Get Post Put Delete

//Get API
router.get('/', async(req,res) => {
    const employeeList = await Employee.find();

    if(!employeeList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(employeeList); 
});

//get 1 employee
    
router.get('/:id', async(req,res) => {
    if(ObjectId.isValid(req.params.id))
    {

    const employeeList = await Employee.findById(req.params.id);

    if(!employeeList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(employeeList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


//Post API
router.post('/', async(req,res) => { 
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        dept: req.body.dept,
    }) 
    emp = await emp.save();

    if(!emp)
    return res.status(400).send('the employee cannot be added')
    res.send(emp);
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

    const employeeList = await Employee.findByIdAndRemove(req.params.id);

    if(!employeeList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(employeeList); 
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
        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept,
        };

    const employeeList = await Employee.findByIdAndUpdate(req.params.id, {$set:emp}, {new: true});

    if(!employeeList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(employeeList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


module.exports = router;
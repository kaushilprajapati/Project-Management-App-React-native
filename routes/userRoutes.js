const express = require('express');
const router = express.Router();

const User = require('../models/user');

const ObjectId = require('mongoose').Types.ObjectId;
//Get Post Put Delete

//Get API
router.get('/', async(req,res) => {
    const userList = await User.find();
    if(!userList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(userList); 
});

//get 1 employee
    
router.get('/:id', async(req,res) => {
    if(ObjectId.isValid(req.params.id))
    {

    const userList = await User.findById(req.params.id);

    if(!userList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(userList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


//Post API
router.post('/', async(req,res) => { 
    let user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        jobTitle: req.body.jobTitle,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
        password: req.body.password
    }) 
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be added')
    res.send(user);
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

    const userList = await User.findByIdAndRemove(req.params.id);

    if(!userList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(userList); 
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
        let user = {
            email: req.body.email,
            firstName: req.body.firstName,
            jobTitle: req.body.jobTitle,
            lastName: req.body.lastName,
            isAdmin: req.body.isAdmin,
            password: req.body.password
        };
 
    const userList = await User.findByIdAndUpdate(req.params.id, {$set:user}, {new: true});

    if(!userList)
    {
    res.status(500).json({success:false})
    }

   res.status(200).send(userList); 
    }
    else
    {
        return res.status(400).send('No records found');
    }
});


module.exports = router;
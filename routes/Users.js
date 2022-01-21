const express = require("express");
// const req = require("express");
const router = express.Router();
const User = require('../models/User');

// Get All Users
router.get('/getAllUsers', async(req,res) => {

    try{
    const users = await User.find();
    res.status(200).json(users);
    } catch(err){
    res.json({message:err})
}
});

//Submit A User
router.post('/addUser', async(req,res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        deposit: req.body.deposit,
        role: req.body.role
    });

    try{
    const savedUser = await user.save();
    res.status(200).json({
        message:'Saved Successfully',
        savedUser
    });
    }catch(err){
        res.json({message:err})
    }

});

//Get A Specific User
router.get('/getUser/', async(req,res) => {
    try{
    const user = await User.findOne({'username':req.body.username});
    res.status(200).json(user);
    }catch(err){
        res.status(400).json({message : err});
    }
});

//Delete User
router.delete('/deleteUser/', async(req,res) => {
    try{
        const removedUser = await User.remove({ 'username': req.body.username});
        res.status(200).json(removedUser);
    }catch(err){
        res.json({message : err});
    }
});

//Update a User
router.patch('/updateUser/', async(req,res) =>{
   try{ 
    const updatedUser = await User.updateOne(
        { username: req.body.username },
        { $set: {
            password: req.body.password,
            deposit: req.body.deposit,
            role: req.body.role
        
        } }
    );
    res.status(200).json(updatedUser);
   }catch(err){
    res.json({message : err});
   }
});

module.exports = router;
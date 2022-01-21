const express = require("express");
const req = require("express");
const router = express.Router();
const User = require('../models/User');

const validDeposits = [5,10,20,50,100];
//Deposit A Certain Amount To A USer's Account
router.patch('/', async(req,res) =>{
    try{ 
        const user = req.body.user;

     if(user.role == "buyer" && validDeposits.includes(req.body.deposit)){
         const updatedUser = await User.updateOne(
             { username: user.username },
             { $inc: {deposit: req.body.deposit} }
         );
         res.status(200).json(updatedUser);
     }
     else{
        res.json({message : 'User type is not buyer or you must deposit one of those values: 5,10,20,50 and 100.'});
     }
    }catch(err){
     res.json({message : err});
    }
 });

 module.exports = router;
const express = require("express");
const req = require("express");
const router = express.Router();
const User = require('../models/User');

router.patch('/',async(req,res)=>
{
   var user = req.body.user;
   if(user.role =="buyer")
   {
    try{ 
        const updatedUser = await User.updateOne(
            { username: user.username },
            { $set: {
                deposit:0
            
            } }
        );
        res.status(200).json(updatedUser);
       }catch(err){
        res.json({message : err});
       }
    }
else{
   res.json({message:"Sorry, you're not a buyer"});
}

});


module.exports = router;

const express = require("express");
const req = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');



 router.patch('/',async(req,res)=>
 {
    var user = req.body.user;
    var amountOfProducts = req.body.amountOfProducts;
    var product = await Product.findOne({productName:req.body.productName});
    if(user.role =="buyer")
    {
    if(amountOfProducts<=product.amountAvailable)
    {
         change = await User.findOne({username:user.username});
        if(change.deposit-product.cost>=0)
        {
            // const change = user.deposit-(product.cost*amountOfProducts);
            const updatedProduct = await Product.updateOne(
                { productName: product.productName },
                { $inc: {
                      amountAvailable: -amountOfProducts} }
            );
            newUser = await User.updateOne(
                {
                 username : user.username 
                },
                {
                    $inc:{
                        deposit: -(product.cost*amountOfProducts)
                    }
                }
            )
            res.status(200).json({message:"Total spent is: " + product.cost*amountOfProducts + " Products Purchased are: " + product.productName
        + " Change is: " + (change.deposit-(product.cost*amountOfProducts))});
        }
        else{
            res.json({message:"insufficent funds."});
        }
    }
    else{
        res.json({message:"The amount available is less than your desired amount"});
    }
}
else{
    res.json({message:"Sorry, you're not a buyer"});
}

 });

module.exports = router;
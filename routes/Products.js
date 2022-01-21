const express = require("express");
const req = require("express");
const router = express.Router();
const Product = require('../models/Product');

// Get All Products
router.get('/getAllProducts', async(req,res) => {

    try{
    const products = await Product.find();
    res.status(200).json(products);
    } catch(err){
    res.json({message:err})
}

});

//Submit A Product
router.post('/addProduct', async(req,res) => {
    
    try{
        if(!req.body.user){
            res.json({message:"Missing user parameters!"});
        }
        if(req.body.user.role =="seller"){

    const product = new Product({
        amountAvailable: req.body.amountAvailable,
        cost: req.body.cost,
        productName: req.body.productName,
        sellerId: req.body.user.username
    });

    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
    }
    else{
        res.json({message:"You're not a seller"});

    }
    }catch(err){
        res.json({message:err})
    }

});

//Get A Specific Product
router.get('/getProduct/', async(req,res) => {
    try{
    const product = await Product.findOne({"productName": req.body.productName});
    res.status(200).json(product);
    }catch(err){
        res.json({message : err});
    }
});

//Delete Product
router.delete('/deleteProduct/', async(req,res) => {
    try{

        if(!req.body.user){
            res.json({message:"Missing user parameters!"});
        }
        if(req.body.user.role!="seller")
        {
            res.json({message:"you're not a seller"});
        }
     if(req.body.user.username == req.body.sellerId){
        const removedProduct = await Product.deleteOne({ productName: req.body.productName });
        res.json(removedProduct);
     }
     else{
         res.json({message: "You're not the seller of this product."})
     }
    }catch(err){
        res.json({message : err});
    }
});

//Update a Product
router.patch('/updateProduct/', async(req,res) =>{
   try{ 
    
    if(!req.body.user){
        res.json({message:"Missing user parameters!"});
    }
    if(req.body.user.role!="seller")
    {
        res.json({message:"you're not a seller"});
    }

    if(req.body.user.username == req.body.sellerId){
        const updatedProduct = await Product.updateOne(
            { productName: req.body.productName },
            { $set: {
                cost:req.body.cost,
                amountAvailable: req.body.amountAvailable} }
        );
        res.json(updatedProduct);
    }
    else{
        res.json({message:"You're not the owner"});
    }
   }catch(err){
    res.json({message : err});
   }
});

module.exports = router;
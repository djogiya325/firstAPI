var express = require('express');
var router = express.Router();
var AM = require('./Models/myBooks')

//to fetch books
router.get('/myBook',async(req,res)=>{
    const iam = await AM.find()
    res.send(iam)
})

//to add the book
router.post("/myBook",async(req,res)=>{
    const iam = new AM({
        name:req.body.name,
        brand:req.body.brand
    })

    await iam.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})


// api for updating book

router.patch('/myBook/:id',async (req,res)=>{
    const iam = await AM.findOne({_id:req.params.id})
    iam.name = req.body.name
    iam.brand = req.body.brand
    await iam.save((err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }
    })

})

//delete api

router.delete("/myBook/:id",async(req,res)=>{
    await AM.deleteOne({_id:req.params.id},(err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }

    })
})

module.exports = router 
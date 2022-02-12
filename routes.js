var express = require('express');
var router = express.Router();
var myList = require('./Models/book_list')

//to fetch book
router.get('/book',async(req,res)=>{
    const booklist = await myList.find()
    res.send(booklist)
})

//to add the book
router.post("/book",async(req,res)=>{
    const booklist = new myList({
        name:req.body.name,
        price:req.body.price
    })

    await booklist.save((err,msg)=>{
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

router.patch('/book/:id',async (req,res)=>{
    const booklist = await myList.findOne({_id:req.params.id})
    booklist.name = req.body.name
    booklist.price = req.body.price
    await booklist.save((err,msg)=>{
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

router.delete("/book/:name",async(req,res)=>{
    await myList.deleteOne({name:req.params.name},(err,msg)=>{
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
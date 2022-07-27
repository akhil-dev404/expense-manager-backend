const express=require('express');
const mongoose=require("mongoose")
var router= express.Router();
const Transactions=require("../models/transactions.model");
const Categories=require("../models/category.model");


router.post("/add_transaction",(req,res)=>{
const newTransaction=new Transactions({
    user_id:req.body.user_id,
    category_id:req.body.category_id,
    transaction_name:req.body.transaction_name,
    transaction_amount:req.body.transaction_amount,
    transaction_date:req.body.transaction_date,
    transaction_note:req.body.transaction_note
    });

    newTransaction.save((err,newTransaction)=>{
    if(err){
        res.send(err);
    }
    else{
        res.send({status:"ok",data:newTransaction   });
    }
    });
 });

 router.get('/get_all_transaction/:userId',(req,res)=>{
     Transactions.find({user_name:req.params.userId},(err,result)=>{
         if(err){
             return res.send(err)
         }
         else{
          const sresult=new Map();
          sresult['data']=result;
            // res.send(sresult);
            sresult['data'].forEach(element => {
                Categories.findById(element.category_id,(err,result)=>{
                    console.log(result);
                    sresult['data'][0]
                })
                
            });
        //   console.log(result);
        //   console.log(sresult);
         }

     })
    //  Transactions.aggregate([{
    //      $match:{'transaction_name':'Salary'},
    //      $lookup:{
    //          from:'categories',
    //          localField:'category_id',
    //          foreignField:'_id',
    //          as:'category'
    //      }
    //  }],function(err,result){
    //      if(err){
    //         console.log("error");
    //      }
    //      else{
             
    //        return  res.json(result);
    //         console.log(result);
    //         console.log('sucess');
    //      }
    //  })
 })

 module.exports=router;

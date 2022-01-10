const express=require('express');
var router= express.Router();
const Transactions=require("../models/transactions.model");


router.post("/add_transaction",(req,res)=>{
const newTransaction=new Transactions({
    user_id:req.body.user_id,
    category_id:req.body.category_id,
    transaction_name:req.body.expense_name,
    transaction_amount:req.body.expense_amount,
    transaction_date:req.body.expense_date,
    transaction_note:req.body.expense_note
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

 router.get('/get_all_transaction',(res,req)=>{
     Transactions.aggregate([{
         $lookup:{
             from:'categories',
             localField:'category_id',
             foreignField:'_id',
             as:'category'
         }
     }],(err,result)=>{
         if(err){
             res.send(err)
         }
         else{
             res.send(result)
         }
     })
 })

 module.exports=router;

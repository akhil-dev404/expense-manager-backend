const express=require('express');
var router= express.Router();
const Expense=require("../models/expense.model");


router.post("/add_expense",(req,res)=>{
const newExpense=new Expense({
    user_id:req.body.user_id,
    category_id:req.body.category_id,
    expense_name:req.body.expense_name,
    expense_amount:req.body.expense_amount,
    expense_date:req.body.expense_date,
    expense_note:req.body.expense_note
    });

    newExpense.save((err,newExpense)=>{
    if(err){
        res.send(err);
    }
    else{
        res.send({status:"ok",data:newExpense});
    }
    });
 });

 module.exports=router;

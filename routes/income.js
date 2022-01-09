const express=require('express');
const router= express.Router();
const IncomeModel=require("../models/income.model");


 router.post("/add_income",(req,res)=>{
    console.log(req.body);
    const newIncome=new IncomeModel({
    user_id:req.body.user_id,
    category_id:req.body.category_id,
    income_name:req.body.income_name,
    income_amount:req.body.income_amount,
    income_date:req.body.income_date,
    income_note:req.body.income_note
    });
    newIncome.save((err,newIncome)=>{
        if(err){
        res.send(err);
        }
        else{
        res.send({status:"ok",data:newIncome});
        }
    });
 });

 module.exports=router;

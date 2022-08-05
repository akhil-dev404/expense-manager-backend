const express=require('express');
const mongoose=require("mongoose")
var router= express.Router();
var commonFunctions=require("../functions/functions")


router.post("/add_transaction",commonFunctions.addTransaction)
router.post('/delete_transaction/:id',commonFunctions.deleteTransaction)


 router.get('/get_all_transaction/',(req,res)=>{
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

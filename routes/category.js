const express=require("express");
const router =express.Router();
const Category=require("../models/category.model");
var commonFunctions=require("../functions/functions")



router.post("/add_category",commonFunctions.addCategory)
// (req,res)=>{
//     var newcategory=new Category({
//         user_id:req.body.user_id,
//         category_name:req.body.category_name,
//         category_type:req.body.category_type,
//         category_icon:req.body.category_icon

//     });

//     newcategory.save((err,newcategory)=>{
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.send({message:"Success",data:newcategory});
//         }
//     });
// });

module.exports=router;

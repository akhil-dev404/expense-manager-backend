var express = require('express');
var router = express.Router();
var UserModel =require("../models/user.model")
// var mongoose=require("mongoose");
// const req = require('express/lib/request');


/* GET users listing. */
router.get('/get_details', function(req, res, next) {
  UserModel.findById(req.body.userId,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send({status:200,message:"sucess",data:result});
   }
  })


});

router.post('/add_user', function(req, res, next) {
console.log(req.body);
  const newUser=new UserModel({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email,
  })

  newUser.save((err,newUser)=>{
    if(err){
      res.send(err);
    }
    
    else{
       res.send({status:200,message:"sucess",data:newUser});
    }
  })
})

router.put("/update_user",(req,res)=>{
  UserModel.findByIdAndUpdate(req.body.userId,{username:req.body.username},(err,result)=>{
    if(err){
      res.send({status:"errorr"})
    }
    else{
      res.send({message:"updated Successfully"})
    }
  })
});
module.exports = router;

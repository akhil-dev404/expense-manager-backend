var express = require('express');
var router = express.Router();
var UserModel =require("../models/user.model")
var commonFunctions=require("../functions/functions")
// var mongoose=require("mongoose");
// const req = require('express/lib/request');


/* GET users listing. */
router.get('/get_details/:username', function(req, res, next) {
  UserModel.findById(req.params.username,(err,result)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send({status:200,message:"sucess",data:result});
   }
  })


});

router.get('/me',async(req,res)=>{
  
var data=await commonFunctions.getme(commonFunctions.jsonIf(req.body))
if(!data){
  res.status(400).json({"message":"error"});
}
else{
  res.status(200).json(data);
}
})

router.post('/add_user', async(req, res,)=> {
  var data=await commonFunctions.addUser(commonFunctions.jsonIf(req.body),res)
  console.log(data)
  if(!data){
    res.status(400).json({"message":"error"});
  }
  else{
    res.status(200).json(data);
  }

  
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

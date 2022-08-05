var express = require('express');
var router = express.Router();
var UserModel =require("../models/user.model")
var commonFunctions=require("../functions/functions")
// var mongoose=require("mongoose");
// const req = require('express/lib/request');


/* GET users listing. */
router.get('/get_details/:username', function(req, res, next) {
  console.log('ssdsd')
  UserModel.findById(req.params.username,(err,result)=>{
    console.log(result)
    if(err){
      res.send(err);
    }
    else{
      res.send({status:200,message:"sucess",data:result});
   }
  })


});

router.get('/me',commonFunctions.getme)
router.post('/add_user',commonFunctions.addUser)
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
router.get('/home_screen/:user_id',commonFunctions.getHomeScreen)
module.exports = router;

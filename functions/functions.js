const e = require("express");
var UserModel =require("../models/user.model")

 getme=async(req,res)=>{  
    let data=await UserModel.findById(req.user_id)
    console.log(data)
    if(!data){
        res.json({
            "message":"failed",
        "status":"400",
        }).status(400)
    }
    else{
        res.json({
            "message":"success",
            "status":"200",
            "data":data,   
        }).status(200)
    }
   
}

const addUser=async(req,res)=>{
    console.log(req)
    // const exist=UserModel.findOne({email:req.email})
    // console.log(exist)
var neUser=new UserModel(req)
return new Promise(async (resolve, reject) => {
    let data = await neUser.save();
    resolve(data);
});
// var data=await neUser.save()

// if(!data){
//     res.json({
//         "message":"error",
//         "status":"400",})
// }
// else{
//     // console.log(data)
//     res.json({
//         "message":"success",
//         "status":"200",})
// }
}


module.exports={
    getme:getme,
    addUser:addUser,
    jsonIf: (obj) => {
        if (typeof obj == "object")
            return obj;
        else {
            return JSON.parse(obj);
        }
    },
}
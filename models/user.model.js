var mongoose=require("mongoose");

var userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    
},{ collection: 'user'})


module.exports=mongoose.model("UserModel",userSchema)
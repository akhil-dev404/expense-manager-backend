const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const Category=Schema({
    
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    },
    category_id:{
        type:String,
        required:true
    },
    category_name:{
        type:String,
        required:true,
    
    },
    category_type:{
        type:String,
        required:true,

    },
      
},
{ collection: 'categories'});
module.exports=mongoose.model("Category",Category);
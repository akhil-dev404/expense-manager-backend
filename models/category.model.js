const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const Category=Schema({
    
    user_id:{
        type:String,
    },
    category_name:{
        type:String,
        required:true,
    
    },
    category_type:{
        type:String,
        required:true,

    },
    
    category_icon:{
        type:String,
        required:true
    },
    

});
module.exports=mongoose.model("Category",Category);
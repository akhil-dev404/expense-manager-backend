const  mongoose  = require("mongoose");
const Schema=mongoose.Schema;

const incomeSchema=Schema({
    user_id:{
        required:true,
        type:String
    },
   category_id:{
        required:true,
        type:String
    },

    income_name:{
        type:String,
        required:true,
    
    },
    income_amount:{
        type:Number,
        required:true
    },
    income_date:{
        type:Date,
        required:true
    },

})
module.exports=mongoose.model("incomeModel",incomeSchema);
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

var Transactions=Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:true,
       
        
    },
    category_id:{
       
        required:true,
        type:Schema.Types.ObjectId,
        ref:"Category"
        
    },
    transaction_name:{
        type:String,
        required:true,
    
    },
    transaction_amount:{
        type:Number,
        required:true
    },
    transaction_date:{
        type:Date,
        required:true
    },
    transaction_note:{
        type:String,

    }
},{collection:"transactions"})

module.exports=mongoose.model("Transactions",Transactions);
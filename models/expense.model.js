const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const Expense=Schema({
    user_id:{
        type:String,
        required:true,
        unique:false
        
    },
    category_id:{
        type:String,
        required:true,
        unique:false
        
    },
    expense_name:{
        type:String,
        required:true,
    
    },
    expense_amount:{
        type:String,
        required:true
    },
    expense_date:{
        type:Date,
        required:true
    },
    expense_note:{
        type:String,

    }

});
module.exports=mongoose.model("Expense",Expense);
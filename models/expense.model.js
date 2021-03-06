const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const Expense=Schema({
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
    expense_name:{
        type:String,
        required:true,
    
    },
    expense_amount:{
        type:Number,
        required:true
    },
    expense_date:{
        type:Date,
        required:true
    },
    expense_note:{
        type:String,

    }

},
{ collection: 'expenses'});
module.exports=mongoose.model("Expense",Expense);
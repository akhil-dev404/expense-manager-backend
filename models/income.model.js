const  mongoose  = require("mongoose");
const Schema=mongoose.Schema;

const incomeSchema=Schema({
    user_id:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'UserModel'
    },
   category_id:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"Category"
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

},{ collection: 'incomes'})
module.exports=mongoose.model("Incomes",incomeSchema);
const express = require('express');
const router = express.Router();
const Expense=require("../models/expense.model");
const User=require("../models/user.model");
/* GET home page. */
router.get('/home', function(req, res, next) {
  Expense.aggregate([{
    

  }],(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result)
    }
  }
);

  // res.render('index', { title: 'Akhi' });
});


module.exports = router;

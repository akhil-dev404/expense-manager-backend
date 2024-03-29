var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose=require("mongoose");
// mongoose.connect('mongodb://localhost/expenseDb');
const connectionUrl='mongodb+srv://akhildev-404:devakhil7025@cluster0.wohdi.mongodb.net/?retryWrites=true&w=majority'
const connectionParams={
  useNewUrlParser: true,
}

mongoose.connect(process.env.MONGODB_URI||connectionUrl||'mongodb://localhost:expenceappDb',connectionParams);
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Connected');
});

var userModel=require("./models/user.model");
var categoryModel=require("./models/category.model")



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category');
var expenseRouter=require('./routes/expense');
var incomeRouter=require('./routes/income');
var transactioRouter=require('./routes/transaction');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter);
app.use('/expense',expenseRouter);
app.use('/income',incomeRouter);
app.use('/transaction',transactioRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express=require('express')
var app=express()
var path=require('path')
var bodyParser=require('body-parser')
/*var router=require('./route/route')*/
let passport=require('passport');

let login = require('./routes/users');
require('./config/passport')(passport);


const cors =require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/users',login)
app.listen(3002);
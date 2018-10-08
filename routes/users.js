let express = require('express');
let router = express.Router();
let passport=require('passport')
var config=require('../config/database');
let bodyParser = require('body-parser');
let mongoose = require ('mongoose')
let jwt=require('jsonwebtoken');

var User=require('../model/loginSchema');

let db ='mongodb://localhost/login';
mongoose.connect(db);

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))


// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success:true,msg:'Failed to register user'});
    } else {
      res.json(user);
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
   
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({user}, config.secret, {
          expiresIn: 1000000//604800 // 1 week
        });

        res.json({
          success: true,
          token: 'Bearer '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile' ,passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.send("hiiiiiiiiiiii");
});

module.exports = router;
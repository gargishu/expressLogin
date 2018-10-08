const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/loginSchema');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  console.log('passport once called');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Bearer');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err){
        console.log("error is here ****************************************************");
        return done(err, false);
      }

      if(user){
        console.log("User is here***************************************************");
        return done(null, user);
      } else {
      console.log("unauthrize***********************************************");
      return done(null, false);
      }
    });
  }));
}
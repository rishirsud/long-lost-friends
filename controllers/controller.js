var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
User = mongoose.model("User");



exports.register = function(req, res){
  var newUser = new User(req.body);
  newUser.hashedPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user){
    if (err){
      return res.status(400).send({
        message: err
      });
    } 
    else {user.hashedPassword = undefined;
    return res.json(user)}
  })



};

exports.login = function(req, res){
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user){
      res.status(401).json({message: "authentication failed"})
    }
    else {
      return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, _id: user._id })})
    }
  } 
  )
};

exports.loginRequired = function(req, res, next){
  if (req.user){
    next();
  }
  else {
    return res.status(401).json({message: "Unauthorized user, please log in."})
  }



};